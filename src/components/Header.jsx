import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SidebarComponent } from './Sidebar';
import logo from '/LOGO ROSA CON BLANCO TRANSPARENTE.png';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from './CartContext'; // Importar el contexto del carrito
import { Toast } from 'primereact/toast'; // Importar Toast de PrimeReact

const Header = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { cart } = useCart(); // Obtener el estado del carrito
  const totalItems = cart.items.reduce((total, item) => total + item.cantidad, 0);
  const toast = useRef(null); // Referencia para el Toast

  const showEmptyCartMessage = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Carrito vacío',
      detail: 'No tienes ningún producto agregado en el carrito.',
      life: 3000, // Duración en milisegundos
    });
  };

  return (
    <>
      <Toast ref={toast} /> {/* Componente Toast para mostrar mensajes */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'Transparent', padding: '10px 20px' }}>
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center" style={{ gap: '10px' }}>
            <img
              src={logo}
              alt="Belle Cosmetics"
              style={{ height: '80px', objectFit: 'contain' }}
            />
            <span className="text-white fw-bold" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>
              Belle Cosmetics
            </span>
          </Link>

          {/* Menú de categorías y otros enlaces */}
          <div className="d-flex justify-content-center align-items-center" style={{ gap: '30px' }}>
            {/* Menú desplegable de categorías */}
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontWeight: 'bold' }}
              >
                Categorías
              </button>
              <div
                className="dropdown-menu p-4"
                aria-labelledby="dropdownMenuButton"
                style={{
                  width: '600px', // Ancho del mega menú
                  backgroundColor: '#ffffff', // Fondo blanco
                  border: '1px solid #e0e0e0', // Borde gris claro
                  borderRadius: '10px',
                }}
              >
                <div className="row">
                  {/* Primera columna */}
                  <div className="col-4">
                    <h6 className="fw-bold">Categorias</h6>
                    <ul className="list-unstyled">
                      <li><Link className="dropdown-item" to="/categoria/labiales">Labiales</Link></li>
                      <li><Link className="dropdown-item" to="/categoria/sombras">Sombras</Link></li>
                      <li><Link className="dropdown-item" to="/categoria/bases">Bases</Link></li>
                    </ul>
                  </div>
                  {/* Segunda columna */}
                  <div className="col-4">
                    <ul className="list-unstyled">
                      <br />
                      <li><Link className="dropdown-item" to="/categoria/cremas">Cremas</Link></li>
                      <li><Link className="dropdown-item" to="/categoria/serums">Serums</Link></li>
                      <li><Link className="dropdown-item" to="/categoria/limpiadores">Limpiadores</Link></li>
                    </ul>
                  </div>
                  {/* Tercera columna */}
                  <div className="col-4">
                    <ul className="list-unstyled">
                      <br />
                      <li><Link className="dropdown-item" to="/categoria/perfumes-mujer">Para Mujer</Link></li>
                      <li><Link className="dropdown-item" to="/categoria/perfumes-hombre">Para Hombre</Link></li>
                      <li><Link className="dropdown-item" to="/categoria/perfumes-unisex">Unisex</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Enlace a todos los productos */}
            <Link className="nav-link text-white fw-bold" to="/productos">Todos los productos</Link>

            {/* Enlace de contacto */}
            <a className="nav-link text-white fw-bold" href="#" onClick={() => setSidebarVisible(true)}>Contacto</a>

            {/* Ícono de carrito de compras */}
            <Link
              to={totalItems > 0 ? "/carrito" : "#"}
              className="nav-link text-white fw-bold position-relative"
              style={{ fontSize: '1.5rem', marginLeft: '350px' }}
              onClick={(e) => {
                if (totalItems === 0) {
                  e.preventDefault(); // Evitar la navegación si el carrito está vacío
                  showEmptyCartMessage(); // Mostrar mensaje con PrimeReact Toast
                }
              }}
            >
              <FaShoppingCart size={40} />
              {totalItems > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.8rem' }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <SidebarComponent visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
    </>
  );
};

export default Header;