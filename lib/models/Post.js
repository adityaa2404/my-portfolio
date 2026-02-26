import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['pinned', 'build', 'thread', 'github', 'leetcode', 'admin'],
      default: 'admin',
    },
    title: { type: String, default: '' },
    text: { type: String, required: true },
    image: { type: String, default: '' },
    tag: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    replies: { type: Number, default: 0 },
    reposts: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    views: { type: String, default: '0' },
    pinned: { type: Boolean, default: false },
    source: {
      type: String,
      enum: ['static', 'github', 'leetcode', 'admin'],
      default: 'admin',
    },
    // Unique ID for deduplication (e.g. github event id, leetcode "timestamp-slug")
    sourceId: { type: String, default: '', index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
