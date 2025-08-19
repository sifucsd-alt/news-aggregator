// /api/news.js

export default async function handler(req, res) {
  const mainKey = '5aa468a72a02b77b13e9857608cacf78'; // primary key
  const fallbackKey = 'b442bd182d95487fbe23325e606ef590'; // fail-safe key

  async function fetchFromKey(key) {
    const url = `https://newsapi.org/v2/top-headlines?category=general&apiKey=${key}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  try {
    let data = await fetchFromKey(mainKey);

    // fallback if no articles
    if (!data.articles || data.articles.length === 0) {
      data = await fetchFromKey(fallbackKey);
    }

    if (!data.articles || data.articles.length === 0) {
      return res.status(200).json({ articles: [] });
    }

    res.status(200).json({ articles: data.articles });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching news' });
  }
}
