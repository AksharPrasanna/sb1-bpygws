import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { papers } from '../data/papers';

const LandingPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  const filteredPapers = category
    ? papers.filter(paper => paper.category === category)
    : papers;

  return (
    <div className="space-y-8">
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPapers.map((paper) => (
          <div key={paper.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-2">
                {paper.category}
              </span>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{paper.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{paper.authors}</p>
              <p className="text-gray-700 mb-4">{paper.abstract}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{paper.date}</span>
                <Link to={`/paper/${paper.id}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
                  Read more
                  <HiArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default LandingPage;