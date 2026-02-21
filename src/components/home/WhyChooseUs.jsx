import { FaTruck, FaShieldAlt, FaUndoAlt, FaHeadset } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose EcoFresh?
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We bring you premium quality products with seamless shopping experience,
            secure payments, and customer-first support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition duration-300 text-center group">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl group-hover:bg-green-600 group-hover:text-white transition duration-300">
              <FaTruck />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-800">
              Fast Delivery
            </h3>
            <p className="mt-3 text-gray-600 text-sm">
              Quick and reliable shipping to ensure your products reach you on time.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition duration-300 text-center group">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl group-hover:bg-green-600 group-hover:text-white transition duration-300">
              <FaShieldAlt />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-800">
              Secure Payments
            </h3>
            <p className="mt-3 text-gray-600 text-sm">
              Your transactions are encrypted and protected with industry standards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition duration-300 text-center group">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl group-hover:bg-green-600 group-hover:text-white transition duration-300">
              <FaUndoAlt />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-800">
              Easy Returns
            </h3>
            <p className="mt-3 text-gray-600 text-sm">
              Hassle-free returns within 7 days for a worry-free shopping experience.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition duration-300 text-center group">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl group-hover:bg-green-600 group-hover:text-white transition duration-300">
              <FaHeadset />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-800">
              24/7 Support
            </h3>
            <p className="mt-3 text-gray-600 text-sm">
              Our support team is always ready to assist you anytime, anywhere.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
