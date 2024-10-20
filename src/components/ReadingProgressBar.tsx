import React from 'react';

interface ReadingProgressBarProps {
  progress: number;
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ progress }) => {
  return (
    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
      <div 
        className="h-full bg-indigo-600 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ReadingProgressBar;