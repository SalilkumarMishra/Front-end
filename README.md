# NutriNest E-commerce Platform

NutriNest is a full-stack e-commerce project for dry fruits, nuts, and healthy pantry products. It includes a customer-facing storefront, a separate admin dashboard, and a Node.js/Express backend with MongoDB for data storage.

## Project Overview

This repository contains three connected applications:

- `frontend` - the customer shopping experience built with React, Vite, Tailwind CSS, and Framer Motion.
- `admin-panel` - the admin dashboard built with React, Vite, and Bootstrap for managing store data.
- `BACKEND` - the Express API that powers authentication, products, cart, orders, reviews, and admin actions.

The goal of the project is to provide a complete online store experience where customers can browse products, manage their cart and wishlist, place orders, and track activity, while admins can manage catalog and order operations from a dedicated dashboard.

## Key Features

### Customer Storefront

- User signup, login, and forgot-password flow
- Product browsing and product detail pages
- Cart management and checkout flow
- Wishlist support
- Address management for authenticated users
- Order success page and protected customer routes
- Informational pages such as About, Blog, FAQ, Privacy, Terms, Shipping, and Contact

### Admin Dashboard

- Admin login and signup
- Dashboard overview
- Product management views
- Order management
- Customer listings
- Category management
- Profile management

### Backend Capabilities

- REST API for auth, products, cart, orders, reviews, and admin routes
- MongoDB integration for persistent data
- JWT-based authentication
- Socket.IO support
- Email support via Nodemailer
- Razorpay integration hooks for payments

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS, Framer Motion, Axios
- Admin Panel: React, Vite, Bootstrap, React Router, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Socket.IO, Nodemailer

## Repository Structure

```text
E-commerce/
├── frontend/       # Customer-facing storefront
├── admin-panel/    # Admin dashboard
└── BACKEND/        # Express API and database logic
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- MongoDB connection string

### 1. Install dependencies

Run this in each project folder:

```bash
cd frontend
npm install

cd ../admin-panel
npm install

cd ../BACKEND
npm install
```

### 2. Configure environment variables

Create a `.env` file inside `BACKEND` with the values your deployment needs. The backend reads at least:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Depending on your setup, you may also want values for email delivery and payment integration.

For the frontend, set the API URL if the backend is not running on the default local address:

```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Project Locally

Start each app in its own terminal:

### Backend

```bash
cd BACKEND
npm run dev
```

### Customer Frontend

```bash
cd frontend
npm run dev
```

### Admin Panel

```bash
cd admin-panel
npm run dev
```

## Available Scripts

### frontend

- `npm run dev` - start the Vite dev server
- `npm run build` - create a production build
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally

### admin-panel

- `npm run dev` - start the Vite dev server
- `npm run build` - create a production build
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally

### BACKEND

- `npm run dev` - start the server with nodemon
- `npm start` - start the backend server

## API Routes

The backend exposes these main route groups:

- `/api/auth` - signup, login, password reset, admin helper routes
- `/api/products` - product listing and single product details
- `/api/cart` - cart operations for authenticated users
- `/api/orders` - order creation and order history
- `/api/reviews` - product and site reviews
- `/api/admin` - admin login, profile, and order management

## Notes for Reviewers

- The storefront uses protected routes for authenticated customer actions.
- The admin panel is separated from the customer app so store operations stay isolated.
- The backend is designed to be run independently and can be connected to any compatible React frontend through the API base URL.

## Suggested Demo Flow

1. Open the customer storefront and browse products.
2. Sign up or log in as a customer.
3. Add products to the cart and proceed to checkout.
4. Log in to the admin panel to review products, customers, and orders.
5. Use the backend API as the source of truth for all store data.

## License

This project is currently marked with the ISC license in the backend package configuration.