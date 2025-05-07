import React from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../config/supabase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // 1. Buscar el usuario por nombre de usuario
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('usuario, password')
      .eq('usuario', data.usuario)
      .single();

    if (userError || !userData) {
      MySwal.fire({
        icon: 'error',
        title: 'Usuario no encontrado',
        text: 'No existe un usuario con ese nombre.',
        confirmButtonColor: '#d72660',
      });
      return;
    }

    // 2. Verificar la contraseña
    if (userData.password !== data.password) {
      MySwal.fire({
        icon: 'error',
        title: 'Contraseña incorrecta',
        text: 'La contraseña ingresada no es correcta.',
        confirmButtonColor: '#d72660',
      });
      return;
    }

    // 3. Inicio de sesión exitoso
    MySwal.fire({
      icon: 'success',
      title: 'Inicio de sesión exitoso',
      text: `Bienvenido, ${userData.usuario}`,
      confirmButtonColor: '#d72660',
      timer: 1200,
      timerProgressBar: true,
      showConfirmButton: false,
    });

    // 4. Guardar usuario en localStorage
    localStorage.setItem('usuario', JSON.stringify(userData));

    // 5. Redirigir a productos
    setTimeout(() => {
      navigate('/productos');
    }, 1200); // Espera el SweetAlert
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle} noValidate>
        <h2 style={titleStyle}>Inicio de Sesión</h2>

        {/* Nombre de usuario */}
        <label style={labelStyle}>Nombre de Usuario</label>
        <input
          {...register('usuario', {
            required: 'El nombre de usuario es obligatorio',
            minLength: { value: 4, message: 'Mínimo 4 caracteres' },
          })}
          type="text"
          placeholder="Nombre de usuario"
          style={inputStyle}
        />
        {errors.usuario && <p style={errorStyle}>{errors.usuario.message}</p>}

        {/* Contraseña */}
        <label style={labelStyle}>Contraseña</label>
        <input
          {...register('password', {
            required: 'La contraseña es obligatoria',
            minLength: { value: 6, message: 'Mínimo 6 caracteres' },
          })}
          type="password"
          placeholder="Contraseña"
          style={inputStyle}
        />
        {errors.password && <p style={errorStyle}>{errors.password.message}</p>}

        <button type="submit" style={buttonStyle}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

// Estilos (idénticos a registro para mantener consistencia)
const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
};

const formStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 10px 30px rgba(215,38,96,0.15)',
  width: '100%',
  maxWidth: '420px',
  boxSizing: 'border-box',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const titleStyle = {
  textAlign: 'center',
  color: '#d72660',
  marginBottom: '1.5rem',
  fontWeight: '700',
  fontSize: '1.8rem',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: '600',
  color: '#8d3d6c',
  fontSize: '1rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.6rem 0.75rem',
  marginBottom: '0.5rem',
  borderRadius: '6px',
  border: '1.8px solid #eebee9',
  fontSize: '1rem',
  transition: 'border-color 0.3s',
  outline: 'none',
  boxSizing: 'border-box',
};

const errorStyle = {
  color: '#d72660',
  fontSize: '0.85rem',
  marginBottom: '0.75rem',
  fontWeight: '600',
};

const buttonStyle = {
  marginTop: '1.5rem',
  width: '100%',
  padding: '0.85rem',
  backgroundColor: '#d72660',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '700',
  fontSize: '1.1rem',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(215,38,96,0.4)',
  transition: 'background-color 0.3s ease',
};

export default Login;
