import mongoose from 'mongoose';

const StatsCacheSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, required: true }, // 'github' | 'leetcode' | 'ghHeatmap' | 'lcHeatmap' | 'lcCalendar'
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    fetchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.StatsCache ||
  mongoose.model('StatsCache', StatsCacheSchema);
