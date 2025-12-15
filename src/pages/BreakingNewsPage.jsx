import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Siren, Radio } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import VideoModal from '../components/VideoModal';
import { fetchAllContent } from '../services/contentService';
import '../styles/CategoryPage.css';

const BreakingNewsPage = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedBorough, setSelectedBorough] = useState('All');

  const boroughs = ['All', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'];

  useEffect(() => {
    const loadBreakingNews = async () => {
      try {
        setLoading(true);
        const query =
          selectedBorough === 'All'
            ? 'New York breaking news urgent'
            : `${selectedBorough} New York breaking news`;

        const data = await fetchAllContent({
          query,
          includeVideos: false,
          includeArticles: true,
        });

        const sortedData = data.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );

        setContent(sortedData);
      } catch (err) {
        console.error('Error loading breaking news:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBreakingNews();
  }, [selectedBorough]);

  return (
    <div className="category-page">
      {/* Hero */}
      <motion.div className="category-hero breaking-news-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="page-container">
          <div className="category-hero-content">
            <motion.div className="breaking-badge" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <Siren size={18} /> LIVE
            </motion.div>

            <h1 className="category-title">Breaking News</h1>
            <p className="category-description">
              Stay informed with the latest urgent news and updates from across NYC
            </p>
          </div>
        </div>
      </motion.div>

      <div className="page-container">
        {/* Filter */}
        <div className="filter-section">
          <h3 className="filter-label">Filter by Borough:</h3>
          <div className="borough-filters">
            {boroughs.map((borough) => (
              <button
                key={borough}
                className={`filter-btn ${selectedBorough === borough ? 'active' : ''}`}
                onClick={() => setSelectedBorough(borough)}
              >
                {borough}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="content-stats">
          <p>
            <Radio size={14} /> {content.length} breaking stories
            {selectedBorough !== 'All' && ` in ${selectedBorough}`}
          </p>
        </div>

        {/* Feed */}
        {loading ? (
          <div className="feed-loading">
            <div className="spinner"></div>
            <p>Loading breaking news...</p>
          </div>
        ) : (
          <div className="feed-grid">
            {content.length ? (
              content.map((item) => <NewsCard key={item.id} content={item} />)
            ) : (
              <div className="feed-empty">
                <p>No breaking news available.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </div>
  );
};

export default BreakingNewsPage;

