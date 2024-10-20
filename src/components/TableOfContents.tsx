import React, { useState, useEffect, useRef } from 'react';

interface Heading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  contentRef: React.RefObject<HTMLDivElement>;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings, contentRef }) => {
  const [activeId, setActiveId] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);
  const tocRef = useRef<HTMLUListElement>(null);

  // Filter headings to include only h1, h2, and h3
  const filteredHeadings = headings.filter(heading => heading.level <= 3);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '-20% 0% -35% 0%',
      threshold: 1,
    });

    const elements = filteredHeadings.map(({ id }) => document.getElementById(id)).filter(Boolean);
    elements.forEach((el) => observer.current && el && observer.current.observe(el));

    return () => observer.current?.disconnect();
  }, [filteredHeadings]);

  useEffect(() => {
    if (activeId && tocRef.current) {
      const activeElement = tocRef.current.querySelector(`a[href="#${activeId}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeId]);

  return (
    <nav className="p-4 sm:p-0 overflow-y-auto max-h-[calc(100vh-200px)]">
      <ul ref={tocRef} className="space-y-2">
        {filteredHeadings.map((heading, index) => (
          <li
            key={`${heading.id}-${index}`}
            className={`pl-${(heading.level - 1) * 2} ${
              activeId === heading.id ? 'text-indigo-600 font-semibold' : 'text-gray-600'
            }`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element && contentRef.current) {
                  const yOffset = -100;
                  const y = element.getBoundingClientRect().top + contentRef.current.scrollTop + yOffset;
                  contentRef.current.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="hover:text-indigo-800 transition-colors duration-200 text-sm block py-1"
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;