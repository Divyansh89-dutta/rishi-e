# 🛒 Shopify-Clone Backend API

An advanced e-commerce backend built with **Node.js**, **Express**, **MongoDB**, **Socket.IO**, and **Redis**, supporting user accounts, product management, cart, orders, wishlist, and real-time features.

---

## 🚀 Features Overview

### 👤 Authentication
- JWT-based secure login & signup
- Google OAuth login via Passport.js
- User roles: `user` / `admin`

### 🛍️ Product Management
- Add/update/delete products (admin)
- Public product listing and details
- 🔎 **Full-text search** across:
  - Name
  - Brand
  - Category

### ❤️ Wishlist
- Add/remove favorite products
- Fetch all wishlist items for user

### 🛒 Cart System
- Add/update/remove cart items
- Auto-merge cart items on login
- Linked to user profile

### 📦 Orders
- Place orders (COD/PayPal)
- Apply **discount codes** with:
  - Expiry & usage limits
  - Track used codes per user
- Admin dashboard:
  - Get all orders
  - Mark orders as delivered

### 💬 Notifications (Real-Time)
- 🔔 Real-time notifications via **Socket.IO**
- Order confirmation notifications
- Admins notified on new orders
- Notifications stored in DB

### ✉️ Email Integration (Nodemailer)
- Send order confirmation emails to users
- SMTP via Gmail (or your preferred provider)

### 🗺️ Address Management
- Add/update/delete shipping addresses
- Mark default address
- Linked to user profile

### 🔐 Middleware & Security
- `protect`: route guard for logged-in users
- `adminOnly`: restrict access to admin-only routes
- Input validation
- JWT token expiration

### ⚡ Redis Caching
- Product list caching for faster performance (optional setup)

---

## 📁 Project Structure


---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT + Google OAuth (Passport)
- **Real-Time**: Socket.IO
- **Caching**: Redis
- **Email**: Nodemailer (Gmail SMTP)

---

## 🧪 Postman Testing

Use Postman to test endpoints:

- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/google`
- Products: `/api/products`, `/api/products/search?q=apple`
- Cart: `/api/cart`
- Wishlist: `/api/wishlist`
- Orders: `/api/orders`
- Discount codes: `/api/discounts/create`
- Addresses: `/api/addresses`

> **Don’t forget to set `Authorization: Bearer <token>` in headers**

---

.env 
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopify-clone
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

