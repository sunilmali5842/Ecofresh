import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import {
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import { Link } from "react-router";

export default function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-500 mb-6">Your cart is currently empty.</p>
        <Link
          to="/products"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Shopping Cart
      </h1>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product) => (
              <tr
                key={product.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {product.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(product.id))
                      }
                      className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition"
                    >
                      -
                    </button>

                    <span className="font-medium">
                      {product.quantity}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(increaseQuantity(product.id))
                      }
                      className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition"
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="p-4 font-semibold">
                  ${(product.price * product.quantity).toFixed(2)}
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() =>
                      dispatch(removeFromCart(product.id))
                    }
                    className="text-red-500 hover:text-red-700 transition"
                    aria-label="Remove item"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {cartItems.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.08)] rounded-xl p-4 flex gap-4"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-gray-800">
                {product.title}
              </h2>

              <p className="text-sm text-gray-500 my-1">
                ${product.price.toFixed(2)}
              </p>

              <p className="font-semibold text-gray-800">
                ${(product.price * product.quantity).toFixed(2)}
              </p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() =>
                    dispatch(decreaseQuantity(product.id))
                  }
                  className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-700 rounded-full"
                >
                  -
                </button>

                <span className="font-medium">
                  {product.quantity}
                </span>

                <button
                  onClick={() =>
                    dispatch(increaseQuantity(product.id))
                  }
                  className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-700 rounded-full"
                >
                  +
                </button>

                <button
                  onClick={() =>
                    dispatch(removeFromCart(product.id))
                  }
                  className="ml-auto text-red-500"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= TOTAL + ACTIONS ================= */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xl font-bold text-gray-800">
          Total: ${totalPrice.toFixed(2)}
        </p>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <Link
            to="/products"
            className="w-full md:w-auto text-center bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
          >
            Continue Shopping
          </Link>

          <button
            onClick={() => dispatch(clearCart())}
            className="w-full md:w-auto cursor-pointer bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Clear Cart
          </button>

          <Link to="/checkout" className="w-full md:w-auto text-center cursor-pointer bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
