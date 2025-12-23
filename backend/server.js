// server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// CORS configuration - Allow your Vercel frontend
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://nyc-insight-wxrh.vercel.app',
    'https://nyc-insight.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "NYC Insight Backend API is running",
    timestamp: new Date().toISOString(),
    endpoints: [
      "/api/health",
      "/api/news",
      "/api/youtube"
    ]
  });
});

// Detailed health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "healthy",
    newsApiKey: !!process.env.NEWS_API_KEY,
    youtubeApiKey: !!process.env.YOUTUBE_API_KEY,
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// --- News API Route ---
app.get("/api/news", async (req, res) => {
  const query = req.query.q || "New York";
  const pageSize = Math.min(parseInt(req.query.pageSize) || 10, 100); // Max 100

  console.log(`📰 Fetching news for: "${query}" (pageSize: ${pageSize})`);

  if (!process.env.NEWS_API_KEY) {
    console.error(" NEWS_API_KEY is not set");
    return res.status(500).json({ 
      status: "error",
      message: "News API key not configured",
      articles: []
    });
  }

  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&language=en&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`NewsAPI HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'error') {
      console.error(' News API Error:', data.message);
      return res.status(400).json({ 
        status: "error",
        message: data.message,
        code: data.code,
        articles: []
      });
    }

    const articleCount = data.articles?.length || 0;
    console.log(` Successfully fetched ${articleCount} news articles`);
    
    res.json({
      status: "ok",
      totalResults: data.totalResults,
      articles: data.articles || []
    });

  } catch (error) {
    console.error(" News API Error:", error.message);
    res.status(500).json({ 
      status: "error",
      message: "Failed to fetch news",
      error: error.message,
      articles: []
    });
  }
});

// --- YouTube API Route ---
app.get("/api/youtube", async (req, res) => {
  const query = req.query.q || "New York City";
  const maxResults = Math.min(parseInt(req.query.maxResults) || 10, 50); // Max 50

  console.log(`📺 Fetching YouTube videos for: "${query}" (maxResults: ${maxResults})`);

  if (!process.env.YOUTUBE_API_KEY) {
    console.error(" YOUTUBE_API_KEY is not set");
    return res.status(500).json({ 
      error: { message: "YouTube API key not configured" },
      items: []
    });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=video&maxResults=${maxResults}&order=date&key=${process.env.YOUTUBE_API_KEY}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`YouTube API HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      console.error(' YouTube API Error:', data.error.message);
      return res.status(400).json({ 
        error: { 
          message: data.error.message,
          code: data.error.code 
        },
        items: []
      });
    }

    const videoCount = data.items?.length || 0;
    console.log(`Successfully fetched ${videoCount} YouTube videos`);
    
    res.json({
      pageInfo: data.pageInfo,
      items: data.items || []
    });

  } catch (error) {
    console.error(" YouTube API Error:", error.message);
    res.status(500).json({ 
      error: { message: "Failed to fetch YouTube data" },
      items: []
    });
  }
});

// 404 handler
app.use((req, res) => {
  console.log(` 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ 
    error: "Endpoint not found",
    path: req.path,
    availableEndpoints: [
      "/",
      "/api/health",
      "/api/news?q=query&pageSize=10",
      "/api/youtube?q=query&maxResults=10"
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(" Unhandled error:", err.stack);
  res.status(500).json({ 
    error: "Internal server error",
    message: err.message 
  });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║   NYC Insight Backend Server                             ║
╠════════════════════════════════════════════════════════════╣
║  Port:              ${PORT}                                  ║
║  Health Check:      http://localhost:${PORT}/api/health     ║
║  News API Key:      ${process.env.NEWS_API_KEY ? ' Configured' : ' Missing'}            ║
║  YouTube API Key:   ${process.env.YOUTUBE_API_KEY ? ' Configured' : ' Missing'}            ║
║  Environment:       ${process.env.NODE_ENV || 'development'}               ║
╚════════════════════════════════════════════════════════════╝
  `);
  
  console.log("\n Available Endpoints:");
  console.log("   GET  /                    - API Info");
  console.log("   GET  /api/health          - Health Check");
  console.log("   GET  /api/news            - Fetch News Articles");
  console.log("   GET  /api/youtube         - Fetch YouTube Videos");
  console.log("\n Server is ready to accept requests!\n");
});
