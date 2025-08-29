FROM node:20-alpine
WORKDIR /app/services/event-management-service

COPY services/event-management-service/package*.json ./
COPY packages/shared/package*.json /app/packages/shared/
COPY packages/shared/src /app/packages/shared/src

RUN npm install

COPY services/event-management-service/ ./

ENV CHOKIDAR_USEPOLLING=true
EXPOSE 4001
CMD ["npm", "run", "dev"]
