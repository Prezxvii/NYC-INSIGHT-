// src/components/NewsCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../styles/NewsCard.css';

const cardVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const NewsCard = ({ content, onVideoClick }) => {
  const { title, summary, source, mediaUrl, link, type } = content;
  const isVideo = source.toLowerCase() === 'youtube' || source.toLowerCase() === 'tiktok';

  const handleClick = (e) => {
    if (isVideo && onVideoClick) {
      e.preventDefault();
      onVideoClick(content);
    } else {
      // For articles, open in new tab
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      className="news-card"
      variants={cardVariants}
      initial="initial"
      whileInView="animate" 
      viewport={{ once: true, amount: 0.2 }}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-media">
        <img src={mediaUrl} alt={title} className="card-image" />
        {isVideo && (
          <div className="video-icon" title={`View on ${source}`}>
            <span className="icon-play"></span>
          </div>
        )}
      </div>

      <div className="card-content">
        <div className="card-source-tag">{source}</div>
        <h3 className="card-title">{title}</h3>
        <p className="card-summary">{summary}</p>
      </div>
    </motion.div>
  );
};

export default NewsCard;

