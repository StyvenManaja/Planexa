
# 🗓️ Planexa - Room Booking System

> **Planexa** is a Node.js backend application designed to manage room reservations with slot handling, conflict detection, user roles, secure authentication, and more.  
> This project is developed in a **Build In Public** spirit to grow as a freelance backend developer.

---

## 🚀 Main Features

✅ Secure JWT authentication (stored in cookies)  
✅ Role-based access control (user / admin)  
✅ Full CRUD for rooms  
✅ Configurable time slots and availability checks  
✅ Booking system with automatic conflict detection  
✅ Cancel bookings only if the date hasn't passed  
✅ Admin-only statistics access  
✅ Clean folder structure (`controllers`, `services`, `middlewares`, etc.)

---

## 🧱 Project Structure

```bash
src/
├── config/          # MongoDB and environment config
├── controllers/     # Handle requests & responses
├── middlewares/     # Auth, role checks, validation...
├── models/          # Mongoose schemas (User, Room, Booking...)
├── repositories/    # DB access layer
├── routes/          # REST endpoints
├── services/        # Business logic
├── utils/           # Helper functions
```

---

## 🧑‍💻 Tech Stack

- Node.js / Express.js  
- MongoDB / Mongoose  
- JWT (with refreshToken in httpOnly cookies)  
- Middleware-based validation  
- Git version control

---

## 📦 Local Installation

```bash
# Clone the repo
git clone https://github.com/your-github/planexa.git
cd planexa

# Install dependencies
npm install

# Create .env file (see .env.example)
cp .env.example .env

# Start in dev mode
npm run dev
```

---

## 🛡️ Security

- Protected routes with `authentication` and `authorization` middlewares
- Time slot conflicts handled server-side to prevent double bookings
- JWT stored in secure cookies (`httpOnly`, `secure` in production)

---

## 📊 Example API

```
GET /api/book/:roomId/availability?date=2025-07-10
🔒 Auth required
📄 Returns available time slots for a specific room on a given date.
```

```json
[
  "08h-09h",
  "10h-11h",
  "13h-14h"
]
```

---

## 📈 Roadmap (next steps)

- [ ] Admin dashboard (stats + export)
- [ ] Swagger / OpenAPI documentation
- [ ] Notification system (email or logs)
- [ ] Unit testing integration (Jest)
- [ ] Public deployment (Railway, Render, etc.)

---

## 👨🏽‍💻 Developer

**Styven Manaja**  
🎯 Backend Node.js Developer in training | On a path to freelancing  
🔗 [https://www.styven-manaja.digital](https://www.styven-manaja.digital)

---

## 💬 Build in Public

This project is being documented publicly on my socials (LinkedIn, X/Twitter...) as part of my learning journey and to inspire other devs.  
Follow the updates 👉 [#Planexa](https://x.com/search?q=%23Planexa)

---

## 🏴‍☠️ License

[MIT](LICENSE)