import { Event } from '../models/event.model.js';
import { publisher } from '../config/redis.js';
import { ApiError, HTTP } from '@eventflow/shared';

const CHANNELS = {
  EVENT_CREATED: 'event:created',
  EVENT_UPDATED: 'event:updated',
};

export const createEvent = async (req, res) => {
  const { title, startsAt } = req.body || {};
  if (!title || !startsAt)
    throw new ApiError(HTTP.BAD_REQUEST, 'title & startsAt required');

  const creatorId = req.user.id;
  const created = await Event.create({ title, startsAt, creatorId });

  if (publisher.isOpen) {
    await publisher.publish(
      CHANNELS.EVENT_CREATED,
      JSON.stringify({
        id: String(created._id),
        title: created.title,
        startsAt: created.startsAt.toISOString(),
        creatorId,
      })
    );
  }
  res.status(HTTP.CREATED).json({ event: created });
};

export const updateEvent = async (req, res) => {
  const { title, startsAt } = req.body || {};
  const updated = await Event.findByIdAndUpdate(
    req.params.id,
    { ...(title && { title }), ...(startsAt && { startsAt }) },
    { new: true }
  );
  if (!updated) throw new ApiError(HTTP.NOT_FOUND, 'Event not found');

  if (publisher.isOpen) {
    await publisher.publish(
      CHANNELS.EVENT_UPDATED,
      JSON.stringify({
        id: String(updated._id),
        title: updated.title,
        startsAt: updated.startsAt?.toISOString(),
      })
    );
  }
  res.json({ event: updated });
};
