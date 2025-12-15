// src/components/CTAButton.jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../styles/CTAButton.css'; // <-- Uses standard CSS import

/**
 * @component
 * @description A reusable, glossy, pill-style Call-to-Action button with a subtle bounce on tap/click.
 * @param {string} label - The text displayed on the button.
 * @param {string} variant - 'primary' (solid navy) or 'outline' (transparent/glossy).
 * @param {function} onClick - The function to call when the button is clicked.
 * @param {object} props - Additional props passed to the motion button element.
 */
const CTAButton = ({ label, variant = 'primary', onClick, ...props }) => {
  return (
    <motion.button
      className={`cta-button ${variant === 'outline' ? 'cta-outline' : 'cta-primary'}`}
      onClick={onClick}
      // Framer Motion Micro-interaction (Tap Bounce)
      whileTap={{ scale: 0.95 }}
      // Subtle hover lift
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      {label}
    </motion.button>
  );
};

export default CTAButton;