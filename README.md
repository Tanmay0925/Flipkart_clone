Readme · MD
Copy

# 🛒 Flipkart Clone — Full Stack E-Commerce Application
 
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Deployed on Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
 
> A pixel-perfect, fully functional clone of Flipkart — India's largest e-commerce platform — built with a modern full-stack architecture. Features real-time cart management, product search, category filtering, order placement, and a complete checkout flow.
 
---
 
## 🌐 Live Demo
 
| Service | URL |
|--------|-----|
| 🖥️ Frontend | [flipkart-clone.vercel.app](https://vercel.com) |
| ⚙️ Backend API | [flipkart-clone-1-e3il.onrender.com/api](https://flipkart-clone-1-e3il.onrender.com/api/products) |
 
---
 
## 📸 Screenshots
 
### 🏠 Home Page — Hero Banner + Category Navigation
![Home Page](https://via.placeholder.com/1200x600/2874f0/ffffff?text=Flipkart+Clone+Home)
 
### 🛍️ Product Listing — Grid View with Filters
![Product Listing](https://via.placeholder.com/1200x600/f1f3f6/212121?text=Product+Listing+Page)
 
### 🛒 Cart & Checkout
![Cart](https://via.placeholder.com/1200x600/2874f0/ffffff?text=Cart+%26+Checkout)
 
---
 
## ✨ Features
 
### 🧑‍💻 User-Facing Features
- **Hero Banner** — Auto-sliding carousel with 4 promotional slides and manual navigation
- **Shop by Category** — Visual category quick-links (Mobiles, Electronics, Footwear, Clothing, Appliances, Books)
- **Today's Top Deals** — Horizontally scrollable deals row with product thumbnails
- **Product Grid** — Responsive 5-column product grid with hover effects
- **Real-time Search** — Search across product name and category with live URL sync
- **Category Filtering** — Filter products by category with active state in navbar
- **Product Detail Page** — Full product info, ratings, reviews, add to cart
- **Cart Management** — Add, remove, increment/decrement quantities with live price calculation
- **Checkout Flow** — Multi-step address form with order summary
- **Order Confirmation** — Order ID display with success screen
- **Login Modal** — Flipkart-style login UI (demo mode)
- **Responsive Design** — Optimized for desktop screens
 
### 🔧 Technical Features
- **RESTful API** — Clean Express.js routes for products, cart, and orders
- **PostgreSQL Database** — Relational schema with foreign key constraints
- **Environment-based Config** — `.env` for local, Render env vars for production
- **CORS enabled** — Frontend-backend communication across different domains
- **SSL Database Connection** — Secure connection to cloud PostgreSQL
- **Auto-deploy** — GitHub push triggers automatic Render redeployment
- **Vite Build** — Lightning-fast frontend bundling and HMR
 
---
 
## 🏗️ Tech Stack
 
### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI library with hooks |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| Axios | HTTP client for API calls |
| Tailwind CSS | Utility-first styling |
| Inline Styles | Component-level Flipkart-accurate styling |
 
### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework & routing |
| pg (node-postgres) | PostgreSQL client |
| dotenv | Environment variable management |
| CORS | Cross-origin request handling |
 
### Database
| Technology | Purpose |
|-----------|---------|
| PostgreSQL 18 | Relational database |
| Render PostgreSQL | Cloud-hosted DB (production) |
| Local PostgreSQL | Development database |
 
### DevOps & Deployment
| Service | Purpose |
|---------|---------|
| GitHub | Version control & source of truth |
| Render | Backend hosting + PostgreSQL |
| Vercel | Frontend hosting with CDN |
 
---
 
## 📁 Project Structure
 
```
Flipkart_clone/
├── backend/
│   ├── routes/
│   │   ├── products.js      # GET /api/products, GET /api/products/:id
│   │   ├── cart.js          # GET, POST, PATCH, DELETE /api/cart
│   │   └── orders.js        # GET, POST /api/orders
│   ├── db.js                # PostgreSQL connection pool
│   ├── index.js             # Express app entry point
│   └── .env                 # Local environment variables
│
└── frontend/
    ├── public/
    │   └── images/          # Product images (samsung.jpg, iphone.jpg, etc.)
    ├── src/
    │   ├── api/
    │   │   └── api.js       # Axios API call functions
    │   ├── components/
    │   │   ├── Navbar.jsx   # Top navigation with search & login modal
    │   │   ├── CategoryFilter.jsx  # Category tab bar
    │   │   └── ProductCard.jsx     # Individual product card
    │   ├── pages/
    │   │   ├── Home.jsx         # Landing page with banner, deals, grid
    │   │   ├── ProductDetail.jsx # Single product view
    │   │   ├── Cart.jsx         # Shopping cart
    │   │   ├── Checkout.jsx     # Address form & order summary
    │   │   └── OrderConfirmation.jsx # Success screen
    │   ├── App.jsx          # Router setup
    │   └── main.jsx         # React entry point
    └── index.html
```
 
---
 
## 🗄️ Database Schema
 
```sql
users
├── id SERIAL PRIMARY KEY
├── name VARCHAR(100)
├── email VARCHAR(100) UNIQUE
└── created_at TIMESTAMP
 
products
├── id SERIAL PRIMARY KEY
├── name VARCHAR(255)
├── category VARCHAR(100)
├── price NUMERIC(10,2)
├── description TEXT
├── image_url VARCHAR(500)
├── rating NUMERIC(2,1)
├── review_count INT
├── stock INT
├── keywords TEXT
└── created_at TIMESTAMP
 
cart_items
├── id SERIAL PRIMARY KEY
├── user_id → users(id)
├── product_id → products(id)
├── quantity INT
└── UNIQUE(user_id, product_id)
 
orders
├── id SERIAL PRIMARY KEY
├── user_id → users(id)
├── address TEXT
├── total NUMERIC(10,2)
├── status VARCHAR(50)
└── created_at TIMESTAMP
 
order_items
├── id SERIAL PRIMARY KEY
├── order_id → orders(id)
├── product_id → products(id)
├── quantity INT
└── price NUMERIC(10,2)
```
 
---
 
## 🔌 API Endpoints
 
### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (supports `?search=` and `?category=`) |
| GET | `/api/products/:id` | Get single product by ID |
 
### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get all cart items for default user |
| POST | `/api/cart` | Add item to cart (or increment if exists) |
| PATCH | `/api/cart/:id` | Update item quantity |
| DELETE | `/api/cart/:id` | Remove item from cart |
 
### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders for default user |
| POST | `/api/orders` | Place order, create order items, clear cart |
 
---
 
## 🚀 Running Locally
 
### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Git
 
### 1. Clone the repository
```bash
git clone https://github.com/Tanmay0925/Flipkart_clone.git
cd Flipkart_clone
```
 
### 2. Setup Backend
```bash
cd backend
npm install
```
 
Create a `.env` file in the `backend/` folder:
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=flipkart
DB_PASSWORD=your_password
DB_PORT=5432
PORT=5000
```
 
### 3. Setup the Database
Open psql and run:
```sql
CREATE DATABASE flipkart;
\c flipkart
```
Then run the full schema + seed SQL from `backend/seed.sql`.
 
### 4. Start the Backend
```bash
node index.js
# Server running on port 5000
```
 
### 5. Setup Frontend
```bash
cd ../frontend
npm install
```
 
Create a `.env` file in the `frontend/` folder:
```env
VITE_API_URL=http://localhost:5000/api
```
 
### 6. Start the Frontend
```bash
npm run dev
# App running at http://localhost:5173
```
 
---
 
## ☁️ Deployment
 
### Backend — Render
- Connected to GitHub repo (`/backend` root directory)
- Auto-deploys on every push to `main`
- Environment variable: `DATABASE_URL` pointing to Render PostgreSQL
- SSL enabled for database connection
 
### Database — Render PostgreSQL
- PostgreSQL 18, Oregon (US West) region
- Free tier, 1GB storage
- Internal connection used by backend service
 
### Frontend — Vercel
- Connected to GitHub repo (`/frontend` root directory)
- Auto-deploys on every push to `main`
- Environment variable: `VITE_API_URL` pointing to Render backend
- Global CDN for fast delivery
 
---
 
## 🧠 Key Implementation Decisions
 
| Decision | Reason |
|----------|--------|
| Single `USER_ID = 1` | Simplified auth for demo — focus on e-commerce logic |
| Inline styles over CSS files | Pixel-perfect Flipkart UI matching without style conflicts |
| `ILIKE` for search | Case-insensitive PostgreSQL search across name and category |
| `UNIQUE(user_id, product_id)` in cart | Prevents duplicate cart entries, uses UPDATE instead |
| `ON DELETE CASCADE` | Keeps DB clean when users/products are removed |
| Unsplash fallback images | Graceful degradation when product images fail to load |
| `import.meta.env.VITE_API_URL` | Seamless local/production API URL switching |
 
---
 
## 👤 Author
 
**Tanmay** — [@Tanmay0925](https://github.com/Tanmay0925)
 
---
 
## 📄 License
 
This project is for educational purposes. Flipkart is a trademark of Walmart Inc.
 
