import React from 'react'

import config from '../config/index.json'

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white p-4 text-gray-700">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-lg font-semibold">
          <a href="/" className="hover:text-gray-200">
            Logo
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <a href="/home" className="hover:text-gray-200">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-200">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-gray-200">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-200">
                Contact
              </a>
            </li>
          </ul>
          {/* Barra de búsqueda */}
          <div className="flex items-center overflow-hidden rounded border-2">
            <input
              type="search"
              placeholder="Search..."
              className="w-48 px-4 py-2"
            />
            <button className="bg-gray-200 px-4 hover:bg-gray-300">
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 6h13M6 8h15M4 16h17M2 12h19"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
