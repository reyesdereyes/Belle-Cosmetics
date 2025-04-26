import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Vasio.css';

const EmptyCart = () => {
    return (
        <div className="empty-cart-container">
            <div className="empty-cart-content">
                <div className="shopping-cart-icon">
                    <img
                        src="public/Carrito de compra.jpg" 
                        alt="Carrito vacío"
                        className="cart-image"
                    />
                </div>
                <h2>Tu carrito está vacío</h2>
                <p>¡Aún no tienes productos! Agrega tus favoritos y cómpralos con un clic.</p>
                <Link to="/" className="btn btn-primary w-100">
                    Ir a la tienda <i className="pi pi-arrow-right ms-2"></i>
                </Link>
            </div>
        </div>
    );
};

export default EmptyCart;