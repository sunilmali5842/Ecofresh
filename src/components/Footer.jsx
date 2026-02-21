import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-3xl font-bold text-white">EcoFresh</h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Discover premium lifestyle products curated for quality,
              convenience, and modern living.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 transition duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 transition duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 transition duration-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-green-400 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-green-400 transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-green-400 transition duration-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="hover:text-green-400 transition duration-300"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-green-400 transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Get In Touch
            </h3>
            <p className="text-gray-400">
              Have questions or feedback? We'd love to hear from you.
            </p>

            <p className="mt-4 text-gray-400">
              Email: support@ecofresh.com
            </p>

            <p className="mt-2 text-gray-400">
              Phone: +1 (123) 456-7890
            </p>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EcoFresh. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
