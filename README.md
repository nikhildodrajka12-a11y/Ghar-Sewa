# Ghar-Sewa
Ghar Sewa is a full-stack MERN local service booking platform where users can book services such as plumbers, electricians, cleaners, mechanics, and more. It has customer booking system, partner dashboard, admin panel, real time booking updates, Razorpay payments, email notifications and mobile style UI.

# 🛠️ Ghar Sewa - Local Service Booking Platform
Ghar Sewa is a robust, full-stack web application designed to bridge the gap between local service providers (plumbers, electricians, cleaners, mechanics, carpenters) and users in need of on-demand home services. 
Built using the **MERN Stack**, the platform features a real-time interactive interface, comprehensive admin management, and a highly responsive, mobile-first UI design.

---


# 📸 Screenshots
## Home Page
![Home](./screenshots/17.png)
## Admin Dashboard
![Dashboard](./screenshots/12.png)
## Booking Page
![Booking](./screenshots/21.png)


## ✨ Features

### 👤 User Authentication
* Secure registration and login for both customers and service partners.
* JWT-based session management and password hashing using `bcryptjs`.

### 🛠️ Partner Registration & Verification
* Dedicated onboarding workflow for service providers.
* **Admin Approval Stage:** Partner profiles are verified and approved by the administrator before being active in the marketplace.

### 📅 Service Booking
* Seamless booking system matching users with nearby available service professionals.
* Status tracking for scheduled, ongoing, and completed tasks.

### 💬 Real-Time Chat System
* In-app communication channel between users and service partners powered by `Socket.io`.

### 📊 Admin Control Center
* **Admin Dashboard:** Centralized panel to manage user profiles, verify partner applications, and monitor bookings.
* **Admin Analytics:** Visual insights and tracking of platform growth, popular service categories, and active bookings.

### 📱 Premium UI/UX Design
* Clean, responsive layouts optimized for mobile and desktop screens.
* Modern styling trends featuring dynamic **Offer Sliders & Video placeholders** for an interactive user experience.

---

## ⚡ Tech Stack

**Frontend:**
* React.js (Component-based UI Architecture)
* React Router DOM (Declarative Routing)
* Axios (Promise-based HTTP Client)
* Font Awesome & React Icons (Modern UI iconography)
* CSS3 & Tailwind CSS (Responsive Design Layouts)

**Backend:**
* Node.js (Runtime Environment)
* Express.js (Backend Web Framework)
* MongoDB & Mongoose (NoSQL Database & Object Data Modeling)
* Socket.io (WebSockets for real-time chat)

---

## 📂 Project Structure

```text
Ghar Sewa/
│
├── frontend/
│   ├── public/
│   └── src/            # React components, pages, and assets
│
└── backend/
    ├── config/         # Database and third-party configurations
    ├── controllers/    # Request handlers & business logic
    ├── models/         # Mongoose schemas (User, Partner, Booking, Chat)
    ├── routes/         # Express API endpoints
    └── server.js       # Entry point


⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/nikhildodrajka12-a11y/Ghar-Sewa.git

2️⃣ Frontend Setup
cd frontend
npm install
npm start
Frontend runs on:

http://localhost:3000
3️⃣ Backend Setup
Open another terminal:
cd backend
npm install
npm start
Backend runs on:
http://localhost:5000

🗄️ MongoDB Setup
Create a .env file inside backend folder:
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret_key

📦 Required Packages
Frontend Packages
Run inside frontend folder:
npm install axios react-router-dom socket.io-client
npm install @fortawesome/react-fontawesome
npm install @fortawesome/free-solid-svg-icons
npm install react-icons

Backend Packages
Run inside backend folder:
npm install express mongoose cors dotenv
npm install bcryptjs jsonwebtoken
npm install nodemailer
npm install socket.io
npm install multer


▶️ Run Project
Frontend
cd frontend
npm start

Backend
cd backend
npm start
📧 Nodemailer Setup

Inside backend .env file:
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
🔐 Environment Variables

Create .env inside backend folder:
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password

Developer
Nikhil Dodrajka
🎓 Computer Engineering Student
🏫 Bajaj Institute of Technology, Wardha
