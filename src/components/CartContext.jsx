import React, { createContext, useContext, useReducer } from 'react';

// Estado inicial del carrito
const initialState = {
  items: [],
};

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.nombre === action.payload.nombre);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.nombre === action.payload.nombre
              ? { ...item, cantidad: item.cantidad + action.payload.cantidad }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'UPDATE_CART':
      return {
        ...state,
        items: state.items.map(item =>
          item.nombre === action.payload.nombre
            ? { ...item, cantidad: action.payload.cantidad }
            : item
        ),
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.nombre !== action.payload.nombre),
      };

    default:
      return state;
  }
};

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};