# eventflow-microservices 🚀

EventFlow is a platform that combines event management and real-time notifications using a microservices architecture. The project consists of two main loosely coupled services that communicate using an event-driven approach.

## ✨ Key Features

- **Event-Driven Architecture:** Asynchronous inter-service communication via the Redis Pub/Sub model.
- **Role-Based Access Control (RBAC):** Manages user access based on permission levels (e.g., Admin, Event Creator).
- **Real-Time Email Notifications:** Users receive instant email notifications when events they're subscribed to are updated.
- **Multi-Database System:** Each service uses a database suited for its specific purpose (MongoDB and MySQL).
- **Monorepo Structure:** All services and shared components are managed in a single repository, which enhances code consistency.
- **Docker Support:** The entire project environment can be easily set up and run using Docker.

## 📁 Project Structure

The project has a monorepo structure containing all services and shared packages.

- **`services/`**: Contains the main services of the application.
- **`packages/shared/`**: Houses common modules (e.g., error handling, rate limiting, roles) shared by multiple services, preventing code duplication.

## 🚀 Setup and Running

The project's dependencies can be easily set up using Docker.

1. Clone the repository:
   ```bash
   git clone https://github.com/cemlytic/eventflow-microservices.git
   cd eventflow-microservices
   ```

2. Configure the `.env` files. Add the necessary environment variables.

3. Start the Docker environment
    ```bash
    docker compose up -d
    ```

4. Start the services
    ```bash
    npm install
    npm run dev
    ```