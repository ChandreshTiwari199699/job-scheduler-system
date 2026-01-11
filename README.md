# Job Scheduler & Automation System

## 📌 Overview
This project is a simplified **Job Scheduler & Automation Dashboard** built as part of the **Dotix Technologies Full Stack Developer Skill Test**.

The system allows users to:
- Create background jobs
- Run jobs asynchronously
- Track job status
- Trigger outbound webhooks when jobs complete

---

## 🧱 Architecture
- **Frontend**: Next.js + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MySQL (via Sequelize ORM)
- **Webhook**: webhook.site (outbound trigger)


---

## 🛠 Tech Stack

### Frontend
- Next.js (React)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- Axios (Webhook)

---

## 🗄 Database Schema

**Table: jobs**

| Column     | Type                                |
|-----------|-------------------------------------|
| id        | INT (Primary Key)                   |
| taskName  | VARCHAR                             |
| payload   | JSON                                |
| priority  | ENUM (Low, Medium, High)            |
| status    | ENUM (pending, running, completed)  |
| createdAt| TIMESTAMP                           |
| updatedAt| TIMESTAMP                           |

---

## 🔌 API Endpoints

### Create Job

- Payload includes: `jobId, taskName, priority, payload, completedAt`
- Request/response logged in console (or DB if implemented)

---

## Setup Instructions

### Backend
```bash
cd backend
npm install
node index.js

# Go to frontend folder
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev

# Frontend runs on http://localhost:3000
