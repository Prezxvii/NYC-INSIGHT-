// src/components/VideoModal.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/VideoModal.css';

const VideoModal = ({ video, onClose }) => {
  const [tiktokEmbedReady, setTiktokEmbedReady] = useState(false);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Handle Escape key to close modal
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);

    // Load TikTok embed script if needed
    if (video.source === 'TikTok' && !window.tiktokEmbed) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      script.onload = () => {
        window.tiktokEmbed = true;
        setTiktokEmbedReady(true);
      };
      document.body.appendChild(script);
    } else if (video.source === 'TikTok' && window.tiktokEmbed) {
      setTiktokEmbedReady(true);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, video.source]);

  if (!video) return null;

  const getYouTubeEmbedUrl = () => {
    const videoId = video.id || video.link.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  const getTikTokVideoId = () => {
    // Extract video ID from TikTok link
    // Format: https://www.tiktok.com/@username/video/1234567890
    const match = video.link.match(/video\/(\d+)/);
    return match ? match[1] : null;
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="video-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="video-modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-button" onClick={onClose}>
            ✕
          </button>

          <div className="modal-video-container">
            {video.source === 'YouTube' && (
              <iframe
                src={getYouTubeEmbedUrl()}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            
            {video.source === 'TikTok' && (
              <div className="tiktok-embed-container">
                {getTikTokVideoId() ? (
                  <blockquote 
                    className="tiktok-embed" 
                    cite={video.link}
                    data-video-id={getTikTokVideoId()}
                    style={{ maxWidth: '605px', minWidth: '325px' }}
                  >
                    <section>
                      <a 
                        target="_blank" 
                        rel="noopener noreferrer"
                        href={video.link}
                      >
                        View on TikTok
                      </a>
                    </section>
                  </blockquote>
                ) : (
                  <div className="tiktok-fallback">
                    <p>Unable to embed this TikTok video</p>
                    <a 
                      href={video.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="external-link-button"
                    >
                      Watch on TikTok →
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="modal-video-info">
            <h3>{video.title}</h3>
            <p className="modal-source">{video.source}</p>
            <p className="modal-description">{video.summary}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoModal;

