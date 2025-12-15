import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import VideoModal from '../components/VideoModal';
import { fetchAllContent } from '../services/contentService';
import '../styles/CategoryPage.css';

const EventsPage = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Music', 'Sports', 'Arts & Culture', 'Food & Drink', 'Community'];

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const query =
          selectedCategory === 'All'
            ? 'New York events things to do'
            : `New York ${selectedCategory} events`;

        const data = await fetchAllContent({
          query,
          includeVideos: true,
          includeArticles: true,
        });

        setContent(data);
      } catch (err) {
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [selectedCategory]);

  return (
    <div className="category-page">
      {/* Hero */}
      <motion.div className="category-hero events-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="page-container">
          <div className="category-hero-content">
            <motion.div className="events-icon">
              <Calendar size={32} />
            </motion.div>

            <h1 className="category-title">NYC Events</h1>
            <p className="category-description">
              Discover concerts, festivals, exhibitions, and community gatherings across the city
            </p>
          </div>
        </div>
      </motion.div>

      <div className="page-container">
        {/* Filter */}
        <div className="filter-section">
          <h3 className="filter-label">Event Type:</h3>
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="content-stats">
          <p>
            {content.length} events
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Feed */}
        {loading ? (
          <div className="feed-loading">
            <div className="spinner"></div>
            <p>Loading events...</p>
          </div>
        ) : (
          <div className="feed-grid">
            {content.length ? (
              content.map((item) => <NewsCard key={item.id} content={item} />)
            ) : (
              <div className="feed-empty">
                <p>No events available.</p>
                <button className="reset-filter-button" onClick={() => setSelectedCategory('All')}>
                  View All Events
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </div>
  );
};

export default EventsPage;

