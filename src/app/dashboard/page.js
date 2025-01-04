"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../../../lib/auth";

export default function Dashboard() {
  const isUserLoggedIn = useAuth();
  const router = useRouter();

  const [adminView, setAdminView] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 900 });
    document.title = "Dashboard | SiyaRam";
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleAddToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setCart([...cart, product]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {adminView ? "Admin Dashboard" : "Customer Dashboard"}
          </h1>
          <button
            onClick={() => setAdminView(!adminView)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Switch to {adminView ? "Customer" : "Admin"} View
          </button>
        </div>

        {adminView ? (
          // Admin Dashboard
          <AdminDashboard products={products} onAddProduct={handleAddProduct} />
        ) : (
          // Customer Dashboard
          <CustomerDashboard
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
}

function AdminDashboard({ products, onAddProduct }) {
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    rate: "",
    discount: "",
    currentPrice: "",
    category: "",
    images: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(newProduct);
    setNewProduct({
      id: "",
      name: "",
      rate: "",
      discount: "",
      currentPrice: "",
      category: "",
      images: "",
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="id"
          value={newProduct.id}
          onChange={handleChange}
          placeholder="Unique ID"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="rate"
          value={newProduct.rate}
          onChange={handleChange}
          placeholder="Rate"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="discount"
          value={newProduct.discount}
          onChange={handleChange}
          placeholder="Discount (%)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="currentPrice"
          value={newProduct.currentPrice}
          onChange={handleChange}
          placeholder="Current Price"
          className="w-full p-2 border rounded"
        />
        <select
          name="category"
          value={newProduct.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="flowers">Flowers</option>
          <option value="plants">Plants</option>
          <option value="seeds">Seeds</option>
          <option value="potsandvases">Pots & Vases</option>
          <option value="pebblesandfertilizers">Pebbles & Fertilizers</option>
        </select>
        <input
          type="text"
          name="images"
          value={newProduct.images}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded">
          Add Product
        </button>
      </form>
      <h2 className="text-xl font-semibold text-gray-700 mt-6">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 bg-gray-200 rounded">
            <p><strong>ID:</strong> {product.id}</p>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ${product.currentPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomerDashboard({ products, cart, onAddToCart }) {
  const discountedProducts = products.filter((p) => p.discount >= 10);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {discountedProducts.map((product) => (
          <div key={product.id} className="p-4 bg-gray-200 rounded">
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Discount:</strong> {product.discount}%</p>
            <p><strong>Price:</strong> ${product.currentPrice}</p>
            <button
              onClick={() => onAddToCart(product.id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold text-gray-700 mt-6">My Cart</h2>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {cart.map((item, index) => (
          <div key={index} className="p-4 bg-gray-200 rounded">
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Price:</strong> ${item.currentPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
