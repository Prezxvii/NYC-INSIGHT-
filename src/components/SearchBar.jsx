import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react'; // Import the search icon
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, onFilterChange }) => {
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Video', 'Article', 'YouTube', 'TikTok'];

  const barVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 20, 
        delay: 0.2 
      } 
    },
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      onSearch(searchText, activeFilter);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  return (
    <motion.div 
      className="search-bar-container"
      variants={barVariants}
      initial="initial"
      animate="animate"
    >
      <div className="search-input-group">
        <input
          type="text"
          className="search-input"
          placeholder={`Search NYC for ${activeFilter} content...`}
          value={searchText}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="search-button"
          onClick={handleSearchSubmit}
          aria-label="Search"
        >
          <Search size={20} /> {/* Replaced emoji with icon */}
        </button>
      </div>

      <div className="filter-group">
        {filters.map(filter => (
          <button
            key={filter}
            className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default SearchBar;

