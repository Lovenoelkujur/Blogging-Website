# Blogging Website

## Overview

This project is a simple blogging website backend implemented using Node.js, Express.js, and MongoDB. The application supports user authentication, creating and managing blog posts, and user authorization.

## Features

* User authentication (signup and login) with JWT.

* CRUD operations for blog posts.

* Pagination support for listing posts.

* Authorization middleware to restrict access to certain routes.

## Prerequisites

* `Node.js` (v12.x or higher)

* `MongoDB` (running locally or on a cloud service)

* `npm` (Node package manager)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Lovenoelkujur/Blogging-Website.git
cd blogging-website
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following:

```makefile
SECRET_KEY=your_jwt_secret_key
```

### Running the Server

```bash
npm start
```

The server will start on `http://localhost:9000`.

### Project Structure

```bash
.
├── controllers
│   ├── auth.js
│   └── post.js
├── middlewares
│   ├── auth.js
│   └── roleMiddleware.js
├── models
│   ├── auth.js
│   └── post.js
├── routes
│   ├── auth.js
│   └── post.js
├── .env
├── app.js
├── package.json
└── README.md
```

### Troubleshooting

#### Common Issues

* `MongoDB Connection Error`: Ensure MongoDB is running and the connection string is correct.

* `JWT Errors`: Verify that the SECRET_KEY is correctly set in the environment variables.

* `Permission Errors`: Ensure you are sending the correct JWT token in the authorization header for protected routes.

### Testing

#### Manual Testing

You can test the API endpoints using tools like `Postman` or `Insomnia`.

### API Endpoints

#### Authentication

* POST `/api/v1/signup` - User registration

* POST `/api/v1/login` - User login

#### Posts

* GET `/api/v1/posts` - Retrieve all posts (with pagination)

* POST `/api/v1/posts` - Create a new post

* GET `/api/v1/posts/:id` - Retrieve a specific post by ID

* PUT `/api/v1/posts/:id` - Update a specific post by ID

* DELETE `/api/v1/posts/:id` - Delete a specific post by ID

### Middleware

#### Auth Middleware (`auth.js`)

This middleware validates the JWT token and ensures that the user is authenticated.

#### Role Middleware (`roleMiddleware.js`)

This middleware checks if the user has the required role to access a specific route.

### Models

#### User Model (`auth.js`)

Defines the schema for user data, including fields for name, email, password, and role.

#### Post Model (`post.js`)

Defines the schema for blog posts, including fields for title, body, tags, and userId.

### Controllers

#### Auth Controller (`auth.js`)

Handles user signup and login functionality, including password hashing and JWT token generation.

#### Post Controller (`post.js`)

Handles CRUD operations for blog posts, including pagination support for listing posts.

## Example Requests

### Signup
```bash
curl -X POST http://localhost:9000/api/v1/signup -H "Content-Type: application/json" -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}'
```

### Login

```bash
curl -X POST http://localhost:9000/api/v1/login -H "Content-Type: application/json" -d '{
    "email": "john@example.com",
    "password": "password123"
}'
```

### Create Post

```bash
curl -X POST http://localhost:9000/api/v1/posts -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_JWT_TOKEN" -d '{
    "title": "My First Blog Post",
    "body": "This is the content of the blog post.",
    "tags": ["tag1", "tag2"]
}'
```

## License

This project is licensed under the MIT License.
