import React, { useState } from 'react';
import { useCart } from './CartContext'; // Correcto si está en la misma carpeta
import { FaTrash } from 'react-icons/fa'; // Importar el ícono de basura
import { supabase } from './config/supabase'
const Card = ({ nombre, precio, imagen }) => {
  const [cantidad, setCantidad] = useState(1);
  const [mostrarControles, setMostrarControles] = useState(false); // Estado para mostrar los botones de cantidad
  const { cart, dispatch } = useCart(); // Obtener el estado y el dispatch del carrito

  const handleAgregarAlCarrito = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { nombre, precio, imagen, cantidad },
    });
    setMostrarControles(true); // Mostrar los botones de cantidad
  };

  const handleIncrementarCantidad = () => {
    setCantidad(cantidad + 1);
    dispatch({
      type: 'UPDATE_CART',
      payload: { nombre, cantidad: cantidad + 1 },
    });
  };

  const handleDecrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      dispatch({
        type: 'UPDATE_CART',
        payload: { nombre, cantidad: cantidad - 1 },
      });
    }
  };

  const handleVaciarCarrito = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { nombre } });
    setMostrarControles(false); // Ocultar los botones de cantidad
  };

  return (
    <div className="card" style={{ width: '18rem', border: '2px solid #e0e0e0', borderRadius: '10px', overflow: 'hidden' }}>
      <img src={imagen} className="card-img-top" alt={nombre} style={{ height: '15rem', objectFit: 'cover' }} />
      <div className="card-body text-center">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text">${precio}</p>

        {/* Mostrar botones de cantidad solo si se agregó al carrito */}
        {mostrarControles ? (
  <div className="d-flex flex-column align-items-center mb-3">
    <div className="d-flex align-items-center">
      {/* Botón de Decremento */}
      {cantidad > 1 && (
        <button
          className="btn"
          onClick={handleDecrementarCantidad}
          style={{
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            backgroundColor: '#f8f9fa', // Fondo claro
            border: '1px solid #ced4da', // Borde gris claro
            color: '#343a40', // Texto oscuro
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease', // Animación suave
          }}
        >
          -
        </button>
      )}

      {/* Cantidad */}
      <span
        className="mx-3"
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#343a40', // Color del texto
        }}
      >
        {cantidad}
      </span>

      {/* Botón de Incremento */}
      <button
        className="btn"
        onClick={handleIncrementarCantidad}
        style={{
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          backgroundColor: '#f1bcd2', // Rosa oscuro
          color: '#fff', // Texto blanco
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: 'none',
          transition: 'background-color 0.3s ease', // Animación suave
        }}
      >
        +
      </button>
    </div>

    {/* Ícono de basura para eliminar el producto */}
    {cantidad === 1 && (
      <div
        className="d-flex justify-content-center align-items-center mt-3"
        style={{
          cursor: 'pointer',
        }}
        onClick={handleVaciarCarrito}
      >
        <FaTrash
          style={{
            fontSize: '1.5rem',
            color: '#FFFFFF', // Color rosa oscuro
          }}
        />
      </div>
    )}
  </div>
) : (
  // Botón para agregar al carrito
  <button
    className="btn btn-primary w-100"
    onClick={handleAgregarAlCarrito}
    style={{ fontSize: '1rem', fontWeight: 'bold' }}
  >
    Agregar al carrito
  </button>
)}
      </div>
    </div>
  );
};

export default Card;