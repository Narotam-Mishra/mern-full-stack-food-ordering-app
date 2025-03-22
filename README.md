# MERN Full-Stack Food Ordering Application

## Description
This is a **full-stack food ordering web application** built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to browse a food menu, add items to a cart, place orders, and manage orders via an admin dashboard.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication**: Secure login and registration using JWT.
- **Menu Browsing**: View available food items with categories.
- **Cart Functionality**: Add, update, and remove items from the cart.
- **Order Processing**: Place and track orders.
- **Admin Panel**: Manage food items, orders, and users.
- **Payment Integration**: (Integrate Stripe for payments)

## Technologies Used
### Frontend:
- **React.js** - UI library
- **Context API** - State management
- **CSS** - For UI Components Styling

### Backend:
- **Node.js** - Runtime environment
- **Express.js** - Server framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Other Tools:
- **JWT (JSON Web Token)** - Authentication
- **Cloudinary** - Image storage (if needed)

## Installation
### 1. Clone the repository:
```sh
git clone https://github.com/Narotam-Mishra/mern-full-stack-food-ordering-app.git
cd mern-full-stack-food-ordering-app
```

### 2. Install backend dependencies:
```sh
cd backend
npm install
```

### 3. Install frontend dependencies:
```sh
cd frontend
npm install
```

### 4. Set up environment variables:
Create a `.env` file in the `server` directory and add:
```env
PORT=5000
dbURL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=your_frontend_url
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_API_KEY=your_stripe_api_key
```

## Usage
### 1. Start the backend server:
```sh
cd server
npm start
```
Backend runs at `http://localhost:5000`.

### 2. Start the frontend:
```sh
cd ../client
npm start
```
Frontend runs at `http://localhost:3000`.

### 3. Open in Browser:
Go to `http://localhost:3000`.

## Project Structure
```
mern-full-stack-food-ordering-app/
│── client/        # React frontend
│── backend/        # Node.js backend
│── models/        # Mongoose models
│── routes/        # Express routes
│── controllers/   # Business logic
│── config/        # Configuration files
```

## API Endpoints
### User Routes:
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - User login

### Food Menu Routes:
- `GET /api/food/list` - List all food items
- `POST /api/food/add` - Add a new food item (Admin only)

### Order Routes:
- `POST /api/order/place` - Place an order
- `GET /api/orders/list` - List order details

### Deployment
- [Frontend URL](https://mern-full-stack-food-ordering-app.vercel.app/)
- [Backend URL](https://backend-mern-full-stack-food-ordering-app.onrender.com)

## Contributing
1. Fork the repository
2. Create a new branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push the branch: `git push origin feature/new-feature`
5. Open a pull request

## License
This project is licensed under the MIT License.

