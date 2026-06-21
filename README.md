# Team Availability Tracker

A full-stack application that allows teams to track member availability in real time.

## Features

* View team members and their roles
* Toggle availability status (Available / Busy)
* Conditional rendering of status badges
* React frontend with state management
* Express backend API
* SQLite database persistence
* Availability changes remain saved after page refresh and server restart

## Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express
* SQLite

## Project Structure

team-availability-tracker/

├── src/

├── public/

├── backend/

│ ├── server.js

│ ├── database.js

│ └── team.db

├── package.json

├── README.md

└── .gitignore

## Installation

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/team-availability-tracker.git
cd team-availability-tracker
```

### Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

### Backend Setup

Open a second terminal:

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

## API Endpoints

### Get Team Members

```http
GET /api/team
```

### Update Availability

```http
PATCH /api/team/:id
```

Request Body:

```json
{
  "available": true
}
```

## Database

The application uses SQLite for persistence.

The database is automatically created and seeded with sample team members when the backend starts for the first time.

## Assignment Requirements Covered

* Display team members
* Availability toggle
* Conditional rendering
* Frontend-backend synchronization
* Database updates
* Visual status updates
* Persistent data storage

## Author

Built as part of a Team Availability Tracker coding assignment.
