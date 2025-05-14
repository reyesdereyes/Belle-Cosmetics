function getUserName(user) {
    if (!user) return 'Usuario';
    // Supabase user
    if (user.user_metadata && user.user_metadata.name) return user.user_metadata.name;
    if (user.user_metadata && user.user_metadata.full_name) return user.user_metadata.full_name;
    // Local user
    if (user.name) return user.name;
    if (user.nombre) return user.nombre;
    if (user.email) return user.email.split('@')[0];
    return 'Usuario';
  }