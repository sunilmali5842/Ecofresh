import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";

export default function MyOrders() {
    const { user, loading: authLoading } = useAuth();



    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (authLoading) return;

        const fetchOrders = async () => {
            try {
                const q = query(
                    collection(db, "orders"),
                    where("userId", "==", user.uid),
                    orderBy("createdAt", "desc")
                );

                const querySnapshot = await getDocs(q);

                const fetchedOrders = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setOrders(fetchedOrders);
                
            } catch (err) {
                console.error(err);
                setError("Failed to load orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, authLoading]);



    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading your orders...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-semibold mb-4">No Orders Yet</h2>
                <Link
                    to="/products"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white p-6 rounded-xl shadow-sm border"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                                <div>
                                    <p className="text-sm text-gray-500">Order Number</p>
                                    <p className="font-semibold">{order.orderNumber}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Date</p>
                                    <p>
                                        {order.createdAt?.toDate().toLocaleDateString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-semibold">
                                        ${order.totalAmount.toFixed(2)}
                                    </p>
                                </div>

                                <div>
                                    <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 capitalize">
                                        {order.status}
                                    </span>
                                </div>

                                <div>
                                    <Link
                                        to={`/order-success/${order.id}`}
                                        className="text-green-600 font-medium hover:underline"
                                    >
                                        View Details →
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}