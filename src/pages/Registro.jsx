import React from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../config/supabase'; // Asegúrate de que esta ruta sea correcta
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Registro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Datos enviados:', data);

    const { error } = await supabase.from('usuarios').insert([
      {
        nombre: data.nombre,
        apellido: data.apellido,
        cedula: data.cedula,
        correo: data.correo,
        usuario: data.usuario,
        password: data.password,
      },
    ]);

    if (error) {
      console.error('Error al registrar usuario:', error.message);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al registrar el usuario. Inténtalo de nuevo.',
        confirmButtonColor: '#d72660',
      });
    } else {
      MySwal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Usuario registrado correctamente.',
        confirmButtonColor: '#d72660',
      });
    }
  };

  

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle} noValidate>
        <h2 style={titleStyle}>Registro de Usuario</h2>

        {/* Nombre */}
        <label style={labelStyle}>Nombre</label>
        <input
          {...register('nombre', { required: 'El nombre es obligatorio' })}
          type="text"
          placeholder="Nombre"
          style={inputStyle}
        />
        {errors.nombre && <p style={errorStyle}>{errors.nombre.message}</p>}

        {/* Apellido */}
        <label style={labelStyle}>Apellido</label>
        <input
          {...register('apellido', { required: 'El apellido es obligatorio' })}
          type="text"
          placeholder="Apellido"
          style={inputStyle}
        />
        {errors.apellido && <p style={errorStyle}>{errors.apellido.message}</p>}

        {/* Número de cédula */}
        <label style={labelStyle}>Número de Cédula</label>
        <input
          {...register('cedula', {
            required: 'La cédula es obligatoria',
            pattern: {
              value: /^[0-9]{6,12}$/,
              message: 'La cédula debe tener entre 6 y 12 dígitos numéricos',
            },
          })}
          type="text"
          placeholder="Número de cédula"
          style={inputStyle}
        />
        {errors.cedula && <p style={errorStyle}>{errors.cedula.message}</p>}

        {/* Correo */}
        <label style={labelStyle}>Correo Electrónico</label>
        <input
          {...register('correo', {
            required: 'El correo es obligatorio',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Correo inválido',
            },
          })}
          type="email"
          placeholder="correo@ejemplo.com"
          style={inputStyle}
        />
        {errors.correo && <p style={errorStyle}>{errors.correo.message}</p>}

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
          Registrarse
        </button>
      </form>
    </div>
  );
};

// Estilos definidos aquí
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

export default Registro;
