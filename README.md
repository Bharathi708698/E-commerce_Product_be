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
- **Sharp** - Remove Exif data's

---

**Middleware**
Mock Auth: A basic middleware that simulates JWT by checking a static token (J_Pencil) in headers.
Rate Limiting: Integrated with express-rate-limit to prevent brute force/spam.

##  How to Run

### 1. Install dependencies
```bash
npm install
```
### 2. Add .env 
Add the following Variables
```bash
i) PORT => Enter Your Port Number e.g. 5000
ii) MAX_IMAGES => Set Limitation to Upload Image e.g. 5
iii) API_MAX_LIMIT => Set the count Number of API Limitation with in the following time limit e.g. 15  
iv) API_MAX_LIMIT_TIME => Set How many API will hit per minutes e.g. 2 
```
### 3. To Run Server
```bash
npm start
```


