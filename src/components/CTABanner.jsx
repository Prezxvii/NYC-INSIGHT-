import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/CTABanner.css';
import CTAButton from './CTAButton'; // Reusing the primary button component

const ctaVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { 
        y: 0, 
        opacity: 1, 
        transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2
        }
    }
};

const CTABanner = () => {
    const navigate = useNavigate();

    return (
        <motion.div 
            className="cta-banner"
            variants={ctaVariants}
            initial="initial"
            whileInView="animate" // Animate when it scrolls into view
            viewport={{ once: true, amount: 0.4 }} // Trigger when 40% is visible
        >
            <h3 className="cta-headline">
                Don't Miss Another NYC Moment!
            </h3>
            
            <p className="cta-subtext">
                Join thousands of New Yorkers getting real-time insights from all five boroughs.
            </p>
            
            <div className="cta-button-wrapper">
                <CTAButton 
                    label="Sign Up Now" 
                    variant="primary" 
                    onClick={() => navigate('/signup')} 
                />
            </div>
        </motion.div>
    );
};

export default CTABanner;
