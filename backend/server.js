import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- News API Route ---
app.get("/api/news", async (req, res) => {
  const query = req.query.q || "New York";
  const pageSize = req.query.pageSize || 10;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// --- YouTube API Route ---
app.get("/api/youtube", async (req, res) => {
  const query = req.query.q || "New York City";
  const maxResults = req.query.maxResults || 10;

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&maxResults=${maxResults}&order=date&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
});

// --- TikTok API Route via RapidAPI ---
app.get("/api/tiktok", async (req, res) => {
  const hashtag = req.query.hashtag || "newyork";

  try {
    const response = await fetch(
      `https://tiktok-scraper7.p.rapidapi.com/hashtag/posts?hashtag=${encodeURIComponent(
        hashtag
      )}&count=10`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "tiktok-scraper7.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();

    if (!data.data?.videos) {
      return res.json({ data: { videos: [] } });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch TikTok data" });
  }
});

// --- Start Server ---
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
