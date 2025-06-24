🧑‍⚕️ PhysioTrack – Physiotherapy Exercise Web App

**PhysioTrack** is a gesture-based physiotherapy platform designed to help patients perform and track their physiotherapy exercises from home. It allows physiotherapists to assign exercises, monitor patient progress, and collect session data via a real-time camera interface.

---

## 🚀 Features

- ✅ Physiotherapist and patient login  
- ✅ Assign specific exercises to patients  
- ✅ Patient dashboard with session history  
- ✅ Real-time pose detection using **MediaPipe**  
- ✅ Repetition count and performance scoring  
- ✅ Voice and text feedback  
- ✅ Admin dashboard to manage exercises and patients  

---

## 🛠️ Tech Stack

| Area            | Technologies Used                |
|-----------------|----------------------------------|
| Frontend        | React.js, Tailwind CSS, Bootstrap |
| Backend         | Node.js, Express.js              |
| Database        | MongoDB (with Mongoose)          |
| Pose Detection  | MediaPipe Pose                   |
| Authentication  | JWT (JSON Web Tokens)            |

---

## 🖥️ Setup Instructions

### ✅ Prerequisites

- Node.js and npm installed  
- MongoDB running locally or via MongoDB Atlas  
- VS Code or any preferred code editor  

---

### 1. Clone the Repository

```bash
git clone https://github.com/asthanit1205/CodeCatalysts_CIH_2.0.git
cd CodeCatalysts_CIH_2.0
2. Setup Backend
bash
Copy
Edit
cd physio-tracker-backend
npm install
Create a .env file inside physio-tracker-backend/ with the following content:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/physiodb
Run the backend server:

bash
Copy
Edit
node app.js
3. Setup Frontend
bash
Copy
Edit
cd ../physio-tracker-frontend
npm install
npm run dev
Visit the frontend in your browser:
👉 http://localhost:5173

👥 Team – CodeCatalysts
Name                  	Role
Astha Nitnaware	       Full-Stack Developer, MediaPipe Integration
Pranali Nikose	        Backend API Developer, MongoDB Integration
Iqra Shaikh           	Frontend Developer, Styling & Routing
Renuka Motghare	       Frontend Developer

📧 Contact:
Astha Nitnaware – asthanitnaware546@gmail.com
