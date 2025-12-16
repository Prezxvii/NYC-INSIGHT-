// src/services/contentService.js

// Base URL for your backend API
const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://nyc-insight.onrender.com';

/**
 * Fetch news articles from backend
 */
export const fetchNewsArticles = async (query = 'New York', pageSize = 10) => {
  try {
    console.log('Fetching news articles for:', query);
    
    const response = await fetch(
      `${BASE_URL}/api/news?q=${encodeURIComponent(query)}&pageSize=${pageSize}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`News API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('News API response:', data);

    if (data.status === 'error') {
      console.error('News API Error:', data.message);
      return [];
    }

    if (!data.articles || data.articles.length === 0) {
      console.warn('No articles found');
      return [];
    }

    return data.articles.map(article => ({
      id: article.url || `article-${Date.now()}-${Math.random()}`,
      title: article.title || 'Untitled Article',
      summary: article.description || 'No description available',
      source: article.source?.name || 'Unknown Source',
      mediaUrl: article.urlToImage || 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600',
      link: article.url || '#',
      type: 'article',
      publishedAt: article.publishedAt || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return [];
  }
};

/**
 * Fetch YouTube videos from backend
 */
export const fetchYouTubeVideos = async (query = 'New York City', maxResults = 10) => {
  try {
    console.log('Fetching YouTube videos for:', query);
    
    const response = await fetch(
      `${BASE_URL}/api/youtube?q=${encodeURIComponent(query)}&maxResults=${maxResults}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`YouTube API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('YouTube API response:', data);

    if (data.error) {
      console.error('YouTube API Error:', data.error.message);
      return [];
    }

    if (!data.items || data.items.length === 0) {
      console.warn('No videos found');
      return [];
    }

    return data.items.map(video => ({
      id: video.id?.videoId || `video-${Date.now()}-${Math.random()}`,
      title: video.snippet?.title || 'Untitled Video',
      summary: (video.snippet?.description || 'No description available').substring(0, 150) + '...',
      source: 'YouTube',
      mediaUrl: video.snippet?.thumbnails?.high?.url || 
                video.snippet?.thumbnails?.medium?.url || 
                video.snippet?.thumbnails?.default?.url ||
                'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600',
      link: `https://www.youtube.com/watch?v=${video.id?.videoId}`,
      type: 'video',
      publishedAt: video.snippet?.publishedAt || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};

/**
 * Fetch all content combined (News + YouTube)
 */
export const fetchAllContent = async (filters = {}) => {
  const { query = 'New York', includeVideos = true, includeArticles = true } = filters;
  
  console.log('Fetching all content with filters:', filters);
  
  const promises = [];
  
  if (includeArticles) {
    promises.push(fetchNewsArticles(query));
  }
  
  if (includeVideos) {
    promises.push(fetchYouTubeVideos(query));
  }

  try {
    const results = await Promise.all(promises);
    const allContent = results.flat().filter(item => item !== null);
    
    console.log(`Total content fetched: ${allContent.length} items`);
    
    // Sort by published date (newest first)
    const sortedContent = allContent.sort((a, b) => 
      new Date(b.publishedAt) - new Date(a.publishedAt)
    );
    
    return sortedContent;
  } catch (error) {
    console.error('Error fetching all content:', error);
    return [];
  }
};

// Test function to check if backend is reachable
export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/news?q=test&pageSize=1`);
    if (response.ok) {
      console.log(' Backend connection successful');
      return true;
    } else {
      console.error('  Backend responded with error:', response.status);
      return false;
    }
  } catch (error) {
    console.error(' Cannot reach backend:', error);
    return false;
  }
};
