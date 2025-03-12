import { useState } from "react";
import axios from "axios";

interface Product {
  name: string;
  price: number;
  stock: number;
}

interface Props {
  onProductAdded: () => void;
}

export default function ProductForm({ onProductAdded }: Props) {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:8080/api/products", product);
      setProduct({ name: "", price: 0, stock: 0 });
      onProductAdded(); // Refresh product list
    } catch (err) {
      setError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">Add Product</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
