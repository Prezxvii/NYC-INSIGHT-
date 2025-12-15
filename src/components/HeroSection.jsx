import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CTAButton from './CTAButton';
import heroVideo from '../assets/Hero-Section.mp4';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.section 
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <video 
        className="hero-video"
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-video-overlay"></div>

      <div className="hero-content">
        <motion.h1 className="hero-title" variants={itemVariants}>
          Welcome to <span className="city-accent">NYC</span>
          <br />
          The City That Never Sleeps
        </motion.h1>
        
        <motion.p className="hero-subtitle" variants={itemVariants}>
          Real-time stories, videos, alerts, and insights across all five boroughs — all in one place.
        </motion.p>
        
        <motion.div className="hero-actions" variants={itemVariants}>
          {/* Navigate to Live Feed page */}
          <CTAButton 
            label="Explore Now" 
            variant="primary"
            onClick={() => navigate('/feed')}
          />

          <CTAButton 
            label="View Latest" 
            variant="outline-white" 
            onClick={() => {
              const feedSection = document.querySelector('.content-feed-container');
              feedSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
