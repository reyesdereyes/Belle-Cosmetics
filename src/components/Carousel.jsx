import React from 'react'

const Carousel = () => {
  return (
    <div className="d-flex justify-content-center  vh-100 ">
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
          border: '3px solidrgb(255, 255, 255)', // Color rosa moderno
        }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="src/assets/Bolso cosmetiquera.jpeg" // cambia la ruta según tu estructura
              className="d-block w-100 h-100 object-fit-cover"
              alt="Producto 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="src/assets/Brocha de Productos Liquidos.jpeg"
              className="d-block w-100 h-100 object-fit-cover"
              alt="Producto 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="src/assets/Polvo  Compacto DB.jpeg"
              className="d-block w-100 h-100 object-fit-cover"
              alt="Producto 3"
            />
          </div>
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
  )
}

export default Carousel
