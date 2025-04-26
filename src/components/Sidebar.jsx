import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaTruck, FaClock } from 'react-icons/fa';

export const SidebarComponent = ({ visible, onHide }) => {
    return (
      <Sidebar 
        visible={visible} 
        onHide={onHide} 
        position="left"
        style={{ backgroundColor: '#ffe6f0', width: '400px' }}
      >
        <div className="text-center">
          {/* Imagen con borde y animación */}
          <img 
            src="public/LOGO.jpg" 
            alt="Logo" 
            style={{
              maxWidth: '100%',
              height: 'auto',
              border: '3px solidrgb(255, 255, 255)', // Borde alrededor de la imagen
              borderRadius: '10px', // Bordes redondeados
              transition: 'transform 0.3s ease, box-shadow 0.3s ease' // Animación suave
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1)'; // Aumenta el tamaño al pasar el mouse
              e.target.style.boxShadow = '0 20px 20px rgba(220, 17, 217, 0.2)'; // Sombra al pasar el mouse
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'; // Vuelve al tamaño original
              e.target.style.boxShadow = 'none'; // Quita la sombra
            }}
          />
          {/* Íconos de Instagram y WhatsApp con enlaces */}
          <div className="d-flex justify-content-center align-items-center mt-4">
            <a 
              href="https://www.instagram.com/belle_cosmetics2025?" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#cc3aa3', textDecoration: 'none', marginRight: '20px', fontSize: '2rem' }} // Tamaño aumentado
            >
              <FaInstagram className="me-0" /> 
            </a>
            <a 
              href="https://wa.me/584244555085" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#cc3aa3', textDecoration: 'none', fontSize: '2rem' }} // Tamaño aumentado
            >
              <FaWhatsapp className="me-0" />
            </a>
          </div>
        </div>
  
        <hr />
  
        <ul className="list-unstyled small">
          <li><strong>¿Quiénes somos?</strong><br />Maquillaje y skincare 100% original</li>
          <li className="mt-3"><FaClock className="me-2" />Lunes a Sábado: 09:00 a. m. – 07:00 p. m.<br />Domingo: 10:00 a. m. – 03:00 p. m.</li>
          <li className="mt-3"><FaMapMarkerAlt className="me-2" />Guacara-Valencia</li>
          <li className="mt-2"><FaPhoneAlt className="me-2" />+58 424-4555085</li>
          <li className="mt-2"><FaTruck className="me-2" />Envíos a todas parte del país</li>
          <li className="mt-2"><FaInstagram className="me-2" />@Belle cosmetics</li>
          <li className="mt-2"><strong>¡Síguenos en Instagram!</strong></li>
        </ul>
      </Sidebar>
    );
  };
export default SidebarComponent;