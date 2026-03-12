import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Orders.css";

function Orders() {
    const { user, orders, setOrders } = useContext(AppContext);
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchOrders = async () => {
        try {
            const url = `${API_URL}/api/orders/user/${user._id}`;
            const res = await axios.get(url);
            setOrders(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            setOrders([]);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrder = async (id, status) => {
        try {
            const url = `${API_URL}/api/orders/${id}/update`;
            const res = await axios.post(url, { id, status });
            fetchOrders();
        } catch (error) {
            console.error("Failed to update order:", error);
        }
    }

    return (
        <div className="orders-container">
            <h2>Order History</h2>
            <div className="orders-grid">
                {Array.isArray(orders) && orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id} className={`order-card ${order.status.toLowerCase()}`}>
                            <h3>Order ID: {order._id.slice(-6)}</h3>
                            <div className="order-details">
                                <div className="order-row">
                                    <span>Customer</span>
                                    <span>{order.userId?.email || 'N/A'}</span>
                                </div>
                                <div className="order-row">
                                    <span>Total Value</span>
                                    <span>₹{order.orderValue}</span>
                                </div>
                                <div className="order-row">
                                    <span>Items count</span>
                                    <span>{order.items?.length || 0} items</span>
                                </div>
                                <div className="order-row">
                                    <span>Status</span>
                                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            {order.status === "Pending" && (
                                <button className="update-btn" onClick={() => updateOrder(order._id, "Completed")}>
                                    Mark as Completed
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p style={{textAlign: 'center', gridColumn: '1/-1', color: 'var(--text-muted)'}}>No orders found</p>
                )}
            </div>
        </div>
    );
}

export default Orders;