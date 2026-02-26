import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/lib/models/Post';

// GET /api/posts — fetch all posts (public)
export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ pinned: -1, createdAt: -1 }).lean();
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/posts — create a post (admin only)
export async function POST(req) {
  try {
    const secret = req.headers.get('x-admin-secret');
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    // Dry-run for auth validation (used by admin login)
    if (body._dryRun) {
      return NextResponse.json({ ok: true });
    }

    const post = await Post.create({
      type: body.type || 'admin',
      title: body.title || '',
      text: body.text,
      image: body.image || '',
      tag: body.tag || '',
      createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
      replies: body.replies || 0,
      reposts: body.reposts || 0,
      likes: body.likes || 0,
      views: body.views || '0',
      pinned: body.pinned || false,
      source: body.source || 'admin',
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/posts — delete a post by id (admin only)
export async function DELETE(req) {
  try {
    const secret = req.headers.get('x-admin-secret');
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await req.json();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
