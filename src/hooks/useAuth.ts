import { useState, useEffect, useCallback } from 'react';
import { supabase, signIn, signOut, isAdminUser } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAdmin: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        checkAdmin(session.user);
      } else {
        setState((s) => ({ ...s, loading: false }));
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        checkAdmin(session.user);
      } else {
        setState({ user: null, isAdmin: false, loading: false, error: null });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = async (user: User) => {
    const { isAdmin } = await isAdminUser(user.email || '');
    setState({ user, isAdmin, loading: false, error: null });
  };

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));

    const { data, error } = await signIn(email, password);

    if (error) {
      setState((s) => ({ ...s, loading: false, error: error.message }));
      return false;
    }

    if (data.user) {
      const { isAdmin } = await isAdminUser(data.user.email || '');
      if (!isAdmin) {
        await signOut();
        setState((s) => ({
          ...s,
          loading: false,
          error: 'Acceso denegado. Usuario no autorizado.',
        }));
        return false;
      }
    }

    return true;
  }, []);

  const logout = useCallback(async () => {
    setState((s) => ({ ...s, loading: true }));
    await signOut();
    setState({ user: null, isAdmin: false, loading: false, error: null });
  }, []);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  return {
    ...state,
    login,
    logout,
    clearError,
  };
};
