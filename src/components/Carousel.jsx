import React, { useState, useEffect } from 'react'; 
import { supabase } from '../config/supabase';

const Carousel = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function getProductos() {
      const { data: productos, error } = await supabase.from('product').select();

      if (error) {
        console.error('Error al obtener productos:', error.message);
        return;
      }

      console.log('Productos obtenidos:', productos);

      if (productos && productos.length > 0) {
        setProductos(productos);
      }
    }

    getProductos();
  }, []);

  return (
    <div className="d-flex justify-content-center vh-100">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade shadow-lg rounded-4 overflow-hidden"
        data-bs-ride="carousel"
        style={{
          width: '700px',
          height: '600px',
          left: '10%',
          top: '2%',
          backgroundColor: '#fff',
          border: '3px solid rgb(255, 255, 255)', // Color rosa moderno
        }}
      >
        <div className="carousel-inner">
          {productos.slice(0, 4).map((p, index) => ( // Limita a las primeras 3 imágenes
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={p.id}
            >
              <img
                src={p.imagen || 'https://via.placeholder.com/700x600'}
                className="d-block w-100 h-100 object-fit-cover"
                alt={`Producto ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;