"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth';

export default function Navbar() {
  const router = useRouter();
  const isLoggedIn = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('logout'));
    router.push('/login');
  };

  const handleDashboardBtn = () => {
    router.push('/dashboard');
  };

  const handleLoginBtn = () => {
    router.push('/login');
  };

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="w-12 h-12" />
          <span className="text-2xl font-bold text-gray-800 ml-2">SiyaRam Nursery and Farm</span>
          
        </Link>

        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/" className="text-gray-600 hover:text-green-500">
                Home
              </Link>
            </li>
            <li className="relative group">
              <Link href="/products" className="text-gray-600 hover:text-green-500">
              Products
              </Link>
              <ul className="absolute left-0 hidden group-hover:flex flex-col bg-white shadow-lg mt-1 border border-gray-200 rounded-md z-50 text-gray-600 hover:text-green-500">
                <li>
                  <Link href="/products/flowers" className="block px-4 py-2 hover:bg-gray-100">
                    Flowers
                  </Link>
                </li>
                <li>
                  <Link href="/products/plants" className="block px-4 py-2 hover:bg-gray-100">
                    Plants
                  </Link>
                </li>
                <li>
                  <Link href="/products/seeds" className="block px-4 py-2 hover:bg-gray-100">
                    Seeds
                  </Link>
                </li>
                <li>
                  <Link href="/products/potsandvases" className="block px-4 py-2 hover:bg-gray-100">
                    Pots and Vases
                  </Link>
                </li>
                <li>
                  <Link href="/products/pebblesandfertilizers" className="block px-4 py-2 hover:bg-gray-100">
                    Peebles and Fertilizers
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/soonerror" className="text-gray-600 hover:text-green-500">
                Gifts
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-600 hover:text-green-500">
                About
              </Link>
            </li>
            <li>
              <Link href="/support" className="text-gray-600 hover:text-green-500">
                Support
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleDashboardBtn}
                className="border-2 border-orange-600 text-orange-600 px-4 py-1 rounded hover:bg-orange-600 hover:text-white"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="border-2 border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-600 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginBtn}
              className="border-2 border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-600 hover:text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
