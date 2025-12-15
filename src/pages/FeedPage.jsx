// src/pages/FeedPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NewsCard from '../components/NewsCard';
import VideoModal from '../components/VideoModal';
import { fetchAllContent } from '../services/contentService';
import '../styles/FeedPage.css';

const FeedPage = () => {
  const [searchParams] = useSearchParams();
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeFilter, setActiveFilter] = useState(searchParams.get('filter') || 'All');

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const query = searchQuery || 'New York';
        const data = await fetchAllContent({
          query,
          includeVideos: true,
          includeArticles: true
        });
        setContent(data);
        setFilteredContent(data);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [searchQuery]);

  useEffect(() => {
    // Filter content based on active filter
    if (activeFilter === 'All') {
      setFilteredContent(content);
    } else if (activeFilter === 'Video') {
      setFilteredContent(content.filter(item => item.type === 'video'));
    } else if (activeFilter === 'Article') {
      setFilteredContent(content.filter(item => item.type === 'article'));
    } else if (activeFilter === 'YouTube') {
      setFilteredContent(content.filter(item => item.source === 'YouTube'));
    } else if (activeFilter === 'TikTok') {
      setFilteredContent(content.filter(item => item.source === 'TikTok'));
    }
  }, [activeFilter, content]);

  const handleSearch = (query, filter) => {
    setSearchQuery(query);
    setActiveFilter(filter);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="feed-page">
      <div className="page-container">
        {/* Page Header */}
        <div className="feed-header">
          <h1 className="feed-page-title">NYC Content Feed</h1>
          <p className="feed-page-subtitle">
            Explore all the latest news, videos, and events from across New York City
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

        {/* Content Stats */}
        <div className="content-stats">
          <p>Showing <strong>{filteredContent.length}</strong> results</p>
        </div>

        {/* Content Feed */}
        {loading ? (
          <div className="feed-loading">
            <div className="spinner"></div>
            <p>Loading content...</p>
          </div>
        ) : error ? (
          <div className="feed-error">
            <p>{error}</p>
          </div>
        ) : (
          <div className="feed-grid">
            {filteredContent.length > 0 ? (
              filteredContent.map((item) => (
                <NewsCard 
                  key={item.id} 
                  content={item}
                  onVideoClick={handleVideoClick}
                />
              ))
            ) : (
              <div className="feed-empty">
                <p>No content available for this filter.</p>
                <button 
                  className="reset-filter-button"
                  onClick={() => setActiveFilter('All')}
                >
                  View All Content
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default FeedPage;