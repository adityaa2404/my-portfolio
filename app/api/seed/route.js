import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/lib/models/Post';

const starterPosts = [
  {
    type: 'pinned',
    title: 'Pinned',
    text: "Hi, I'm Aditya Potdar. I build scalable web apps, AI-powered systems, and solve real-world problems through clean, efficient code.",
    tag: '#buildinpublic',
    createdAt: new Date('2026-02-20T10:30:00+05:30'),
    replies: 42,
    reposts: 18,
    likes: 256,
    views: '12.4K',
    pinned: true,
    source: 'static',
  },
  {
    type: 'build',
    title: 'Build Log',
    text: 'Shipped this Twitter-style portfolio with dark/light mode, Three.js tech orbit, AI chat assistant, and live GitHub + LeetCode stats. Every pixel intentional.',
    tag: '#frontend',
    createdAt: new Date('2026-02-24T15:45:00+05:30'),
    replies: 8,
    reposts: 12,
    likes: 89,
    views: '3.2K',
    source: 'static',
  },
  {
    type: 'thread',
    title: '🧵 Problem → Solution',
    text: "Problem: Static portfolios feel dead.\nSolution: A timeline-based portfolio with live stats, trending tech cards, and conversational AI — feels alive, current, and real.",
    tag: '#productthinking',
    createdAt: new Date('2026-02-22T09:15:00+05:30'),
    replies: 15,
    reposts: 24,
    likes: 178,
    views: '8.1K',
    source: 'static',
  },
  {
    type: 'github',
    title: 'GitHub Activity',
    text: 'Pushed 5 commits to portfolio repo. Improved UX performance with route-level rendering and lazy-loaded Three.js scenes.',
    image: '/github.webp',
    tag: '#github',
    createdAt: new Date('2026-02-25T14:30:00+05:30'),
    replies: 3,
    reposts: 5,
    likes: 34,
    views: '1.8K',
    source: 'static',
  },
  {
    type: 'build',
    title: 'LawBuddy AI',
    text: 'Built an AI legal assistant — OCR-based parsing with Google Document AI, clause interpretation with Vertex AI (Gemini), and Pinecone vector search. Top 44 accuracy at HackRx 6.0. 🚀',
    tag: '#AI #hackathon',
    createdAt: new Date('2026-01-15T11:00:00+05:30'),
    replies: 21,
    reposts: 30,
    likes: 312,
    views: '15.2K',
    source: 'static',
  },
  {
    type: 'build',
    title: 'Lister AI',
    text: 'Voice → categorized material list → Excel export. Whisper AI handles transcription, Gemini LLM categorizes, FastAPI + Pandas generates Excel. Zero manual effort.',
    tag: '#voiceAI #automation',
    createdAt: new Date('2025-12-20T16:20:00+05:30'),
    replies: 6,
    reposts: 9,
    likes: 67,
    views: '4.5K',
    source: 'static',
  },
];

export async function POST(req) {
  try {
    await dbConnect();

    // Only seed if empty — no auth needed for initial seed
    const count = await Post.countDocuments();
    if (count > 0) {
      return NextResponse.json({ message: `Already have ${count} posts, skipping seed.` });
    }

    const created = await Post.insertMany(starterPosts);
    return NextResponse.json({ message: `Seeded ${created.length} posts.` });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
