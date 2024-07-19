"use client";

import { FaSearch, FaShoppingCart } from 'react-icons/fa';
export function Header() {
  return (
    <header>
    <div className="flex justify-between items-center p-4 text-black">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">ECOMMERCE</h1>
      </div>
      <nav className="flex space-x-6">
        <a href="#" className="hover:text-gray-400">Categories</a>
        <a href="#" className="hover:text-gray-400">Sales</a>
        <a href="#" className="hover:text-gray-400">New Stock</a>
      </nav>
      <div className="flex items-center space-x-4">
        <FaSearch className="cursor-pointer " />
        <FaShoppingCart className="cursor-pointer " />
      </div>
      </div>
      <div className="bg-gray-100 text-center py-1 text-black">
        Get 10% off on business signup
      </div>
    </header>
    
  );
}
