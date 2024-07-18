"use client";

import { FaSearch, FaShoppingCart } from 'react-icons/fa';
export function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">ECOMMERCE</h1>
      </div>
      <nav className="flex space-x-6">
        <a href="#" className="hover:text-gray-400">Categories</a>
        <a href="#" className="hover:text-gray-400">Sales</a>
        <a href="#" className="hover:text-gray-400">New Stock</a>
      </nav>
      <div className="flex items-center space-x-4">
        <FaSearch className="text-xl cursor-pointer hover:text-gray-400" />
        <FaShoppingCart className="text-xl cursor-pointer hover:text-gray-400" />
      </div>
    </header>
  );
}
