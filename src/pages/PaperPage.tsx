import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiCalendar, HiUsers, HiArrowLeft } from 'react-icons/hi';
import { papers } from '../data/papers';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import TableOfContents from '../components/TableOfContents';
import ReadingProgressBar from '../components/ReadingProgressBar';
import { useMarkdownContent } from '../hooks/useMarkdownContent';
import { extractHeadings } from '../utils/headingExtractor';

const PaperPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const paper = papers.find(p => p.id === Number(id));
  const content = useMarkdownContent(paper?.contentPath);
  const [headings, setHeadings] = useState<{ id: string; title: string; level: number }[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    setHeadings(extractHeadings(content));
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const windowHeight = scrollHeight - clientHeight;
        const progress = (scrollTop / windowHeight) * 100;
        setReadingProgress(progress);
      }
    };

    const currentRef = contentRef.current;
    currentRef?.addEventListener('scroll', handleScroll);

    return () => {
      currentRef?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!paper) {
    return <div className="text-center text-2xl text-gray-600">Paper not found</div>;
  }

  return (
    <article className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-screen">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="p-4 sm:p-6 relative">
          <ReadingProgressBar progress={readingProgress} />
          <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4">
            <HiArrowLeft size={20} className="mr-2" />
            Back to all papers
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{paper.title}</h1>
          <div className="flex flex-wrap items-center text-gray-600 mb-4">
            <HiUsers size={18} className="mr-2" />
            <span className="mr-4 text-sm">{paper.authors}</span>
            <HiCalendar size={18} className="mr-2" />
            <span className="text-sm">{paper.date}</span>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-hidden flex flex-col sm:flex-row">
        <div className="w-full sm:w-3/4 overflow-y-auto scrollbar-hide" ref={contentRef}>
          <div className="prose prose-sm sm:prose max-w-none p-4 sm:p-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                h1: ({node, ...props}) => <h2 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} className="text-xl sm:text-2xl font-bold mt-6 mb-3" {...props} />,
                h2: ({node, ...props}) => <h3 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} className="text-lg sm:text-xl font-semibold mt-5 mb-2" {...props} />,
                h3: ({node, ...props}) => <h4 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} className="text-base sm:text-lg font-semibold mt-4 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-3 text-sm sm:text-base" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-outside mb-3 pl-5" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-outside mb-3 pl-5" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-3" {...props} />,
                a: ({node, ...props}) => <a className="text-indigo-600 hover:text-indigo-800" {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
        <div className="w-full sm:w-1/4 p-4 sm:p-6 bg-gray-50 sm:bg-white overflow-y-auto">
          <div className="sticky top-0">
            <TableOfContents headings={headings} contentRef={contentRef} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PaperPage;