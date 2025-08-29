FROM node:20-alpine
WORKDIR /app/services/notification-service

COPY services/notification-service/package*.json ./
COPY packages/shared/package*.json /app/packages/shared/
COPY packages/shared/src /app/packages/shared/src

RUN npm install

COPY services/notification-service/ ./

ENV CHOKIDAR_USEPOLLING=true
EXPOSE 4002
CMD ["npm", "run", "dev"]
