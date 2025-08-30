import { Server } from 'socket.io';
import { env } from './env.js';
import { verifyToken } from '../utils/jwt.js';

let io;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: env.SOCKET_CORS_ORIGIN },
  });

  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token || socket.handshake.query?.token;
      if (!token) return next(new Error('Unauthorized'));
      const payload = verifyToken(token);
      socket.data.userId = payload.id;
      socket.join(`user:${payload.id}`);
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    console.log('socket connected:', socket.data.userId);
    socket.on('disconnect', () =>
      console.log('socket disconnected:', socket.data.userId)
    );
  });

  return io;
}

export function getIO() {
  return io;
}
