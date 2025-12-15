// src/pages/BoroughPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import NewsCard from '../components/NewsCard';
import VideoModal from '../components/VideoModal';
import { fetchAllContent } from '../services/contentService';
import '../styles/BoroughPage.css';

const BOROUGH_INFO = {
  manhattan: {
    name: 'Manhattan',
    tagline: 'The Heart of NYC',
    description: 'From Wall Street to Times Square, discover what\'s happening in the city\'s most iconic borough.',
    color: '#FF6B6B',
    neighborhoods: ['Upper West Side', 'Greenwich Village', 'Harlem', 'Financial District', 'Midtown'],
    heroImage: 'https://images.unsplash.com/photo-1546436836-07a91091f160?w=1200'
  },
  brooklyn: {
    name: 'Brooklyn',
    tagline: 'Where Culture Meets Community',
    description: 'Explore the vibrant neighborhoods, arts scene, and diverse communities of Brooklyn.',
    color: '#4ECDC4',
    neighborhoods: ['Williamsburg', 'Park Slope', 'DUMBO', 'Bushwick', 'Crown Heights'],
    heroImage: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200'
  },
  queens: {
    name: 'Queens',
    tagline: 'The World\'s Borough',
    description: 'Experience the most diverse urban area in the world, from Flushing to Astoria.',
    color: '#FFD93D',
    neighborhoods: ['Astoria', 'Flushing', 'Long Island City', 'Forest Hills', 'Jackson Heights'],
    heroImage: 'https://cdn.pixabay.com/photo/2020/06/06/03/38/new-york-5265097_1280.jpg'
  },
  bronx: {
    name: 'Bronx',
    tagline: 'The Birthplace of Hip-Hop',
    description: 'Discover the rich culture, history, and community spirit of the Bronx.',
    color: '#6BCB77',
    neighborhoods: ['Fordham', 'Riverdale', 'Morris Park', 'Pelham Bay', 'Mott Haven'],
    heroImage: 'https://cdn.pixabay.com/photo/2018/05/02/17/24/architecture-3369147_1280.jpg'
  },
  'staten-island': {
    name: 'Staten Island',
    tagline: 'NYC\'s Hidden Gem',
    description: 'Explore Staten Island\'s waterfront parks, cultural attractions, and tight-knit communities.',
    color: '#95E1D3',
    neighborhoods: ['St. George', 'Tottenville', 'New Dorp', 'Port Richmond', 'Great Kills'],
    heroImage: 'https://cdn.pixabay.com/photo/2016/11/05/11/33/new-york-1800020_1280.jpg'
  }
};

const BoroughPage = () => {
  const { borough } = useParams();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const boroughInfo = BOROUGH_INFO[borough] || BOROUGH_INFO.manhattan;

  useEffect(() => {
    const loadBoroughContent = async () => {
      try {
        setLoading(true);
        const data = await fetchAllContent({
          query: `${boroughInfo.name} New York`,
          includeVideos: true,
          includeArticles: true
        });
        setContent(data);
      } catch (err) {
        console.error('Error loading borough content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBoroughContent();
  }, [borough, boroughInfo.name]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="borough-page">
      {/* Borough Hero Section */}
      <motion.div 
        className="borough-hero"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${boroughInfo.heroImage})`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="page-container">
          <div className="borough-hero-content">
            <motion.h1 
              className="borough-title"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {boroughInfo.name}
            </motion.h1>
            <motion.p 
              className="borough-tagline"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {boroughInfo.tagline}
            </motion.p>
            <motion.p 
              className="borough-description"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {boroughInfo.description}
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="page-container">
        {/* Popular Neighborhoods */}
        <section className="neighborhoods-section">
          <h2 className="section-title">Popular Neighborhoods</h2>
          <div className="neighborhoods-grid">
            {boroughInfo.neighborhoods.map((neighborhood, index) => (
              <motion.div
                key={neighborhood}
                className="neighborhood-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3>{neighborhood}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Latest Content */}
        <section className="borough-content-section">
          <h2 className="section-title">
            Latest from {boroughInfo.name}
          </h2>

          {loading ? (
            <div className="feed-loading">
              <div className="spinner"></div>
              <p>Loading {boroughInfo.name} content...</p>
            </div>
          ) : (
            <div className="feed-grid">
              {content.length > 0 ? (
                content.map((item) => (
                  <NewsCard 
                    key={item.id} 
                    content={item}
                    onVideoClick={handleVideoClick}
                  />
                ))
              ) : (
                <div className="feed-empty">
                  <p>No content available for {boroughInfo.name} at the moment.</p>
                </div>
              )}
            </div>
          )}
        </section>
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

export default BoroughPage;