export default function RightSidebar({ trending, interestBlocks }) {
  return (
    <aside className="right-rail">
      <section className="panel">
        <h3>🔥 Trending in Tech</h3>
        {trending.length === 0 && <div className="skeleton" />}
        {trending.map((story) => (
          <a key={story.objectID} href={story.url} target="_blank" rel="noreferrer" className="trend-link">
            {story.title}
          </a>
        ))}
      </section>
      <section className="panel">
        <h3>❤️ My Interests</h3>
        {interestBlocks.map((item) => (
          <article key={item.name} className="interest">
            <strong>{item.name}</strong>
            <p>{item.headline}</p>
          </article>
        ))}
      </section>
    </aside>
  );
}
