import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { supabase } from '../config/supabase'; // Importa la configuración de Supabase

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    async function fetchProductos() {
      const { data: productos, error } = await supabase.from('product').select();

      if (error) {
        console.error('Error al cargar productos:', error.message);
        setLoading(false);
        return;
      }

      setProductos(productos); // Establece los productos obtenidos desde Supabase
      setLoading(false);
    }

    fetchProductos();
  }, []);

  // Filtrar productos según el término de búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="container mt-5">
        {/* Título con estilo */}
        <section className="text-center mb-5">
          <h2
            className="display-4 fw-bold"
            style={{
              color: '#ff00bf',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            Nuestros Productos
          </h2>
        </section>

        {/* Campo de búsqueda */}
        <div className="mb-4 text-center">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="form-control w-50 mx-auto"
            style={{ maxWidth: '400px' }}
          />
        </div>

        {/* Contenido principal */}
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-primary"
              style={{ width: '3rem', height: '3rem' }}
              role="status"
            >
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 text-muted">Cargando productos...</p>
          </div>
        ) : (
          <div className="row justify-content-center g-4">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((p) => (
                <div className="col-sm-6 col-md-4 col-lg-3" key={p.id}>
                  <Card
                    nombre={p.nombre}
                    precio={p.precio}
                    imagen={p.imagen || 'https://via.placeholder.com/150'}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="lead text-muted">No hay productos disponibles.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default Productos;