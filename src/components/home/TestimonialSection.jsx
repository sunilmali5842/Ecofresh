import React from "react";

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 mt-3">
            Trusted by thousands of happy shoppers worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
            <div className="flex items-center mb-4">
              <img
                src="https://i.pravatar.cc/100?img=1"
                alt="Customer"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">
                  Sarah Mitchell
                </h4>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Shopping at EcoFresh has been an amazing experience.
              The checkout process is smooth, delivery is fast, and
              the product quality always exceeds expectations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
            <div className="flex items-center mb-4">
              <img
                src="https://i.pravatar.cc/100?img=3"
                alt="Customer"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">
                  Daniel Carter
                </h4>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              I love the variety of products available.
              Everything feels well organized and secure.
              Definitely one of the best online shopping platforms I’ve used.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
            <div className="flex items-center mb-4">
              <img
                src="https://i.pravatar.cc/100?img=5"
                alt="Customer"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">
                  Emily Rodriguez
                </h4>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fast shipping, excellent customer support, and a clean,
              user-friendly interface. I highly recommend EcoFresh to anyone
              looking for a reliable shopping experience.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}