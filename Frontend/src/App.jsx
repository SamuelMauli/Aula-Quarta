import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Products from './Pages/Products';
import Cart from './Pages/Cart';
import Payment from './Pages/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  )
}

export default App