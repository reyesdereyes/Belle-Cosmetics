import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import productosData from '../data/productos.json'; // Importar los datos de productos

const Inicio = () => {
  // Seleccionar los primeros 15 productos
  const productos = productosData.productos.slice(0, 15);

  return (
    <>
      <Header />

      {/* Sección del Carousel */}
      <div className="carousel-section">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src="public/LOGO ROSA CON BLANCO TRANSPARENTE.png"
            alt="Logo"
            style={{
              width: '700px', // Ajusta el ancho
              height: '700px', // Ajusta la altura
              marginTop: '-500px', // Ajusta el margen superior
              marginRight: '5%', // Ajusta el margen izquierdo
              borderRadius: '10px', // Bordes redondeados
            }}
          />
          <Carousel />
        </div>
      </div>

      {/* Espaciado entre el Carousel y las tarjetas */}
      <div className="mt-5"> {/* Agrega margen superior para separar */}
        <div className="container">
          <div className="row justify-content-center g-4">
            {productos.map((producto) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={producto.id}>
                <Card
                  nombre={producto.nombre}
                  precio={producto.precio}
                  imagen={producto.imagen || 'https://via.placeholder.com/150'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inicio;