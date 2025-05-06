import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { supabase } from '../config/supabase';
import { Link } from 'react-router-dom';
import { PrimeIcons } from 'primereact/api';

const testimonios = [
  {
    nombre: "Ana M.",
    texto: "¡Me encantan los productos! Excelente calidad y atención.",
    foto: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    nombre: "Laura G.",
    texto: "El envío fue rapidísimo y los precios son buenísimos.",
    foto: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    nombre: "Carla P.",
    texto: "¡Repetiré seguro! Todo llegó perfecto y muy bien envuelto.",
    foto: "https://randomuser.me/api/portraits/women/32.jpg"
  }
];

const categorias = [
  { nombre: "Labiales", icon: "💄", link: "/categoria/labiales" },
  { nombre: "Sombras", icon: "🌈", link: "/categoria/sombras" },
  { nombre: "Bases", icon: "🧴", link: "/categoria/bases" },
  { nombre: "Cremas", icon: "🥛", link: "/categoria/cremas" },
  { nombre: "Perfumes", icon: "🌸", link: "/categoria/perfumes-mujer" }
];

const Inicio = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function getProductos() {
      const { data: productos, error } = await supabase.from('product').select();
      if (error) {
        console.error('Error al obtener productos:', error.message);
        return;
      }
      if (productos && productos.length > 0) {
        setProductos(productos);
      }
    }
    getProductos();
  }, []);

  return (
    <>
      <Header />

      {/* Barra de anuncio */}
      <div className="w-100 text-center py-2" style={{ background: 'tranparet', color: '#fff', fontWeight: 'bold', letterSpacing: '1px' }}>
        💌 ENVÍO GRATIS en compras mayores a $50 | ¡Ofertas semanales!
      </div>

      {/* Hero creativo */}
      <section
        className="d-flex flex-column flex-lg-row align-items-center justify-content-between px-4 py-5"
        style={{
          minHeight: '480px',
          background: 'linear-gradient(90deg, #eebee9 60%, #fff0fa 100%)',
          borderRadius: '30px',
          margin: '40px auto 0 auto',
          maxWidth: '1200px',
          boxShadow: '0 8px 32px 0 rgba(100, 0, 100, 0.07)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="mb-4 mb-lg-0" style={{ maxWidth: '540px', zIndex: 2 }}>
          <h1 className="fw-bold" style={{ color: '#d72660', fontSize: '2.7rem', lineHeight: '1.1' }}>
            Belleza que inspira<br />
            <span style={{ color: '#fff', WebkitTextStroke: '1px #d72660' }}>¡Descubre tu mejor versión!</span>
          </h1>
          <p className="mt-3" style={{ color: '#8d3d6c', fontSize: '1.25rem' }}>
            Productos de calidad, ofertas exclusivas y asesoría personalizada para realzar tu belleza natural.
          </p>
          <div className="d-flex gap-3 mt-4">
            <Link to="/productos" className="btn btn-lg fw-bold" style={{
              background: '#d72660',
              color: '#fff',
              borderRadius: '30px',
              padding: '12px 32px',
              boxShadow: '0 2px 8px rgba(215,38,96,0.12)',
              fontSize: '1.2rem',
              transition: 'background 0.2s'
            }}>
              Ver productos
            </Link>
            <Link to="/registro" className="btn btn-lg fw-bold" style={{
              background: '#fff',
              color: '#d72660',
              border: '2px solid #d72660',
              borderRadius: '30px',
              padding: '12px 32px',
              fontSize: '1.2rem'
            }}>
              ¡Regístrate!
            </Link>
          </div>
          {/* Beneficios rápidos */}
          <div className="d-flex gap-4 mt-4 flex-wrap">
            <div className="d-flex align-items-center gap-2">
              🚚 <span style={{ color: '#d72660', fontWeight: 'bold' }}>Envío gratis</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              ⭐ <span style={{ color: '#d72660', fontWeight: 'bold' }}>+500 valoraciones</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              🔥 <span style={{ color: '#d72660', fontWeight: 'bold' }}>Ofertas semanales</span>
            </div>
          </div>
        </div>
        {/* Imagen decorativa */}
        <img
          src="./Logo_2.png"
          alt="Belle Cosmetics"
          className="d-none d-lg-block"
          style={{
            width: '420px',
            height: '420px',
            objectFit: 'contain',
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 4px 24px 0 rgba(215,38,96,0.08)',
            position: 'absolute',
            right: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1
          }}
        />
      </section>

      {/* Categorías destacadas */}
      <div className="container my-5">
        <h2 className="fw-bold text-center mb-4" style={{ color: '#d72660' }}>Explora por categoría</h2>
        <div className="row justify-content-center g-4">
          {categorias.map((cat, idx) => (
            <div className="col-6 col-md-2 text-center" key={idx}>
              <Link to={cat.link} style={{
                display: 'inline-block',
                background: '#fff',
                borderRadius: '20px',
                boxShadow: '0 2px 12px rgba(215,38,96,0.08)',
                padding: '25px 12px',
                width: '100%',
                minWidth: '90px',
                textDecoration: 'none'
              }}>
                <div style={{ fontSize: '2.3rem' }}>{cat.icon}</div>
                <div className="fw-bold mt-2" style={{ color: '#d72660' }}>{cat.nombre}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonios */}
      <div className="container my-5">
        <h2 className="fw-bold text-center mb-4" style={{ color: '#d72660' }}>Lo que dicen nuestras clientas</h2>
        <div className="row justify-content-center g-4">
          {testimonios.map((t, idx) => (
            <div className="col-12 col-md-4" key={idx}>
              <div style={{
                background: '#fff',
                borderRadius: '20px',
                boxShadow: '0 2px 12px rgba(215,38,96,0.08)',
                padding: '24px'
              }}>
                <div className="d-flex align-items-center mb-3">
                  <img src={t.foto} alt={t.nombre} style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: '15px',
                    border: '2px solid #eebee9'
                  }} />
                  <span className="fw-bold" style={{ color: '#d72660' }}>{t.nombre}</span>
                </div>
                <p style={{ color: '#8d3d6c', fontStyle: 'italic' }}>{t.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Productos destacados */}
      <div className="container my-5">
        <h2 className="fw-bold text-center mb-4" style={{ color: '#d72660' }}>Productos destacados</h2>
        <div className="row justify-content-center g-4">
          {productos.slice(0, 8).map((p) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <Card
                nombre={p.nombre}
                precio={p.precio}
                imagen={p.imagen || 'https://via.placeholder.com/150'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/57XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: '#25d366',
          color: '#fff',
          borderRadius: '50%',
          width: '62px',
          height: '62px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.3rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.17)',
          zIndex: 9999,
          textDecoration: 'none'
        }}
        title="¿Necesitas ayuda? ¡Chatea con nosotros!"
      >
        <i className={PrimeIcons.WHATSAPP}></i> {/* Ícono de PrimeReact */}
        <span className="visually-hidden">WhatsApp</span>
      </a>
    </>
  );
};

export default Inicio;
