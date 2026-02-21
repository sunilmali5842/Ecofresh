import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function OrderSuccess() {
  const {id} = useParams();
  const orderId = id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("Order not found or access denied.");
          return;
        }

        setOrder(docSnap.data());
      } catch (err) {
        console.error(err);
        setError("Failed to load order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading order...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h2 className="text-red-500 mb-4">{error}</h2>
          <Link to="/" className="bg-green-600 text-white px-4 py-2 rounded">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-lg p-8">

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-4xl text-green-600">✓</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-4">
          Order Confirmed!
        </h1>

        <div className="bg-gray-50 p-4 rounded-lg border mb-6">
          <p className="text-sm text-gray-500">Order Number</p>
          <p className="font-semibold text-lg">{order.orderNumber}</p>
        </div>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t font-bold">
          <span>Total</span>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/products"
            className="flex-1 text-center bg-green-600 text-white py-3 rounded-lg"
          >
            Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="flex-1 text-center border py-3 rounded-lg"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
