import { getIO } from '../config/socket.js';

export function notifyUsers(userIds = [], eventName, payload) {
  const io = getIO();
  if (!io) return;
  for (const uid of userIds) {
    io.to(`user:${uid}`).emit(eventName, payload);
  }
}
