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

🛒 ✅ Shopify Clone Backend Completion Checklist
✅ Authentication
 JWT Auth for Users/Admins

 Google OAuth + Auto User Creation

✅ Products
 Product CRUD (with Cloudinary image uploads)

 Brand/Category Filtering

 Search by Name

 Redis Caching for Fast Listing

 Stock Management (auto-update after order)

✅ Cart & Orders
 Add to Cart (Session/User-based)

 Place Order (with shipping, payment, cartItems)

 Reduce stock on purchase

 Order History (User)

 Admin can view & mark orders as read/processed

 Auto-email to User after 30 min: "Order Shipped"

 Real-time Admin notification on order placed

✅ Payment
 PayPal Integration (order placement + success)

✅ Wishlist & Discounts
 Add/Remove Wishlist

 Discount Code Logic (optional)

✅ Live Chat
 Socket.IO live chat between Admin & User

 Chat stored in MongoDB

 Realtime updates

✅ Notifications
 MongoDB-based notifications system

 Realtime toasts using Socket.IO

✅ Email System
 Nodemailer Setup

 Email on Order Confirmed

 Auto-email after 30 mins (using setTimeout)

 ✅ Forgot Password with Email Reset