import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importar React Router
import Inicio from './pages/Inicio';
import Productos from './pages/Productos'; // Importar la página Productos
import { CartProvider } from './components/CartContext'; // Importar el CartProvider
import Carrito from './pages/Carrito'; // Importar la página Carrito
import Vasio from './pages/Vasio';
import Registro from './pages/Registro';
import Login from './pages/Login';


function App() {
  return (
    
<CartProvider> {/* Envolver la aplicación con CartProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} /> {/* Ruta para Inicio */}
          <Route path='/carrito' element={<Carrito />} /> {/* Ruta para Carrito */}
          <Route path="/productos" element={<Productos />} /> {/* Ruta para Productos */}
          <Route path="/carrito-vacio" element={<Vasio />} />
          <Route path="/registro" element={<Registro />} /> {/* Ruta para cualquier otra URL */}
          <Route path="/usuario/iniciar-sesion" element={<Login/>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;