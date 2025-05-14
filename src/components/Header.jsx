import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarComponent } from './Sidebar';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from './CartContext';
import { Toast } from 'primereact/toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { supabase } from '../config/supabase';
import UserProfile from './UserProfile';

const MySwal = withReactContent(Swal);

// Hook de autenticación que consulta también la tabla profiles
function useAuth() {
  const [user, setUser] = useAuth();


  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        const sessionUser = data.session.user;
        // Consulta la tabla profiles para obtener datos personalizados
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

  return user;
}

const Header = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.items.reduce((total, item) => total + item.cantidad, 0);
  const toast = useRef(null);
  const navigate = useNavigate();
  const user = useAuth();

  const showEmptyCartMessage = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Carrito vacío',
      detail: 'No tienes ningún producto agregado en el carrito.',
      life: 3000,
    });
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error al cerrar sesión',
        text: 'Hubo un problema al cerrar sesión. Inténtalo de nuevo.',
        confirmButtonColor: '#d72660',
      });
    } else {
      localStorage.removeItem('usuario');
      MySwal.fire({
        icon: 'success',
        title: 'Sesión cerrada',
        text: 'Has cerrado sesión correctamente.',
        confirmButtonColor: '#d72660',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/');
    }
  };

  const handleViewProfile = () => {
    navigate('/perfil');
  };

  // Sube la imagen a Supabase Storage, actualiza la tabla profiles y el estado
  const handleImageUpload = async (file, previewUrl) => {
    if (!user || !user.id || !file) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo subir la imagen. Usuario no autenticado o datos incompletos.',
      });
      return;
    }
  
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `avatars/${user.id}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
  
      if (uploadError) {
        MySwal.fire({ icon: 'error', title: 'Error al subir imagen', text: uploadError.message });
        return;
      }
  
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
  
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);
  
      if (updateError) {
        MySwal.fire({ icon: 'error', title: 'Error al actualizar perfil', text: updateError.message });
        return;
      }
  
      // Vuelve a consultar el perfil y actualiza el estado del usuario
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();
  
      if (!fetchError && profile) {
        setUser({
          ...user,
          displayName: profile.username || user.email.split('@')[0],
          profileImage: profile.avatar_url || './default-avatar.png',
        });
      }
  
      MySwal.fire({ icon: 'success', title: 'Foto actualizada', timer: 1200, showConfirmButton: false });
  
    } catch (err) {
      MySwal.fire({ icon: 'error', title: 'Error inesperado', text: err.message });
    }
  };
  

  const handleTodosProductosClick = (e) => {
    if (!user) {
      e.preventDefault();
      MySwal.fire({
        icon: 'info',
        title: '¡Atención!',
        html: `
          <p>Debes iniciar sesión primero para ver todos nuestros productos.</p>
          <p>¿No tienes cuenta? <a href="/registro" style="color:#d72660;font-weight:bold;">Regístrate aquí</a></p>
        `,
        confirmButtonColor: '#d72660',
        confirmButtonText: 'Iniciar sesión',
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        cancelButtonColor: '#aaa',
        customClass: {
          popup: 'swal2-border-radius'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/usuario/iniciar-sesion');
        }
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <nav className="navbar navbar-expand-lg" style={{ background: 'transparent', padding: '10px 30px', minHeight: '80px' }}>
        <div className="container-fluid">
          {/* Logo y nombre */}
          <Link to="/" className="navbar-brand d-flex align-items-center" style={{ gap: '10px' }}>
            <img src="./Logo_2.png" alt="Belle Cosmetics" style={{ height: '60px', objectFit: 'contain' }} />
            <span className="fw-bold" style={{ fontSize: '1.5rem', color: '#fff' }}>Belle Cosmetics</span>
          </Link>

          {/* Botón hamburguesa para mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ border: 'none' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Menú central */}
            <ul className="navbar-nav mx-auto d-flex align-items-center" style={{ gap: '30px' }}>
              <li className="nav-item dropdown">
                <button
                  className="btn btn-link nav-link dropdown-toggle fw-bold"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: '#fff', textDecoration: 'none' }}
                >
                  Categorías
                </button>
                <div
                  className="dropdown-menu p-4"
                  aria-labelledby="dropdownMenuButton"
                  style={{
                    width: '600px',
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '10px',
                  }}
                >
                  <div className="row">
                    <div className="col-4">
                      <h6 className="fw-bold">Categorias</h6>
                      <ul className="list-unstyled">
                        <li><Link className="dropdown-item" to="/categoria/labiales">Labiales</Link></li>
                        <li><Link className="dropdown-item" to="/categoria/sombras">Sombras</Link></li>
                        <li><Link className="dropdown-item" to="/categoria/bases">Bases</Link></li>
                      </ul>
                    </div>
                    <div className="col-4">
                      <ul className="list-unstyled mt-4">
                        <li><Link className="dropdown-item" to="/categoria/cremas">Cremas</Link></li>
                        <li><Link className="dropdown-item" to="/categoria/serums">Serums</Link></li>
                        <li><Link className="dropdown-item" to="/categoria/limpiadores">Limpiadores</Link></li>
                      </ul>
                    </div>
                    <div className="col-4">
                      <ul className="list-unstyled mt-4">
                        <li><Link className="dropdown-item" to="/categoria/perfumes-mujer">Para Mujer</Link></li>
                        <li><Link className="dropdown-item" to="/categoria/perfumes-hombre">Para Hombre</Link></li>
                        <li><Link className="dropdown-item" to="/categoria/perfumes-unisex">Unisex</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold"
                  style={{ color: '#fff' }}
                  to={user ? "/productos" : "#"}
                  onClick={handleTodosProductosClick}
                >
                  Todos los productos
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link fw-bold btn btn-link"
                  style={{ color: '#fff', textDecoration: 'none' }}
                  onClick={() => setSidebarVisible(true)}
                >
                  Contacto
                </button>
              </li>
            </ul>

            {/* Carrito y botones de usuario */}
            <div className="d-flex align-items-center" style={{ gap: '16px' }}>
              {/* Carrito */}
              <Link
                to={totalItems > 0 ? "/carrito" : "#"}
                className="nav-link fw-bold position-relative"
                style={{ color: '#fff', fontSize: '1.7rem', marginRight: '8px' }}
                onClick={(e) => {
                  if (totalItems === 0) {
                    e.preventDefault();
                    showEmptyCartMessage();
                  }
                }}
              >
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.8rem' }}>
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Menú de usuario */}
              {user ? (
                <UserProfile
                  user={user}
                  onLogout={handleLogout}
                  onViewProfile={handleViewProfile}
                  onImageUpload={handleImageUpload}
                />
              ) : (
                <>
                  <Link
                    to="/usuario/iniciar-sesion"
                    className="btn fw-bold"
                    style={{
                      border: '2px solid #fff',
                      borderRadius: '25px',
                      color: '#fff',
                      background: 'transparent',
                      padding: '6px 22px',
                      fontSize: '1rem',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#fff';
                      e.target.style.color = '#d72660';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#fff';
                    }}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/registro"
                    className="btn fw-bold"
                    style={{
                      border: '2px solid #fff',
                      borderRadius: '25px',
                      color: '#d72660',
                      background: '#fff',
                      padding: '6px 22px',
                      fontSize: '1rem',
                      marginLeft: '2px',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#d72660';
                      e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#fff';
                      e.target.style.color = '#d72660';
                    }}
                  >
                    Registrar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <SidebarComponent visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
    </>
  );
};

export default Header;
