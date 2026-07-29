import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">ReactDemo</h2>
          <p className="text-slate-400">
            Your trusted place to find quality products with a modern shopping experience.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="hover:text-white transition"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              className="hover:text-white transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="hover:text-white transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Services</h3>
          <ul className="space-y-2">
            <li className="hover:text-white transition cursor-pointer">Fast Delivery</li>
            <li className="hover:text-white transition cursor-pointer">Secure Payments</li>
            <li className="hover:text-white transition cursor-pointer">24/7 Support</li>
            <li className="hover:text-white transition cursor-pointer">Easy Returns</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Find Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              Dallas, TX, USA
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-purple-400" />
              +1 (555) 123‑4567
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-purple-400" />
              support@reactdemo.com
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700 mt-10 pt-4 text-center text-slate-500">
        © {new Date().getFullYear()} ReactDemo — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
