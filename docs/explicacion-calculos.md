# Explicación de los Cálculos del ROI

Este documento explica de manera simple cómo se calculan los resultados en la Calculadora de ROI de AI Refill.

## Datos de Entrada

Para realizar los cálculos, necesitas proporcionar:

- **Valor anual de inventario**: El valor total de tu inventario en un año
- **Costos anuales de almacenamiento**: Cuánto gastas al año en almacenamiento
- **Rotación de inventario actual**: Cuántas veces al año rotas tu inventario (ej: 4 veces)
- **Compras anuales totales**: El monto total que compras al año
- **Ventas perdidas por desabasto (anual)**: Cuánto dinero pierdes al año por no tener productos en stock
- **Costo inicial de implementación** (opcional): Inversión inicial requerida

---

## Los 4 Objetivos de Ahorro

### 1. Reducción de Costos de Almacenamiento (15%)

**Fórmula:**
```
Ahorro = Costos anuales de almacenamiento × 15%
```

**Ejemplo:**
- Si tus costos de almacenamiento son Q 2,000,000 al año
- Ahorro = Q 2,000,000 × 0.15 = **Q 300,000 al año**

**¿Por qué?** Mejor gestión de inventario reduce los costos de almacenamiento.

---

### 2. Aumento de Rotación de Inventario (20%)

**Fórmula:**
```
Nueva rotación = Rotación actual × 1.20
Capital liberado = Valor de inventario × (1 - Rotación actual / Nueva rotación)
```

**Ejemplo:**
- Valor de inventario: Q 10,000,000
- Rotación actual: 4 veces al año
- Nueva rotación: 4 × 1.20 = 4.8 veces al año
- Capital liberado = Q 10,000,000 × (1 - 4/4.8)
- Capital liberado = Q 10,000,000 × 0.167 = **Q 1,670,000**

**¿Por qué?** Al rotar más rápido, necesitas menos capital atado en inventario.

---

### 3. Reducción de Compras Innecesarias (20%)

**Fórmula:**
```
Ahorro = Compras anuales totales × 20%
```

**Ejemplo:**
- Si tus compras anuales son Q 15,000,000
- Ahorro = Q 15,000,000 × 0.20 = **Q 3,000,000 al año**

**¿Por qué?** Mejor predicción de demanda evita comprar productos que no necesitas.

---

### 4. Reducción de Ventas Perdidas por Desabasto (15%)

**Fórmula:**
```
Ahorro = Ventas perdidas por desabasto × 15%
```

**Ejemplo:**
- Si pierdes Q 1,000,000 al año por desabasto
- Ahorro = Q 1,000,000 × 0.15 = **Q 150,000 al año**

**¿Por qué?** Mejor gestión de inventario reduce las veces que te quedas sin productos.

---

## Cálculo del Beneficio Total

**Fórmula:**
```
Beneficio Total Anual = 
  Ahorro en almacenamiento +
  Capital liberado +
  Ahorro en compras +
  Ahorro en ventas perdidas
```

**Ejemplo (usando los números anteriores):**
- Beneficio Total = Q 300,000 + Q 1,670,000 + Q 3,000,000 + Q 150,000
- Beneficio Total = **Q 5,120,000 al año**

---

## Cálculo del Fee PAYP (25%)

**Fórmula:**
```
Fee PAYP = Beneficio Total Anual × 25%
```

**Ejemplo:**
- Beneficio Total: Q 5,120,000
- Fee PAYP = Q 5,120,000 × 0.25 = **Q 1,280,000**

**Nota:** El fee representa el 25% de los ahorros demostrados en el primer año.

---

## Cálculo del Beneficio Neto

**Fórmula:**
```
Beneficio Neto Anual = Beneficio Total Anual - Fee PAYP
```

**Ejemplo:**
- Beneficio Total: Q 5,120,000
- Fee PAYP: Q 1,280,000
- Beneficio Neto = Q 5,120,000 - Q 1,280,000 = **Q 3,840,000 al año**

---

## Cálculo del Período de Recuperación (Payback)

El período de recuperación indica cuánto tiempo tardas en recuperar tu inversión inicial.

**Fórmula:**
```
Payback (meses) = (Costo Inicial / Beneficio Neto Anual) × 12
```

**Ejemplos:**

1. **Sin costo inicial:**
   - Payback = **Inmediato** (no hay inversión que recuperar)

2. **Con costo inicial:**
   - Costo inicial: Q 500,000
   - Beneficio Neto Anual: Q 3,840,000
   - Payback = (Q 500,000 / Q 3,840,000) × 12 = **1.56 meses** ≈ **2 meses**

3. **Payback mayor a un año:**
   - Costo inicial: Q 2,000,000
   - Beneficio Neto Anual: Q 3,840,000
   - Payback = (Q 2,000,000 / Q 3,840,000) × 12 = **6.25 meses** ≈ **6 meses**

4. **Payback en años:**
   - Costo inicial: Q 5,000,000
   - Beneficio Neto Anual: Q 3,840,000
   - Payback = (Q 5,000,000 / Q 3,840,000) × 12 = **15.6 meses** = **1 año 4 meses**

---

## Resumen de las Fórmulas

| Concepto | Fórmula |
|---------|---------|
| **Ahorro en almacenamiento** | Costos almacenamiento × 15% |
| **Capital liberado** | Valor inventario × (1 - Rotación actual / Rotación nueva) |
| **Ahorro en compras** | Compras anuales × 20% |
| **Ahorro en ventas perdidas** | Ventas perdidas × 15% |
| **Beneficio Total** | Suma de los 4 ahorros |
| **Fee PAYP** | Beneficio Total × 25% |
| **Beneficio Neto** | Beneficio Total - Fee PAYP |
| **Payback (meses)** | (Costo Inicial / Beneficio Neto) × 12 |

---

## Notas Importantes

1. **Los porcentajes son objetivos comprometidos** basados en benchmarks de la industria (McKinsey 2024).

2. **Los resultados son proyecciones** basadas en los datos que ingresas. Los resultados reales pueden variar.

3. **El Fee PAYP** se calcula sobre el beneficio total demostrado en el primer año.

4. **El período de recuperación** solo se calcula si hay un costo inicial. Si no hay costo inicial, el payback es inmediato.

5. **Todos los cálculos son anuales**, por lo que los beneficios se repiten cada año después de la implementación.

---

## Ejemplo Completo

**Datos de entrada:**
- Valor anual de inventario: Q 10,000,000
- Costos anuales de almacenamiento: Q 2,000,000
- Rotación de inventario actual: 4 veces/año
- Compras anuales totales: Q 15,000,000
- Ventas perdidas por desabasto: Q 1,000,000
- Costo inicial: Q 500,000

**Cálculos:**

1. Ahorro almacenamiento = Q 2,000,000 × 15% = **Q 300,000**
2. Capital liberado = Q 10,000,000 × (1 - 4/4.8) = **Q 1,670,000**
3. Ahorro compras = Q 15,000,000 × 20% = **Q 3,000,000**
4. Ahorro ventas perdidas = Q 1,000,000 × 15% = **Q 150,000**
5. Beneficio Total = Q 300,000 + Q 1,670,000 + Q 3,000,000 + Q 150,000 = **Q 5,120,000**
6. Fee PAYP = Q 5,120,000 × 25% = **Q 1,280,000**
7. Beneficio Neto = Q 5,120,000 - Q 1,280,000 = **Q 3,840,000**
8. Payback = (Q 500,000 / Q 3,840,000) × 12 = **1.56 meses** ≈ **2 meses**

---

*Documento creado para AI Refill - Calculadora de ROI*

