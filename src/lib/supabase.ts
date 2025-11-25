import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
};

// Database helpers
export const insertCalculation = async (calculation: Record<string, unknown>) => {
  const { data, error } = await supabase
    .from('roi_calculations')
    .insert(calculation)
    .select()
    .single();
  return { data, error };
};

export const getCalculations = async (limit = 50) => {
  const { data, error } = await supabase
    .from('roi_calculations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  return { data, error };
};

export const getDashboardStats = async () => {
  const { data, error } = await supabase.rpc('get_dashboard_stats');
  return { data, error };
};

export const isAdminUser = async (email: string) => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', email)
    .single();
  return { isAdmin: !!data && !error, error };
};
