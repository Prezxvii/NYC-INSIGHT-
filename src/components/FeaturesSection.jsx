// ============================================
// FeaturesSection.jsx
// ============================================
// src/components/FeaturesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../styles/FeaturesSection.css';

// Import your GIF icons from assets
import realtimeIcon from '../assets/icons/realtime.gif';
import diverseIcon from '../assets/icons/diverse.gif';
import localIcon from '../assets/icons/local.gif';

const featuresData = [
  {
    icon: realtimeIcon,
    alt: 'Real-Time Icon',
    title: 'Real-Time Insights',
    description: 'Get breaking news, live event alerts, and video feeds instantly. We aggregate the city for you, as it happens.',
  },
  {
    icon: diverseIcon,
    alt: 'Content Types Icon',
    title: 'All Content Types',
    description: 'From deep-dive articles and government alerts to trending YouTube videos and local event announcements—its all here.',
  },
  {
    icon: localIcon,
    alt: 'Local Focus Icon',
    title: 'Hyper-Local Focus',
    description: 'Filter content by Borough (Brooklyn, Queens, etc.) or Category to drill down to the stories that matter most to your neighborhood.',
  },
];

const cardVariants = {
  initial: { y: 30, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const FeaturesSection = () => {
  return (
    <section className="features-section-container page-container">
      <h2 className="features-headline">
        What Makes NYC Insight Different?
      </h2>
      <p className="features-subtext">
        Your single source for the city that never sleeps. We cut through the noise to bring you the stories, events, and videos you care about most.
      </p>
      
      <motion.div 
        className="features-grid"
        initial="initial"
        whileInView="animate" 
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {featuresData.map((feature, index) => (
          <motion.div 
            key={index} 
            className="feature-card"
            variants={cardVariants}
          >
            <div className="feature-icon">
              <img 
                src={feature.icon} 
                alt={feature.alt}
                className="feature-icon-image"
              />
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;