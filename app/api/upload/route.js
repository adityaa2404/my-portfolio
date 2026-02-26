import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const secret = req.headers.get('x-admin-secret');
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename + add timestamp
    const ext = path.extname(file.name) || '.png';
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', safeName);

    await writeFile(uploadPath, buffer);

    return NextResponse.json({ url: `/uploads/${safeName}` });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
