# 🛠️ Backend - E-Commerce Product Manager

This backend is a RESTful API for managing product data including image handling, built using **Node.js**, **Express**, **Sequelize**, and **SQLite**.

---

## 📦 Tech Stack

- **Node.js** + **Express** – server and routing
- **Sequelize ORM** – database abstraction
- **SQLite** – lightweight database for testing
- **express-validator** – input validation
- **express-rate-limit** – basic rate limiting
- **JWT Middleware (mock)** – simulated auth for API protection
- ****Sharp** - Remove Exif data's

---

##  How to Run

### 1. Install dependencies
### 2. Add .env 
add the following Variables
i) PORT => Enter Your Port Number e.g. 5000
ii) MAX_IMAGES => Set Limitation to Upload Image e.g. 5
iii) API_MAX_LIMIT => Set the count Number of API Limitation with in the following time limit e.g. 15  
iv) API_MAX_LIMIT_TIME => Set How many API will hit per minutes e.g. 2 
```bash
npm install
npm start


