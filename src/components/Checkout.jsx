import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import { clearCart } from "../redux/cartSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "./context/AuthContext"; // or however you're handling auth


export default function Checkout() {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState("");


    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                fullName: user.displayName || "",
                email: user.email || "",
            }));
        }
    }, [user]);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        paymentMethod: "cod",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = "Full name required";
        if (!/^\S+@\S+\.\S+$/.test(formData.email))
            newErrors.email = "Valid email required";
        if (!formData.phone.trim()) newErrors.phone = "Phone required";
        if (!formData.address.trim()) newErrors.address = "Address required";
        if (!formData.city.trim()) newErrors.city = "City required";
        if (!formData.zip.trim()) newErrors.zip = "ZIP required";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!user) {
            alert("You must be logged in.");
            return;
        }

        console.log("User at submit:", user);

        try {
            setIsSubmitting(true);

            const orderData = {
                userId: user.uid,
                orderNumber: `ORD-${Date.now()}-${user.uid.slice(0, 4)}`,
                userEmail: user.email,
                customerInfo: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    zip: formData.zip,
                },
                items: cartItems.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    thumbnail: item.thumbnail,
                })),
                totalAmount: totalPrice,
                paymentMethod: formData.paymentMethod,
                status: "pending",
                createdAt: serverTimestamp(),
            };

            console.log("User at submit:", user);
            console.log("OrderData:", orderData);

            const docRef = await addDoc(collection(db, "orders"), orderData);

            console.log("Order saved with ID:", docRef.id);

            dispatch(clearCart());

            navigate(`/order-success/${docRef.id}`);


        } catch (error) {
            console.error(error);
            setApiError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    if (cartItems.length === 0) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Checkout</h1>
                <p className="text-gray-500 mb-6">Your cart is empty.</p>
                <Link
                    to="/products"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                >
                    Go to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-10 text-center">
                    Checkout
                </h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* ================= FORM ================= */}
                    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Full Name */}
                            <div>
                                <label className="block font-medium mb-1">Full Name</label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    aria-invalid={!!errors.fullName}
                                    aria-describedby="fullName-error"
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />

                                {errors.fullName && (
                                    <div
                                        id="fullName-error"
                                        className="flex items-start gap-2 mt-2 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md"
                                    >
                                        <span className="mt-0.5">⚠</span>
                                        <span>{errors.fullName}</span>
                                    </div>
                                )}
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium mb-1">
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        readOnly
                                    />
                                    {errors.email && (
                                        <div
                                            id="email-error"
                                            className="flex items-start gap-2 mt-2 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md"
                                        >
                                            <span className="mt-0.5">⚠</span>
                                            <span>{errors.email}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block font-medium mb-1">
                                        Phone*
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        maxLength="10"
                                    />
                                    {errors.phone && (
                                        <div
                                            id="phone-error"
                                            className="flex items-start gap-2 mt-2 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md"
                                        >
                                            <span className="mt-0.5">⚠</span>
                                            <span>{errors.phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>


                            {/* Address */}
                            <div>
                                <label className="block font-medium mb-1">
                                    Address*
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                                {errors.address && (
                                    <div
                                        id="address-error"
                                        className="flex items-start gap-2 mt-2 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md"
                                    >
                                        <span className="mt-0.5">⚠</span>
                                        <span>{errors.address}</span>
                                    </div>
                                )}
                            </div>

                            {/* City + ZIP */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* City */}
                                <div>
                                    <label className="block font-medium mb-1">City</label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        aria-invalid={!!errors.city}
                                        aria-describedby="city-error"
                                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    />

                                    {errors.city && (
                                        <div
                                            id="city-error"
                                            className="flex items-start gap-2 mt-2 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md"
                                        >
                                            <span className="mt-0.5">⚠</span>
                                            <span>{errors.city}</span>
                                        </div>
                                    )}
                                </div>

                                {/* ZIP */}
                                <div>
                                    <label className="block font-medium mb-1">ZIP Code</label>

                                    <input
                                        type="text"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        aria-invalid={!!errors.zip}
                                        aria-describedby="zip-error"
                                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        maxLength="6"
                                    />

                                    {errors.zip && (
                                        <div
                                            id="zip-error"
                                            className="flex items-start gap-2 mt-2 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md"
                                        >
                                            <span className="mt-0.5">⚠</span>
                                            <span>{errors.zip}</span>
                                        </div>
                                    )}
                                </div>
                            </div>


                            {/* Payment Method */}
                            <div>
                                <label className="block font-medium mb-2">
                                    Payment Method
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={formData.paymentMethod === "cod"}
                                            onChange={handleChange}
                                        />
                                        Cash on Delivery
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={formData.paymentMethod === "card"}
                                            onChange={handleChange}
                                        />
                                        Credit Card (Demo)
                                    </label>
                                </div>
                            </div>
                            {apiError && (
                                <p className="text-red-500 mt-4 text-sm">
                                    {apiError}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 rounded-lg text-white font-semibold cursor-pointer transition ${isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                                    }`}
                            >
                                {isSubmitting ? "Processing..." : "Place Order"}
                            </button>
                        </form>
                    </div>

                    {/* ================= ORDER SUMMARY ================= */}
                    <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-24">
                        <h2 className="text-xl font-semibold mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between text-sm"
                                >
                                    <span>
                                        {item.title} × {item.quantity}
                                    </span>
                                    <span>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t mt-6 pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
