'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [secret, setSecret] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [type, setType] = useState('admin');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [pinned, setPinned] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileRef = useRef(null);

  // Load posts after auth
  useEffect(() => {
    if (authed) fetchPosts();
  }, [authed]);

  async function fetchPosts() {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  }

  async function handleLogin(e) {
    e.preventDefault();
    // Verify by trying to fetch with secret
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
      body: JSON.stringify({ text: '__auth_check__', _dryRun: true }),
    });
    // We'll just check if it's not 401
    if (res.status !== 401) {
      setAuthed(true);
      sessionStorage.setItem('admin_secret', secret);
    } else {
      setMsg('Wrong password.');
    }
  }

  // Restore session
  useEffect(() => {
    const saved = sessionStorage.getItem('admin_secret');
    if (saved) {
      setSecret(saved);
      setAuthed(true);
    }
  }, []);

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'x-admin-secret': secret },
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImage(data.url);
        setMsg('Image uploaded!');
      } else {
        setMsg('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      setMsg('Upload error: ' + err.message);
    }
    setUploading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return setMsg('Post text is required.');
    setLoading(true);
    setMsg('');

    const body = {
      type,
      title,
      text,
      image,
      tag,
      pinned,
      createdAt: dateTime || new Date().toISOString(),
      source: 'admin',
    };

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secret,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Post created!');
        setTitle('');
        setText('');
        setTag('');
        setImage('');
        setDateTime('');
        setPinned(false);
        fetchPosts();
      } else {
        setMsg('Error: ' + (data.error || 'Failed'));
      }
    } catch (err) {
      setMsg('Error: ' + err.message);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this post?')) return;
    await fetch('/api/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': secret,
      },
      body: JSON.stringify({ id }),
    });
    fetchPosts();
  }

  async function handleSeed() {
    setLoading(true);
    const res = await fetch('/api/seed', {
      method: 'POST',
      headers: { 'x-admin-secret': secret },
    });
    const data = await res.json();
    setMsg(data.message || data.error);
    fetchPosts();
    setLoading(false);
  }

  // Login screen
  if (!authed) {
    return (
      <div style={styles.loginWrap}>
        <form onSubmit={handleLogin} style={styles.loginCard}>
          <h1 style={styles.loginTitle}>🔐 Admin</h1>
          <input
            type="password"
            placeholder="Enter admin secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            style={styles.input}
            autoFocus
          />
          <button type="submit" style={styles.btnPrimary}>
            Login
          </button>
          {msg && <p style={styles.msg}>{msg}</p>}
        </form>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div style={styles.wrap}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>📝 Admin Dashboard</h1>
        <div style={styles.headerActions}>
          <button onClick={handleSeed} style={styles.btnSecondary} disabled={loading}>
            🌱 Seed Posts
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem('admin_secret');
              setAuthed(false);
              setSecret('');
            }}
            style={styles.btnDanger}
          >
            Logout
          </button>
        </div>
      </header>

      {msg && <div style={styles.toast}>{msg}</div>}

      {/* Create Post Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.formTitle}>Create New Post</h2>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} style={styles.input}>
              <option value="admin">Admin Post</option>
              <option value="build">Build Log</option>
              <option value="thread">Thread</option>
              <option value="github">GitHub</option>
              <option value="leetcode">LeetCode</option>
              <option value="pinned">Pinned</option>
            </select>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Date & Time</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            placeholder="Post title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Text *</label>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            style={{ ...styles.input, resize: 'vertical' }}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Tags</label>
          <input
            type="text"
            placeholder="#tag1 #tag2"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Image upload */}
        <div style={styles.field}>
          <label style={styles.label}>Image</label>
          <div style={styles.imageRow}>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              style={styles.btnSecondary}
              disabled={uploading}
            >
              {uploading ? '⏳ Uploading...' : '📎 Upload Image'}
            </button>
            <span style={styles.orText}>or</span>
            <input
              type="text"
              placeholder="Paste image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={{ ...styles.input, flex: 1 }}
            />
          </div>
          {image && (
            <div style={styles.imagePreview}>
              <img src={image} alt="Preview" style={styles.previewImg} />
              <button
                type="button"
                onClick={() => setImage('')}
                style={styles.removeImg}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div style={styles.checkRow}>
          <label style={styles.checkLabel}>
            <input
              type="checkbox"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
            />
            Pin this post
          </label>
        </div>

        <button type="submit" style={styles.btnPrimary} disabled={loading}>
          {loading ? 'Posting...' : '🚀 Publish Post'}
        </button>
      </form>

      {/* Existing Posts */}
      <div style={styles.postsList}>
        <h2 style={styles.formTitle}>All Posts ({posts.length})</h2>
        {posts.map((p) => (
          <div key={p._id} style={styles.postCard}>
            <div style={styles.postTop}>
              <span style={styles.postType}>{p.type}</span>
              <span style={styles.postDate}>
                {new Date(p.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </span>
              {p.pinned && <span style={styles.pinnedBadge}>📌 Pinned</span>}
            </div>
            {p.title && <h4 style={styles.postTitle}>{p.title}</h4>}
            <p style={styles.postText}>{p.text}</p>
            {p.image && (
              <img src={p.image} alt="" style={styles.postImg} />
            )}
            {p.tag && <span style={styles.postTag}>{p.tag}</span>}
            <div style={styles.postActions}>
              <span style={styles.postStat}>💬 {p.replies}</span>
              <span style={styles.postStat}>🔄 {p.reposts}</span>
              <span style={styles.postStat}>❤️ {p.likes}</span>
              <span style={styles.postStat}>👁 {p.views}</span>
              <button onClick={() => handleDelete(p._id)} style={styles.deleteBtn}>
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  loginWrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0a',
  },
  loginCard: {
    background: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: 16,
    padding: 32,
    width: 360,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  loginTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 800,
    textAlign: 'center',
    margin: 0,
  },
  wrap: {
    maxWidth: 700,
    margin: '0 auto',
    padding: '24px 16px',
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#e7e9ea',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: '1px solid #2a2a2a',
  },
  headerTitle: { fontSize: 22, fontWeight: 800, margin: 0, color: '#fff' },
  headerActions: { display: 'flex', gap: 8 },
  form: {
    background: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 700,
    margin: '0 0 16px',
    color: '#fff',
  },
  row: { display: 'flex', gap: 12, marginBottom: 0 },
  field: { marginBottom: 14, flex: 1 },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#71767b',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    background: '#0a0a0a',
    border: '1px solid #2a2a2a',
    borderRadius: 10,
    color: '#e7e9ea',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
  },
  imageRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  orText: { color: '#71767b', fontSize: 13 },
  imagePreview: {
    marginTop: 10,
    position: 'relative',
    display: 'inline-block',
  },
  previewImg: {
    maxWidth: '100%',
    maxHeight: 200,
    borderRadius: 12,
    border: '1px solid #2a2a2a',
  },
  removeImg: {
    position: 'absolute',
    top: 8,
    right: 8,
    background: 'rgba(0,0,0,0.7)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: 28,
    height: 28,
    cursor: 'pointer',
    fontSize: 14,
  },
  checkRow: { marginBottom: 16 },
  checkLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    color: '#e7e9ea',
    cursor: 'pointer',
  },
  btnPrimary: {
    width: '100%',
    padding: '12px 0',
    background: '#1d9bf0',
    color: '#fff',
    border: 'none',
    borderRadius: 9999,
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
  },
  btnSecondary: {
    padding: '8px 16px',
    background: '#1a1a1a',
    color: '#1d9bf0',
    border: '1px solid #2a2a2a',
    borderRadius: 9999,
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  btnDanger: {
    padding: '8px 16px',
    background: '#1a1a1a',
    color: '#f4212e',
    border: '1px solid #2a2a2a',
    borderRadius: 9999,
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
  },
  toast: {
    padding: '10px 16px',
    background: '#1d3a5c',
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 16,
    color: '#1d9bf0',
    border: '1px solid #1d9bf033',
  },
  msg: { color: '#f4212e', fontSize: 14, margin: 0 },
  postsList: { marginTop: 8 },
  postCard: {
    background: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  postTop: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  postType: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    padding: '2px 8px',
    borderRadius: 9999,
    background: '#1d9bf022',
    color: '#1d9bf0',
  },
  postDate: { fontSize: 12, color: '#71767b' },
  pinnedBadge: {
    fontSize: 11,
    fontWeight: 700,
    color: '#ffa116',
  },
  postTitle: {
    fontSize: 15,
    fontWeight: 700,
    margin: '0 0 4px',
    color: '#fff',
  },
  postText: {
    fontSize: 14,
    color: '#e7e9ea',
    lineHeight: 1.5,
    margin: '0 0 8px',
    whiteSpace: 'pre-wrap',
  },
  postImg: {
    maxWidth: '100%',
    maxHeight: 180,
    borderRadius: 12,
    marginBottom: 8,
    border: '1px solid #2a2a2a',
  },
  postTag: {
    fontSize: 12,
    color: '#1d9bf0',
    marginBottom: 8,
    display: 'inline-block',
  },
  postActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginTop: 8,
    paddingTop: 8,
    borderTop: '1px solid #1a1a1a',
  },
  postStat: { fontSize: 12, color: '#71767b' },
  deleteBtn: {
    marginLeft: 'auto',
    padding: '4px 12px',
    background: 'transparent',
    border: '1px solid #f4212e33',
    color: '#f4212e',
    borderRadius: 9999,
    fontSize: 12,
    cursor: 'pointer',
  },
};
