import React from 'react'
import Banner from '../../assets/images/hero-bg-img-2.webp'
import { Link } from 'react-router';

export default function Hero() {
  return (
    <section
      className="relative h-[85vh] bg-cover bg-center"
      style={{
        backgroundImage:
          `url(${Banner})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
          Elevate Your Lifestyle with Curated Essentials
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-xl text-gray-200">
          Discover premium beauty, home, and lifestyle products designed
          to bring quality and elegance into your everyday life.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/products" className="bg-green-600 hover:bg-green-700 transition duration-300 px-8 py-3 rounded-lg text-lg font-medium shadow-lg cursor-pointer">
            Shop Now
          </Link>

          <Link to="/products" className="border border-white hover:bg-white hover:text-black transition duration-300 px-8 py-3 rounded-lg text-lg font-medium cursor-pointer">
            Explore Products
          </Link>
        </div>
      </div>
    </section>
  );
}
