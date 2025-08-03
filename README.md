# 🎓 SmartPedagogy – AI-Powered Assignment Evaluation Platform

**SmartPedagogy** is an intelligent web-based platform that transforms the way educators assign, evaluate, and track student performance. It enables teachers to create assignments, students to submit their work, and leverages **AI** to generate detailed feedback and performance analytics. Designed with modern web technologies, SmartPedagogy supports role-based dashboards, OCR, and future-ready AI integrations.

---

## 🧰 Tech Stack

| Frontend                   | Backend                          | AI/Tools              |
|---------------------------|----------------------------------|------------------------|
| React.js, Tailwind CSS    | Node.js, Express.js              | Gemini API (AI Model)  |
| Redux Toolkit, Axios      | MongoDB (Mongoose), JWT          | Tesseract.js (OCR)     |
| React Router              | REST APIs, Role-Based Access     | File & PDF Parsing     |

---

## 🚀 Features

### 👨‍🏫 For Teachers
- Upload assignments (Text-based, PDF & Image support)
- View detailed AI-generated feedback and scores per student
- Analyze class performance trends and average scores
- Secure login and role-based access control

### 🧑‍🎓 For Students
- View and submit assignments via intuitive dashboard
- Receive AI-evaluated feedback and improvement suggestions
- Visualize performance across multiple submissions

### 🤖 AI-Powered Evaluation
- Extracts content from PDF/Image assignments using **OCR**
- Evaluates responses using **Gemini AI model**
- Generates structured feedback with scores and learning suggestions
- All results are stored and linked for performance tracking

---

## 🗂️ Project Structure

### 📁 Backend (`smartpedagogy-backend`)
```
smartpedagogy-backend/
├── config/             # MongoDB configuration
├── utils/             # Utility functions
├── models/             # Mongoose Schemas
├── middlewares/        # JWT authentication and role validation
├── routes/             # API routes (auth, assignment, feedback, etc.)
├── server.js           # Entry point of backend app
└── .env                # Environment variables
```

### 📁 Frontend (`SmartPedagogy`)
```
smartpedagogy-frontend/
├── src/
│   ├── components/     # Reusable UI Components
│   ├── pages/          # Dashboard pages (Student/Teacher)
│   ├── utils/          # API & Auth helpers
│   ├── App.js          # App Routes and Layout
│   └── index.js        # Main React Entry Point
```

---

## 🔐 Authentication & Roles

- **JWT-based auth system**
- Role-based UI rendering: Student and Teacher dashboards
- Editable user profile with image support
- Protected routes on frontend and backend

---

## 🛠️ Getting Started

### ✅ Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```
PORT=7777
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_api_key 
```

Start backend server:

```bash
npm run dev
```

---

### ✅ Frontend Setup

```bash
git clone https://github.com/prajeet-shah/smartpedagogy
cd Frontend
cd smartpedagogy
npm install
npm run dev
```

---

## 🔮 Future Roadmap

✅ **Planned Enhancements:**

- [ ] Assignment upload via **PDF/JPG**
- [ ] Student **chat system** and **search functionality**
- [ ] **Subject-specific fine-tuned AI models**
- [ ] Enhanced **OCR support for handwritten submissions**
- [ ] Assignments for specific **branches/sections**
- [ ] **Push notifications** for new assignments/feedback
- [ ] **Assignment versioning** and **re-submissions**
- [ ] **Live review sessions** (Meet/Zoom integration)
- [ ] **Gamified leaderboard system**
- [ ] **AI-powered doubt solver assistant**

---


## 🧑‍💻 About Me

Hi, I’m **[Prajeet Shah]**, a passionate full-stack developer focused on building impactful EdTech solutions. SmartPedagogy is a demonstration of my ability to:

- Architect scalable backend systems with Node & MongoDB
- Build responsive and modular UIs with React & Tailwind
- Integrate AI capabilities like OCR and evaluation models
- Maintain clean project structure and long-term scalability

---

