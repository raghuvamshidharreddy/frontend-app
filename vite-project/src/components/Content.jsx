import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Content.css";

const API_URL = import.meta.env.VITE_API_URL;

function Content() {
  // const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const { user, setUser, cart, setCart } = useContext(AppContext);
  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/store`;
      const res = await axios.get(url);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      const newProduct = { ...product, quantity: 1 };
      setCart([...cart, newProduct]);
    } else {
      alert("Item already in cart");
    }
  };

  return (
    <div>
      <div className="row">
        {Array.isArray(products) && products.map((product) => (
          <div className="box" key={product._id}>
            <img src={`${API_URL}/${product.image}`} width="300px" alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <h4>₹{product.price}</h4>
            <p>
              <button onClick={() => addToCart(product)}>
                {cart.find(item => item._id === product._id) ? "In Cart" : "Add to Cart"}
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Content;