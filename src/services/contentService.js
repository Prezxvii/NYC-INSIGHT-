// src/services/contentService.js

const API_KEYS = {
  news: '46c7224f350846e0b5932cb038f8e6e0',
  youtube: 'AIzaSyA9dX5bHvyUk8OGp2gKZGl9HuWIXwN6xno',
  rapidapi: '588ebdf86amsh6896d4018de52d4p1aa9c8jsn9596c34491d3'
};

// News API Integration (NewsAPI.org)
export const fetchNewsArticles = async (query = 'New York', pageSize = 10) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${API_KEYS.news}`
    );
    const data = await response.json();
    
    if (data.status === 'error') {
      console.error('News API Error:', data.message);
      return [];
    }
    
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

// YouTube API Integration
export const fetchYouTubeVideos = async (query = 'New York City', maxResults = 10) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=${maxResults}&order=date&key=${API_KEYS.youtube}`
    );
    const data = await response.json();
    
    if (data.error) {
      console.error('YouTube API Error:', data.error.message);
      return [];
    }
    
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

// TikTok Integration using RapidAPI
export const fetchTikTokContent = async (hashtag = 'newyork') => {
  try {
    const response = await fetch(
      `https://tiktok-scraper7.p.rapidapi.com/hashtag/posts?hashtag=${hashtag}&count=10`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEYS.rapidapi,
          'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com'
        }
      }
    );
    const data = await response.json();
    
    if (!data.data?.videos) {
      console.log('No TikTok videos found');
      return [];
    }
    
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

// Combined Content Fetch - Mix all sources
export const fetchAllContent = async (filters = {}) => {
  const { query = 'New York', includeVideos = true, includeArticles = true } = filters;
  
  const promises = [];
  
  if (includeArticles) {
    promises.push(fetchNewsArticles(query));
  }
  
  if (includeVideos) {
    promises.push(fetchYouTubeVideos(query));
    promises.push(fetchTikTokContent(query.toLowerCase().replace(/\s+/g, '')));
  }
  
  try {
    const results = await Promise.all(promises);
    const allContent = results.flat().filter(item => item !== null);
    
    // Sort by published date (newest first)
    return allContent.sort((a, b) => 
      new Date(b.publishedAt) - new Date(a.publishedAt)
    );
  } catch (error) {
    console.error('Error fetching all content:', error);
    return [];
  }
};