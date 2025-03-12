import { Link, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <div className="p-4">
      <nav className="mb-4">
        <Link to="/" className="mr-4 text-blue-500">Home</Link>
        <Link to="/products" className="text-blue-500">Products</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Welcome to Inventory System</h1>} />
        <Route path="/products" element={<Products />} />
        <Route path="/edit-product/:productId" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default App;
