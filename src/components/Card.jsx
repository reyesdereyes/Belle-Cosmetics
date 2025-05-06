import React, { useState } from 'react';
import { useCart } from './CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Card = ({ nombre, precio, imagen }) => {
  const [cantidad, setCantidad] = useState(1);
  const [mostrarControles, setMostrarControles] = useState(false);
  const { dispatch } = useCart();

  const handleAgregarAlCarrito = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { nombre, precio, imagen, cantidad },
    });
    setMostrarControles(true);
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
    setMostrarControles(false);
    setCantidad(1);
  };

  return (
    <div
      className="card shadow-sm"
      style={{
        width: '18rem',
        border: '2px solid #eebee9',
        borderRadius: '18px',
        overflow: 'hidden',
        background: '#fff',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 8px 24px 0 rgba(215,38,96,0.07)',
      }}
    >
      <img
        src={imagen}
        className="card-img-top"
        alt={nombre}
        style={{
          height: '14rem',
          objectFit: 'cover',
          borderTopLeftRadius: '18px',
          borderTopRightRadius: '18px',
        }}
      />
      <div className="card-body text-center">
        <h5
          className="card-title"
          style={{ color: '#d72660', fontWeight: 'bold', fontSize: '1.25rem' }}
        >
          {nombre}
        </h5>
        <p
          className="card-text"
          style={{ color: '#8d3d6c', fontWeight: 'bold', fontSize: '1.1rem' }}
        >
          ${precio}
        </p>

        {mostrarControles ? (
          <div
            className="d-flex flex-column align-items-center mb-3 position-relative group-controles"
            style={{ minHeight: 80 }}
          >
            <div className="d-flex align-items-center justify-content-center gap-3">
              {/* Botón de Decremento */}
              <button
                className="btn btn-cantidad"
                onClick={handleDecrementarCantidad}
                disabled={cantidad === 1}
                style={{
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  backgroundColor: cantidad === 1 ? '#f8f9fa' : '#fff0fa',
                  border: '2px solid #eebee9',
                  color: '#d72660',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 8px rgba(215,38,96,0.09)',
                  transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: cantidad === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                <FaMinus />
              </button>

              {/* Cantidad */}
              <span
                className="mx-3"
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#d72660',
                  minWidth: '38px',
                  textAlign: 'center',
                  margin: '0 10px',
                  letterSpacing: '1px',
                  userSelect: 'none',
                }}
              >
                {cantidad}
              </span>

              {/* Botón de Incremento */}
              <button
                className="btn btn-cantidad"
                onClick={handleIncrementarCantidad}
                style={{
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  backgroundColor: '#eebee9',
                  color: '#d72660',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  border: '2px solid #eebee9',
                  boxShadow: '0 2px 8px rgba(215,38,96,0.09)',
                  transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'background-color 0.3s ease', // Animación suave
                }}
              >
                <FaPlus />
              </button>
            </div>

            {/* Ícono de basura para eliminar el producto */}
            <button
              className="btn btn-eliminar-producto"
              onClick={handleVaciarCarrito}
              style={{
                top: '-10px',
                right: '-10px',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                backgroundColor: '#d72660',
                color: '#fff',
                border: 'none',
                boxShadow: '0 2px 8px rgba(215,38,96,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                cursor: 'pointer',
                opacity: 0.9,
                transition: 'background-color 0.3s ease, opacity 0.3s ease',
                zIndex: 10,
              }}
              title="Quitar del carrito"
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.9')}
            >
              <FaTrash />
            </button>
          </div>
        ) : (
          // Botón para agregar al carrito
          <button
            className="btn w-100"
            onClick={handleAgregarAlCarrito}
            style={{
              background: 'linear-gradient(90deg, #d72660 70%, #eebee9 100%)',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '22px',
              fontSize: '1rem',
              padding: '10px 0',
              border: 'none',
              boxShadow: '0 2px 8px rgba(215,38,96,0.07)',
              transition: 'background 0.2s',
              cursor: 'pointer',
            }}
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
