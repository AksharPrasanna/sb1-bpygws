import React from 'react';
import { Link } from 'react-router-dom';
import { HiBookOpen, HiSearch, HiDocumentText } from 'react-icons/hi';

interface HeaderProps {
  toggleSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSearch }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800">
            <HiBookOpen size={28} />
            <span className="text-xl font-semibold">Anusandhan</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              <HiSearch size={24} />
            </button>
            <button className="flex items-center text-gray-600 hover:text-indigo-600 focus:outline-none">
              <HiDocumentText size={24} className="mr-2" />
              <span>Process Drive</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;