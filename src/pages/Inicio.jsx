import React, { useState, useEffect } from 'react'; // Agrega useState y useEffect
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import { supabase } from '../config/supabase'

const Inicio = () => {
  const [productos, setProductos] = useState([])

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
    <>
      <Header />

      {/* Sección del Carousel */}
      <div className="carousel-section">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src="./Logo_2.png" 
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
            {productos.slice(0, 9).map((p) => ( // Limita a los primeros 9 productos
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
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Inicio;