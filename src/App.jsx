import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importar React Router
import Inicio from './pages/Inicio';
import Productos from './pages/Productos'; // Importar la página Productos
import { CartProvider } from './components/CartContext'; // Importar el CartProvider
import Carrito from './pages/Carrito'; // Importar la página Carrito
import Vasio from './pages/Vasio';

function App() {
  return (
    <CartProvider>
      <Router basename="/Belle-Cosmetics">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito-vacio" element={<Vasio />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}


export default App;