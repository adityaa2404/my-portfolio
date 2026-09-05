import dbConnect from '@/lib/mongodb';
import StatsCache from '@/lib/models/StatsCache';

export async function POST() {
  try {
    await dbConnect();
    const result = await StatsCache.findOneAndUpdate(
      { key: 'visits' },
      { $inc: { 'data.count': 1 }, $set: { fetchedAt: new Date() } },
      { upsert: true, returnDocument: 'after' }
    );
    return Response.json({ count: result.data.count });
  } catch {
    return Response.json({ count: 0 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const result = await StatsCache.findOne({ key: 'visits' });
    return Response.json({ count: result?.data?.count || 0 });
  } catch {
    return Response.json({ count: 0 });
  }
}
