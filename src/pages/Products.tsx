import axios from "axios";
import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import { Link } from "react-router-dom";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}
const ActionButton = ({
  label,
  variant,
  onClick,
}: {
  label: string;
  variant: "primary" | "danger";
  onClick: () => void;
}) => {
  const colors =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-red-500 hover:bg-red-700";

  return (
    <button
      className={`px-4 py-2 text-white rounded-lg transition ${colors}`}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </button>
  );
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [productIdToEdit, setProductIdToEdit] = useState("");

  const fetchProducts = () => {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleEdit = async (id: string) => {
    setProductIdToEdit(id);
    setIsEditProductModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts();
      alert("Product deleted!");
    fetchProducts();
    } catch (error) {
      console.error("Deletion failed:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      {/* Product List */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[14px] font-semibold">Product List</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => setIsAddProductModalOpen(true)}
        >
          + Add Product
        </button>
      </div>

      <table className="w-full border-collapse rounded-lg border border-gray-300 overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border border-gray-300  p-3">ID</th>
            <th className="border border-gray-300  p-3">Name</th>
            <th className="border border-gray-300  p-3">Price</th>
            <th className="border border-gray-300  p-3">Stock</th>
            <th colSpan={2} className="border border-gray-300  p-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="border border-gray-300  p-3 text-center">
                  {product.id}
                </td>
                <td className="border border-gray-300  p-3">{product.name}</td>
                <td className="border border-gray-300  p-3 text-right">
                  ${product.price.toFixed(2)}
                </td>
                <td className="border border-gray-300  p-3 text-center">
                  {product.stock}
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  {/* <Link to={`/edit-product/${product.id}`}>
                    <ActionButton
                      label="Edit"
                      variant="primary"
                      onClick={() => {}}
                    />
                  </Link> */}
                  <ActionButton
                    label="Edit"
                    variant="primary"
                    onClick={() => handleEdit(product.id)}
                  />
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  <ActionButton
                    label="Delete"
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <AddProductModal
          onClose={() => setIsAddProductModalOpen(false)}
          refreshProducts={fetchProducts}
        />
      )}

      {/* Edit Product Modal */}
      {isEditProductModalOpen && (
        <EditProductModal
          productId={productIdToEdit}
          onClose={() => setIsEditProductModalOpen(false)}
          refreshProducts={fetchProducts}
        />
      )}
    </div>
  );
};

export default Products;
