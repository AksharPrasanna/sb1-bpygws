import React from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiInformationCircle, HiMail, HiMenu, HiX } from 'react-icons/hi';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { icon: HiHome, label: 'Home', path: '/' },
    { icon: HiInformationCircle, label: 'About', path: '#' },
    { icon: HiMail, label: 'Contact', path: '#' },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white shadow-lg transform ${
        isOpen ? 'w-64' : 'w-16'
      } transition-all duration-300 ease-in-out z-20`}
    >
      <div className="p-4 h-full flex flex-col">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-indigo-600 focus:outline-none w-8 h-8 mb-8 relative"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <HiMenu className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <HiX className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
        </button>
        <nav className="flex-grow">
          <ul className="space-y-6">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  onClick={() => item.path === '#' && toggleSidebar()}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className={`ml-4 transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'} overflow-hidden whitespace-nowrap`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;