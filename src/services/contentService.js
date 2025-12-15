// src/services/contentService.js

// Base URL for your backend API (set in .env)
const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://nyc-insight.onrender.com';

/**
 * Fetch news articles from backend
 */
export const fetchNewsArticles = async (query = 'New York', pageSize = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/news?q=${encodeURIComponent(query)}&pageSize=${pageSize}`
    );
    const data = await response.json();

    return data.articles?.map(article => ({
      id: article.url,
      title: article.title,
      summary: article.description || 'No description available',
      source: article.source.name,
      mediaUrl: article.urlToImage || 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600',
      link: article.url,
      type: 'article',
      publishedAt: article.publishedAt,
    })) || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

/**
 * Fetch YouTube videos from backend
 */
export const fetchYouTubeVideos = async (query = 'New York City', maxResults = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/youtube?q=${encodeURIComponent(query)}&maxResults=${maxResults}`
    );
    const data = await response.json();

    return data.items?.map(video => ({
      id: video.id.videoId,
      title: video.snippet.title,
      summary: video.snippet.description.substring(0, 150) + '...',
      source: 'YouTube',
      mediaUrl: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url,
      link: `https://www.youtube.com/watch?v=${video.id.videoId}`,
      type: 'video',
      publishedAt: video.snippet.publishedAt,
    })) || [];
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
  const promises = [];

  if (includeArticles) promises.push(fetchNewsArticles(query));
  if (includeVideos) promises.push(fetchYouTubeVideos(query));

  try {
    const results = await Promise.all(promises);
    return results.flat()
      .filter(item => item !== null)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  } catch (error) {
    console.error('Error fetching all content:', error);
    return [];
  }
};
