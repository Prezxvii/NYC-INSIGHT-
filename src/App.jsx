// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx'; 
import ContentFeed from './components/ContentFeed.jsx'; 
import SearchBar from './components/SearchBar.jsx'; 
import CTABanner from './components/CTABanner.jsx'; 
import Footer from './components/Footer.jsx'; 
import FeaturesSection from './components/FeaturesSection.jsx'; 
import FAQSection from './components/FAQSection.jsx';

// Pages
import FeedPage from './pages/FeedPage.jsx';
import BoroughPage from './pages/BoroughPage.jsx';
import BreakingNewsPage from './pages/BreakingNewsPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const handleSearch = (query, filter) => {
    setSearchQuery(query);
    console.log(`Searching for: ${query} with filter: ${filter}`);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    console.log(`Filter changed to: ${filter}`);
  };

  return (
    <Router>
      <div className="App">
        {/* Header */}
        <Header /> 
        
        <main> 
          <Routes>
            {/* Homepage */}
            <Route
              path="/"
              element={
                <div className="page-container"> 
                  <HeroSection /> 
                  <FeaturesSection /> 
                  <SearchBar 
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                  />
                  <h2 style={{ 
                    marginTop: '40px', 
                    marginBottom: '20px',
                    color: 'var(--color-navy-blue)',
                    fontSize: '2rem',
                    fontWeight: '800'
                  }}>
                    Trending in NYC
                  </h2>
                  <ContentFeed 
                    searchQuery={searchQuery}
                    activeFilter={activeFilter}
                    previewMode={true}
                    maxItems={6}
                  /> 
                  <FAQSection /> 
                  <CTABanner /> 
                </div>
              }
            />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* App Pages */}
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/borough/:borough" element={<BoroughPage />} />
            <Route path="/breaking-news" element={<BreakingNewsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
