import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      // 1. Intenta con Supabase Auth
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
        return;
      }
      // 2. Si no hay sesión de Supabase, busca en localStorage (login manual)
      const localUser = localStorage.getItem('usuario');
      if (localUser) {
        setUser(JSON.parse(localUser));
      } else {
        setUser(null);
      }
    };
    getSession();

    // Listener de Supabase Auth (opcional)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        // Si la sesión de Supabase termina, revisa localStorage
        const localUser = localStorage.getItem('usuario');
        setUser(localUser ? JSON.parse(localUser) : null);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return user;
}
