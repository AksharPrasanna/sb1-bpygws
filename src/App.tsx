import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import PaperPage from './pages/PaperPage';
import CategorySection from './components/CategorySection';
import SearchPopup from './components/SearchPopup';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header toggleSearch={toggleSearch} />
        <div className="flex-grow flex">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<><CategorySection /><LandingPage /></>} />
                <Route path="/paper/:id" element={<PaperPage />} />
              </Routes>
            </div>
          </main>
        </div>
        <SearchPopup isOpen={isSearchOpen} onClose={toggleSearch} />
      </div>
    </Router>
  );
}

export default App;