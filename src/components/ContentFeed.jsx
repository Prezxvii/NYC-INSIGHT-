// src/components/ContentFeed.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsCard from './NewsCard';
import VideoModal from './VideoModal';
import '../styles/NewsCard.css';
import { fetchAllContent } from '../services/contentService';

const ContentFeed = ({ searchQuery, activeFilter, previewMode = false, maxItems = 6 }) => {
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

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
    let filtered = content;

    if (activeFilter === 'Video') {
      filtered = content.filter(item => item.type === 'video');
    } else if (activeFilter === 'Article') {
      filtered = content.filter(item => item.type === 'article');
    } else if (activeFilter === 'YouTube') {
      filtered = content.filter(item => item.source === 'YouTube');
    }

    // If preview mode, limit to maxItems
    if (previewMode) {
      filtered = filtered.slice(0, maxItems);
    }

    setFilteredContent(filtered);
  }, [activeFilter, content, previewMode, maxItems]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <div className="content-feed-container">
        <div className="feed-loading">
          <div className="spinner"></div>
          <p>Loading NYC content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-feed-container">
        <div className="feed-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="content-feed-container">
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
            <p className="feed-empty">No content available for this filter.</p>
          )}
        </div>

        {/* View All Button - Only show in preview mode */}
        {previewMode && (
          <div className="view-all-container">
            <button
              className="view-all-button"
              onClick={() => navigate('/feed')}
            >
              Explore All Content →
            </button>
          </div>
        )}
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ContentFeed;


