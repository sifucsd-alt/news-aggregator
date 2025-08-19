// /api/news.js

export default async function handler(req, res) {
  const apiKey = '5aa468a72a02b77b13e9857608cacf78'; // Your second API key
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'ok') {
      return res.status(500).json({ error: 'Error fetching news' });
    }

    res.status(200).json({ articles: data.articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
