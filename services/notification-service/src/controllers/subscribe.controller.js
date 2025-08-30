import { Subscription } from '../models/subscription.model.js';
import { ApiError, HTTP } from '@eventflow/shared';

export const subscribe = async (req, res) => {
  const { eventId } = req.params;
  if (!eventId) throw new ApiError(HTTP.BAD_REQUEST, 'eventId required');

  const [sub, created] = await Subscription.findOrCreate({
    where: { userId: req.user.id, eventId },
    defaults: { userId: req.user.id, eventId },
  });

  res.status(created ? HTTP.CREATED : HTTP.OK).json({
    subscribed: true,
    created,
    subscription: { id: sub.id, userId: sub.userId, eventId: sub.eventId },
  });
};

export const unsubscribe = async (req, res) => {
  const { eventId } = req.params;
  if (!eventId) throw new ApiError(HTTP.BAD_REQUEST, 'eventId required');
  await Subscription.destroy({ where: { userId: req.user.id, eventId } });
  res.status(HTTP.NO_CONTENT).send();
};

export const listSubscriptions = async (req, res) => {
  const rows = await Subscription.findAll({
    where: { userId: req.user.id },
    order: [['id', 'DESC']],
  });
  res.json({ subscriptions: rows });
};
