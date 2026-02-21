import React from "react";
import { Link } from "react-router";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ===== Hero Section ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Smart Shopping, Made Simple
            </h1>

            <p className="text-gray-600 mb-4 leading-relaxed">
              At EcoFresh, we believe shopping should be effortless,
              reliable, and enjoyable. Our platform brings together a wide
              range of quality products — all carefully selected to offer
              value, convenience, and trust.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Whether you're exploring everyday essentials or discovering
              something new, EcoFresh is designed to give you a smooth and
              secure shopping experience from start to finish.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
              alt="Shopping Experience"
              className="rounded-2xl shadow-lg"
            />
          </div>

        </div>
      </section>


      {/* ===== Our Commitment Section ===== */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Our Commitment
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="p-6 rounded-xl hover:shadow-md transition">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold text-lg mb-2">Trusted Experience</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We prioritize reliability and transparency to ensure every
                customer feels confident while shopping with us.
              </p>
            </div>

            <div className="p-6 rounded-xl hover:shadow-md transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Seamless Convenience</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                From browsing to checkout, our platform is designed for
                simplicity and speed — saving you time and effort.
              </p>
            </div>

            <div className="p-6 rounded-xl hover:shadow-md transition">
              <div className="text-4xl mb-4">💚</div>
              <h3 className="font-semibold text-lg mb-2">Customer First</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your satisfaction matters most. We continuously improve to
                deliver better service and a better shopping journey.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ===== Achievements + CTA Section ===== */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Growing With Our Community
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mb-16">

            <div>
              <h3 className="text-3xl font-bold text-green-600">10K+</h3>
              <p className="text-gray-600 mt-2 text-sm">Happy Customers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-green-600">500+</h3>
              <p className="text-gray-600 mt-2 text-sm">Products Available</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-green-600">4.8★</h3>
              <p className="text-gray-600 mt-2 text-sm">Customer Rating</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-green-600">24/7</h3>
              <p className="text-gray-600 mt-2 text-sm">Support Assistance</p>
            </div>

          </div>

          <div>
            <h3 className="text-xl font-semibold mb-8">
              Ready to explore our products?
            </h3>

            <Link
              to="/products"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Explore Products
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}