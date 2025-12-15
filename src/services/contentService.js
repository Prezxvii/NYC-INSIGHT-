// src/services/contentService.js

// Base URLs for your backend API
const BASE_URL = process.env.REACT_APP_BACKEND_URL || '';

export const fetchNewsArticles = async (query = 'New York', pageSize = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/api/news?q=${encodeURIComponent(query)}&pageSize=${pageSize}`);
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

export const fetchYouTubeVideos = async (query = 'New York City', maxResults = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/api/youtube?q=${encodeURIComponent(query)}&maxResults=${maxResults}`);
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

export const fetchTikTokContent = async (hashtag = 'newyork') => {
  try {
    const response = await fetch(`${BASE_URL}/api/tiktok?hashtag=${encodeURIComponent(hashtag)}`);
    const data = await response.json();

    if (!data.data?.videos) return [];

    return data.data.videos.slice(0, 10).map(video => ({
      id: video.video_id || video.id,
      title: video.title || video.desc || 'TikTok Video',
      summary: (video.desc || 'Watch this TikTok video').substring(0, 150),
      source: 'TikTok',
      mediaUrl: video.cover || video.origin_cover,
      link: video.play || `https://www.tiktok.com/@${video.author?.unique_id}/video/${video.video_id}`,
      type: 'video',
      publishedAt: video.create_time ? new Date(video.create_time * 1000).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching TikTok content:', error);
    return [];
  }
};

export const fetchAllContent = async (filters = {}) => {
  const { query = 'New York', includeVideos = true, includeArticles = true } = filters;
  const promises = [];

  if (includeArticles) promises.push(fetchNewsArticles(query));
  if (includeVideos) {
    promises.push(fetchYouTubeVideos(query));
    promises.push(fetchTikTokContent(query.toLowerCase().replace(/\s+/g, '')));
  }

  try {
    const results = await Promise.all(promises);
    return results.flat().filter(item => item !== null)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  } catch (error) {
    console.error('Error fetching all content:', error);
    return [];
  }
};
