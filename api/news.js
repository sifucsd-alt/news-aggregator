// /api/news.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const apiKey = 'b442bd182d95487fbe23325e606ef590'; // Your main NewsAPI key
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'ok') {
      return res.status(500).json({ error: 'Error fetching news' });
    }

    // Send only articles to front-end
    res.status(200).json({ articles: data.articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
