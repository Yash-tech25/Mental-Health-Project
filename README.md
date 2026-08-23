# Manora — Mental Wellness Platform

Manora is a full-stack mental wellness web application designed to provide users with a private and interactive space to track their well-being, reflect through journaling, explore mental-health resources, and practice relaxation techniques.

The platform combines wellness tracking, authenticated personal data, interactive self-assessment tools, guided relaxation experiences, and AI-assisted features in a single application.


## Live Demo

**Frontend:** https://mental-health-project-mu.vercel.app/

The backend is deployed separately on Render and connected to MongoDB Atlas.


## Features

### Mood Tracking
- Record daily moods through an interactive mood tracker.
- Store mood history securely for each authenticated user.
- Visualize recent mood patterns and trends.

### Daily Journal
- Write and save private journal entries.
- Analyze journal content and generate contextual reflections.
- View previous entries through journal history.
- Personalize the writing experience with font, text color, and background options.

### Wellness Tracker
Track multiple aspects of daily wellness and maintain a history of personal well-being data.

### Relaxation Toolkit
Manora includes several interactive relaxation experiences:

- Guided breathing exercises
- Meditation sessions
- Ambient sounds including rain, ocean, and forest
- Sleep and relaxation sessions
- Grounding exercises
- Stress-relief activities
- Physical tension relaxation exercises

### Mental Health Self-Assessments
Interactive quizzes are available for topics including:

- Anxiety
- Depression
- OCD
- ADHD
- PTSD
- Social Anxiety

Quiz results provide users with an informative summary while clearly remaining separate from professional diagnosis.

### Mental Health Education
Explore structured informational content covering topics such as:

- Anxiety
- Depression
- OCD
- Panic Disorder
- Bipolar Disorder
- Schizophrenia
- PTSD
- Psychosis

### Invisible Backpack
An interactive experience designed to illustrate how emotional burdens and personal struggles may not always be visible to others.

### Support & Resources
The application also provides access to wellness resources, support groups, articles, blogs, initiatives, and other educational content.

---

## Tech Stack

### Frontend
- React.js
- Vite
- React Router
- JavaScript
- HTML5
- CSS3
- Recharts

### Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication

### Database
- MongoDB
- MongoDB Atlas

### APIs & Integrations
- Google Gemini API
- News API
- Web Speech API

### Deployment
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Cloud Database
- GitHub — Version Control

---

## Architecture

```text
                 ┌─────────────────────┐
                 │    React + Vite     │
                 │      Frontend       │
                 │      (Vercel)       │
                 └──────────┬──────────┘
                            │
                         HTTPS
                            │
                 ┌──────────▼──────────┐
                 │ Node.js + Express   │
                 │       REST API      │
                 │       (Render)      │
                 └──────────┬──────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
        MongoDB Atlas    Gemini API    News API
```

The frontend communicates with the Express backend through REST APIs. Protected functionality uses JWT-based authentication, while user-specific information such as moods, journal entries, and wellness records is persisted in MongoDB Atlas.

---

## Authentication Flow

1. A user creates an account or logs in.
2. The backend validates the credentials.
3. A JWT is issued after successful authentication.
4. Protected frontend routes require authentication.
5. Authenticated API requests include the token.
6. The backend verifies the token before accessing user-specific data.

This ensures that personal tracker and journal data is associated with the authenticated user.

---

## Project Structure

```text
Mental-Health-Project/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── images/
│   ├── pages/
│   ├── App.css
│   └── index.jsx
│
├── index.html
├── package.json
├── vercel.json
└── README.md
```

---

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/Yash-tech25/Mental-Health-Project.git
cd Mental-Health-Project
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend` directory.

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
NEWS_API_KEY=your_news_api_key
JWT_SECRET=your_jwt_secret
```

Never commit the `.env` file or real credentials to source control.

### 5. Start the backend

From the `backend` directory:

```bash
npm run dev
```

The local backend runs on:

```text
http://localhost:5000
```

### 6. Start the frontend

From the project root:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

---

## Production Deployment

The application uses separate frontend and backend deployments:

```text
Frontend  → Vercel
Backend   → Render
Database  → MongoDB Atlas
```

Production API requests from the Vercel frontend are sent to the deployed Render backend, which handles authentication, application logic, external API integrations, and MongoDB operations.

---

## Security

- Passwords are not stored as plain text.
- JWT authentication protects user-specific endpoints.
- Secrets and database credentials are stored using environment variables.
- `.env` files are excluded from Git version control.
- MongoDB access is authenticated using Atlas database credentials.
- Sensitive backend operations are not exposed directly to the frontend.

---

## Disclaimer

Manora is intended for wellness, self-reflection, and educational purposes. It is not a diagnostic tool and does not replace professional medical or mental-health advice.

---

## Future Improvements

- Mobile application
- Personalized wellness recommendations
- Machine-learning-based mood and wellness insights
- Long-term behavioral trend analysis
- Enhanced AI-assisted journaling
- Notification and reminder system
- Improved accessibility and personalization

---

## Author

**Shreyansh Mohapatra**

Computer Science Engineering  
VIT Bhopal University
