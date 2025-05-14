export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session?.user) {
        const sessionUser = data.session.user;
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', sessionUser.id)
          .single();

        if (error) {
          setUser({
            ...sessionUser,
            displayName: sessionUser.email.split('@')[0],
            profileImage: './default-avatar.png',
          });
        } else {
          setUser({
            ...sessionUser,
            displayName: profile.username || sessionUser.email.split('@')[0],
            profileImage: profile.avatar_url || './default-avatar.png',
          });
        }
        return;
      }
      // Si no hay sesión, busca en localStorage (opcional)
      const localUser = localStorage.getItem('usuario');
      if (localUser) {
        setUser(JSON.parse(localUser));
      } else {
        setUser(null);
      }
    };
    getSessionAndProfile();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        getSessionAndProfile();
      } else {
        const localUser = localStorage.getItem('usuario');
        setUser(localUser ? JSON.parse(localUser) : null);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return [user, setUser];
}
