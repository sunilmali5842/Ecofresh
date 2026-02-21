import { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { auth, db } from '../firebase/firebase'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contactFormEntries"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        userId: auth.currentUser?.uid || null,
        createdAt: serverTimestamp(),
      });
      toast.success("Form Submitted Successfully.")

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData(prev => ({
          ...prev,
          email: user.email || "",
          name: user.displayName || ""
        }));
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <section className="min-h-screen bg-linear-to-br from-green-50 to-green-100 py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-4xl font-bold text-green-800 mb-6">
            Let’s Talk 
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Have questions about our products, orders, or services? We're here to help you every step of the way.
          </p>

          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <div className="bg-green-600 text-white p-3 rounded-full">
                <FaPhoneAlt />
              </div>
              <span className="text-gray-700">
                +1 234 567 890
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-600 text-white p-3 rounded-full">
                <FaEnvelope />
              </div>
              <span className="text-gray-700">
                support@ecofresh.com
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-600 text-white p-3 rounded-full">
                <FaMapMarkerAlt />
              </div>
              <span className="text-gray-700">
                123 Green Street, New York
              </span>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-white/30">

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-1">
                Your Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 px-4 py-2 rounded-lg outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 px-4 py-2 rounded-lg outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message*
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 px-4 py-2 rounded-lg outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white cursor-pointer py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
