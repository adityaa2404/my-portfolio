const FEEDS = {
  tech: 'https://feeds.feedburner.com/TechCrunch/',
  cricket: 'https://www.espncricinfo.com/rss/content/story/feeds/0.xml',
  smartphones: 'https://www.gsmarena.com/rss-news-reviews.php3',
  cars: 'https://www.autocarindia.com/RSS/rss.ashx',
  bikes: 'https://www.rushlane.com/feed',
};

/* Minimal RSS XML parser — extracts <item> title + link */
function parseRSS(xml) {
  const items = [];
  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = block.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/)?.[1] || '';
    const link = block.match(/<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/)?.[1] || '';
    const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
    if (title) items.push({ title: title.trim(), link: link.trim(), pubDate });
  }
  return items;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (category && FEEDS[category]) {
    // Fetch a single feed
    try {
      const res = await fetch(FEEDS[category], {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)' },
        next: { revalidate: 1800 }, // cache 30 min
      });
      const xml = await res.text();
      const items = parseRSS(xml).slice(0, 5);
      return Response.json({ status: 'ok', items });
    } catch (error) {
      return Response.json({ status: 'error', items: [], error: error.message });
    }
  }

  // Fetch all feeds in parallel
  const results = {};
  await Promise.all(
    Object.entries(FEEDS).map(async ([key, url]) => {
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)' },
          next: { revalidate: 1800 },
        });
        const xml = await res.text();
        results[key] = parseRSS(xml).slice(0, key === 'tech' ? 5 : 3);
      } catch {
        results[key] = [];
      }
    })
  );

  return Response.json({ status: 'ok', feeds: results });
}
