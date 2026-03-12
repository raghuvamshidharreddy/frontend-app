import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
    const { user, cart, setCart } = useContext(AppContext);
    const [orderValue, setOrderValue] = useState(0);
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const increment = (id) => {
        setCart(
            cart.map((item) => {
                if (item._id === id) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            }),
        );
    };
    const decrement = (id) => {
        setCart(
            cart.map((item) => {
                if (item._id === id && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else if (item._id === id && item.quantity === 1) {
                    if(window.confirm("Remove item from cart?")) {
                        return null;
                    }
                }
                return item;
            }).filter(item => item !== null),
        );
    };

    const handlePlaceOrder = async () => {
        if (!user.email) {
            alert("Please login to place an order");
            navigate("/login");
            return;
        }
        if (cart.length === 0) {
            alert("Your cart is empty");
            return;
        }

        try {
            const url = `${API_URL}/api/orders/place`;
            const res = await axios.post(url, {
                email: user.email,
                orderValue: orderValue,
                items: cart.filter(item => item.quantity > 0)
            });
            alert(res.data.message);
            setCart([]); 
            navigate("/orders");
        } catch (error) {
            console.error("Order failed:", error);
            alert("Failed to place order");
        }
    };

    useEffect(() => {
        setOrderValue(
            cart.reduce((sum, item) => {
                return sum + item.quantity * item.price;
            }, 0),
        );
    }, [cart]);

    return (
        <div className="cart-container">
            <h1>Your Shopping Cart</h1>
            {cart.length === 0 ? (
                <p style={{textAlign: 'center', color: 'var(--text-muted)'}}>Your cart is empty</p>
            ) : (
                <>
                    <ul className="cart-items">
                        {cart.map((item) => (
                            <li key={item._id} className="cart-item">
                                <div className="item-info">
                                    <h3>{item.name}</h3>
                                    <p>₹{item.price} each</p>
                                </div>
                                <div className="quantity-controls">
                                    <button onClick={() => decrement(item._id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increment(item._id)}>+</button>
                                </div>
                                <div className="item-total">
                                    ₹{item.quantity * item.price}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Total Amount</h3>
                        <strong>₹{orderValue}</strong>
                    </div>
                    <button className="place-order-btn" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;