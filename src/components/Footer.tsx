import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-30 backdrop-blur-md py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Ledi AI</h3>
            <p className="text-sm text-gray-300">
              Empowering musicians with AI-driven music generation and distribution.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm hover:text-pink-500 transition-colors">About Us</a></li>
              <li><a href="/terms" className="text-sm hover:text-pink-500 transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="text-sm hover:text-pink-500 transition-colors">Privacy Policy</a></li>
              <li><a href="/contact" className="text-sm hover:text-pink-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-pink-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-500 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Ledi AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;