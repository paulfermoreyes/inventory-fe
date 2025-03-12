import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { productId } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${productId}`)
      .then((response) => {
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [productId]);

  const handleUpdateProduct = async () => {
    try {
      await axios.put(`http://localhost:8080/api/products/${productId}`, {
        name,
        price,
        stock,
      });
      alert("Product updated!");
      navigate("/"); // Redirect back to product list
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            className="w-full border rounded-md p-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            className="w-full border rounded-md p-2 mt-1"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            className="w-full border rounded-md p-2 mt-1"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleUpdateProduct}
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
