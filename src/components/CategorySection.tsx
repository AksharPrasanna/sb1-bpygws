import React, { useRef, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { papers } from '../data/papers';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const CategorySection: React.FC = () => {
  const location = useLocation();
  const categories = ['All Categories', ...Array.from(new Set(papers.map(paper => paper.category)))];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
        checkScrollButtons();
      }
    };

    const currentRef = scrollContainerRef.current;
    currentRef?.addEventListener('wheel', handleWheel, { passive: false });
    currentRef?.addEventListener('scroll', checkScrollButtons);

    checkScrollButtons();

    return () => {
      currentRef?.removeEventListener('wheel', handleWheel);
      currentRef?.removeEventListener('scroll', checkScrollButtons);
    };
  }, []);

  const isActive = (category: string) => {
    if (category === 'All Categories' && location.search === '') {
      return true;
    }
    return location.search === `?category=${encodeURIComponent(category)}`;
  };

  return (
    <nav className="relative mb-8">
      {showLeftButton && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
          <button
            onClick={() => scroll('left')}
            className="bg-white rounded-full p-2 shadow-md text-gray-600 hover:text-indigo-600 focus:outline-none"
          >
            <HiChevronLeft size={24} />
          </button>
        </div>
      )}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto whitespace-nowrap scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <ul className="inline-flex space-x-4 py-2 px-12">
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                to={category === 'All Categories' ? '/' : `/?category=${encodeURIComponent(category)}`}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive(category)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {showRightButton && (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
          <button
            onClick={() => scroll('right')}
            className="bg-white rounded-full p-2 shadow-md text-gray-600 hover:text-indigo-600 focus:outline-none"
          >
            <HiChevronRight size={24} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default CategorySection;