import mongoose from 'mongoose';

const eventSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    startsAt: { type: Date, required: true },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model('Event', eventSchema);
