// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Bookmark, TrendingUp, MapPin, Calendar } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import VideoModal from '../components/VideoModal';
import { fetchAllContent } from '../services/contentService';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [savedContent, setSavedContent] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllContent({
          query: 'New York',
          includeVideos: true,
          includeArticles: true
        });
        setSavedContent(data.slice(0, 4));
        setRecentActivity([
          { type: 'bookmark', title: 'Brooklyn Bridge Park Expansion', time: '2 hours ago' },
          { type: 'view', title: 'Manhattan Food Festival 2024', time: '5 hours ago' },
          { type: 'search', title: 'Queens Events', time: '1 day ago' }
        ]);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="dashboard-page">
      <div className="page-container">
        {/* Dashboard Header */}
        <motion.div 
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="dashboard-title">My Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back! Here's what's happening</p>
          </div>
          <button className="notifications-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="stat-icon" style={{ background: '#4ECDC4' }}>
              <Bookmark size={24} />
            </div>
            <div className="stat-content">
              <h3>Saved Articles</h3>
              <p className="stat-number">24</p>
            </div>
          </motion.div>

          <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="stat-icon" style={{ background: '#FF6B6B' }}>
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>Following Topics</h3>
              <p className="stat-number">8</p>
            </div>
          </motion.div>

          <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="stat-icon" style={{ background: '#95E1D3' }}>
              <MapPin size={24} />
            </div>
            <div className="stat-content">
              <h3>Favorite Boroughs</h3>
              <p className="stat-number">Brooklyn, Queens</p>
            </div>
          </motion.div>

          <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="stat-icon" style={{ background: '#FFD93D' }}>
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <h3>Upcoming Events</h3>
              <p className="stat-number">5</p>
            </div>
          </motion.div>
        </div>

        {/* Content Sections */}
        <div className="dashboard-content">
          {/* Saved Content */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Saved Content</h2>
              <a href="/saved" className="view-all-link">View All →</a>
            </div>
            {loading ? (
              <div className="feed-loading">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="content-grid">
                {savedContent.map((item) => (
                  <NewsCard 
                    key={item.id} 
                    content={item}
                    onVideoClick={handleVideoClick}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Recent Activity */}
          <section className="dashboard-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <motion.div 
                  key={index}
                  className="activity-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="activity-icon">
                    {activity.type === 'bookmark' && <Bookmark size={16} />}
                    {activity.type === 'view' && <TrendingUp size={16} />}
                    {activity.type === 'search' && <MapPin size={16} />}
                  </div>
                  <div className="activity-content">
                    <p className="activity-title">{activity.title}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
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

export default DashboardPage;
