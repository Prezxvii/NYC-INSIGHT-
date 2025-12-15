// src/components/FAQSection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/FAQSection.css';

/**
 * @component
 * @description A collapsible accordion component for displaying common questions and answers.
 */

// Dummy FAQ data
const faqData = [
    {
        question: "Where does NYC Insight get its data?",
        answer: "We aggregate data from verified public sources, including official NYC government APIs, local news organizations, reputable journalism feeds, and vetted public social media channels (like official YouTube accounts). We prioritize accuracy and source transparency.",
    },
    {
        question: "How is the content filtered by Borough and Category?",
        answer: "Every piece of content is tagged based on its primary geographical relevance (Manhattan, Queens, etc.) and thematic category (Transportation, Real Estate, Culture, etc.). You can use the search bar filters to refine the main content feed to only show stories relevant to your specific interests.",
    },
    {
        question: "How frequently is the 'Live Feed' updated?",
        answer: "Our system runs on a near real-time ingestion pipeline. Breaking news and emergency alerts are processed instantly, while standard content updates occur every few minutes to ensure you always have the latest information.",
    },
    {
        question: "Does NYC Insight offer a mobile application?",
        answer: "Yes, we offer a dedicated native application for both iOS and Android. Look for the 'Sign Up' button in the header or the 'Get the App' banner lower on the page to receive a download link.",
    },
];

// Reusable FAQ Item Sub-Component
const FAQItem = ({ faq, isOpen, toggleOpen }) => {
    return (
        <motion.div 
            className="faq-item"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <button className="faq-question" onClick={toggleOpen}>
                {faq.question}
                {/* Replaced emoji with a dedicated class placeholder for consistency */}
                <span className={`faq-icon ${isOpen ? 'open' : ''}`}>
                    +
                </span>
            </button>
            <div 
                className={`faq-answer-container ${isOpen ? '' : 'collapsed'}`}
                // Dynamic styling is required to allow the smooth transition
                style={isOpen ? { maxHeight: '300px' } : { maxHeight: '0px' }}
            >
                <p className="faq-answer">{faq.answer}</p>
            </div>
        </motion.div>
    );
};


const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-section-container">
            <div className="page-container">
                <div className="faq-section-header">
                    <h2>Got Questions? We Have Answers.</h2>
                    <p>Find quick information about our data sources, content types, and how to get the most out of NYC Insight.</p>
                </div>

                <div className="faq-list">
                    {faqData.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            isOpen={index === openIndex}
                            toggleOpen={() => toggleItem(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQSection;