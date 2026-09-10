# Cotton Energy

Cotton Energy is a MERN multi-vendor marketplace portfolio project. It demonstrates authentication, role-based access, seller approval, product moderation, carts, wishlists, checkout, orders, reviews, and responsive customer, seller, and admin workspaces.

## Features

- Customer, seller, and administrator roles
- Seller registration and administrator approval
- Product submission, moderation, inventory, and image previews
- Product search, categories, cart, wishlist, checkout, and order history
- Admin user, seller, product, category, order, report, and settings views
- Automatic memory mode when MongoDB is unavailable
- Optional MongoDB persistence through Mongoose

## Technology Stack

- React, Vite, React Router, Axios, Tailwind CSS
- Node.js, Express, Mongoose
- JWT and bcryptjs
- MongoDB (optional for local development)

## Installation

Requirements: Node.js 18+.

```bash
npm install
npm run dev
```

The client runs on `http://localhost:5173` and the API runs on `http://localhost:5000`.

### Memory Mode

Memory mode is automatic when MongoDB is unavailable. It starts with an empty marketplace and one administrator account. New users, products, carts, wishlists, and orders live for the current server process.

### Optional MongoDB

Copy `server/.env.example` to `server/.env` and set the connection string:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/cotton-energy
JWT_SECRET=change-this-local-secret
```

Start MongoDB, then run `npm run dev`. The server will create the administrator account if it does not exist.

## Default Administrator

- Email: `admin@cottonenergy.com`
- Password: `admin123`

Customers and sellers must register through the application. No demo products, sellers, customers, orders, carts, or wishlists are created.

## Structure

```text
client/       React frontend
server/       Express API, models, controllers, routes, middleware
public/       Frontend static assets
```

## Screenshots

Add screenshots of the customer shop, seller dashboard, and admin dashboard here before publishing.

## License

This portfolio project is available for educational use. Add the license selected by your institution or repository owner before publication.
