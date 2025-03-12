import { useState } from "react";
import axios from "axios";

interface AddProductModal {
  onClose: () => void; // Function to close the modal
  refreshProducts: () => void; // Function to refresh the product list
}

const AddProductModal = ({ onClose, refreshProducts }: AddProductModal) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleAddProduct = async () => {
    try {
      await axios.post("http://localhost:8080/api/products", {
        name,
        price,
        stock,
      });
      alert("Product added!");
      refreshProducts(); // Refresh product list after adding
      onClose(); // Close modal
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

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
              onClick={onClose} // Close modal
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
