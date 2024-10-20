import React, { useState, useEffect, useRef } from 'react';
import { HiX } from 'react-icons/hi';
import { papers } from '../data/papers';
import { Link } from 'react-router-dom';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof papers>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm) {
      const results = papers.filter(paper =>
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Search Papers</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <HiX size={24} />
          </button>
        </div>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for papers..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-4 max-h-96 overflow-y-auto">
          {searchResults.map(paper => (
            <Link
              key={paper.id}
              to={`/paper/${paper.id}`}
              onClick={onClose}
              className="block p-4 hover:bg-gray-100 rounded-md"
            >
              <h3 className="text-lg font-semibold">{paper.title}</h3>
              <p className="text-sm text-gray-600">{paper.authors}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;