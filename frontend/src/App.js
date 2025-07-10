import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home.jsx';
import ProductList from './pages/protuct-list.jsx';
import './App.css';
import './assets/styles/style.css';
import Product from "./pages/product.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/catalog" element={<ProductList/>} />
        <Route path="/product/:uuid" element={<Product/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
