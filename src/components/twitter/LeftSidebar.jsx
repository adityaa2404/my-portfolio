export default function LeftSidebar({ navItems, path, onNavClick }) {
  return (
    <aside className="left-rail">
      <div className="brand">𝕏</div>
      <nav>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = path === item.path;
          return (
            <button key={item.label} className={`nav-item ${active ? 'active' : ''}`} onClick={() => onNavClick(item)}>
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <button className="post-btn">Post</button>
      <div className="identity">
        <strong>Aditya Potdar</strong>
        <span>@aaditya2404</span>
      </div>
    </aside>
  );
}
