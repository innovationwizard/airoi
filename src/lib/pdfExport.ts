import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Export a React component/element to PDF
 * Preserves CSS styling and fits content to a single page
 */
export const exportToPDF = async (
  elementId: string,
  filename: string = 'roi-calculation.pdf',
  options?: {
    width?: number;
    height?: number;
    scale?: number;
  }
): Promise<void> => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  // Default PDF dimensions (A4 in mm)
  const pdfWidth = options?.width || 210; // A4 width in mm
  const pdfHeight = options?.height || 297; // A4 height in mm
  
  // Capture the element as canvas with high quality
  const canvas = await html2canvas(element, {
    scale: options?.scale || 2, // Higher scale for better quality
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // Calculate scaling to fit on single page
  // Maintain aspect ratio while fitting to page
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const scaledWidth = imgWidth * ratio;
  const scaledHeight = imgHeight * ratio;

  // Create PDF
  const pdf = new jsPDF({
    orientation: scaledHeight > pdfWidth ? 'portrait' : 'landscape',
    unit: 'mm',
    format: [pdfWidth, pdfHeight],
  });

  // Center the image on the page
  const xOffset = (pdfWidth - scaledWidth) / 2;
  const yOffset = (pdfHeight - scaledHeight) / 2;

  // Add image to PDF
  const imgData = canvas.toDataURL('image/png');
  pdf.addImage(imgData, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight);

  // Save PDF
  pdf.save(filename);
};

/**
 * Export with custom page size (for wider content)
 */
export const exportToPDFCustom = async (
  elementId: string,
  filename: string = 'roi-calculation.pdf',
  pageWidth: number = 297, // A4 landscape width
  pageHeight: number = 210 // A4 landscape height
): Promise<void> => {
  return exportToPDF(elementId, filename, {
    width: pageWidth,
    height: pageHeight,
    scale: 2,
  });
};

