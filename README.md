# Quiz App

A RESTful Quiz API built with **Node.js, Express.js, MongoDB, and Mongoose**.

The project was built as a backend learning project to practice authentication, authorization, REST APIs, MongoDB relationships, Mongoose middleware, error handling, JWT authentication, and quiz/result workflows.

## Features

### Authentication
- User signup
- User login
- JWT-based authentication
- Get currently authenticated user
- Password hashing with bcrypt
- Password excluded from normal Mongoose queries
- User roles: `user` and `admin`

### Authorization
- Protected routes using authentication middleware
- Role-based authorization using an authorization middleware
- Admin-only quiz/question management
- Normal users can access quiz functionality without admin privileges

### Quiz
- Create quiz
- Get all quizzes
- Get a single quiz
- Update quiz
- Delete quiz
- Quiz difficulty validation: `easy`, `medium`, `hard`
- Quiz/question relationship using MongoDB ObjectIds
- Automatic population of quiz questions

### Questions
- Create question
- Get all questions
- Get a single question
- Update question
- Delete question
- Questions belong to a quiz
- Correct answer is excluded from normal queries using Mongoose `select: false`

### Quiz Submission & Results
- Submit a quiz
- Calculate quiz score on the backend
- Store submitted answers
- Store whether each answer was correct
- Store total questions and score
- Store the user and quiz associated with each result
- Result timestamps

### Error Handling
- Centralized error middleware
- `AppError` utility
- Async error handling using `catchAsync`

## Current Scope

The following features are intentionally **not implemented yet**:

- Pagination
- Filtering
- Search
- Deployment
- Image upload
- Payment integration
- Advanced caching/performance features

These can be added as future improvements.

---

# Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcryptjs**
- **dotenv**

---

# Project Structure

```text
quiz-app/
│
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── question.controller.js
│   │   ├── quiz.controller.js
│   │   └── result.controller.js
│   │
│   ├── middleware/
│   │   ├── authenticated.js
│   │   ├── authorized.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── question.model.js
│   │   ├── quiz.model.js
│   │   ├── result.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── question.route.js
│   │   ├── quiz.route.js
│   │   └── result.route.js
│   │
│   ├── utils/
│   │   ├── AppError.js
│   │   ├── catchAsync.js
│   │   ├── connectDB.js
│   │   ├── factory.js
│   │   └── generateToken.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# Data Models

## User

A user contains:

```text
name
email
password
role
createdAt
updatedAt
```

### Roles

```text
user
admin
```

The default role is `user`.

The public signup flow should not allow the client to choose `admin` as a role. The backend/schema assigns the default role.

Passwords are hashed with `bcryptjs` before being saved.

---

## Quiz

```text
title
description
category
difficulty
questions[]
```

`difficulty` accepts:

```text
easy
medium
hard
```

The `questions` field contains MongoDB ObjectIds referencing the `Question` model.

Quiz queries automatically populate the related questions through Mongoose middleware.

---

## Question

```text
question
options[]
answer
quiz
```

Each question belongs to a quiz.

The correct answer uses:

```text
select: false
```

so it is not returned by normal Mongoose queries. This helps prevent exposing the correct answer when a user requests a quiz.

---

## Result

A result represents a user's attempt at a quiz.

```text
user
quiz
totalQuestions
score
answers[]
createdAt
updatedAt
```

Each submitted answer contains:

```text
question
answer
isCorrect
```

Relationship:

```text
User
  │
  └── Result
        │
        └── Quiz
              │
              └── Questions
```

---

# API

The API is organized into four main resources:

```text
/api/auth
/api/quizzes
/api/questions
/api/results
```

> The exact base path depends on how the routers are mounted in `app.js`.

---

## Authentication Routes

### Signup

```http
POST /api/auth/signup
```

Creates a new user.

The public signup request should contain user information such as:

```json
{
  "name": "Ziad",
  "email": "ziad@example.com",
  "password": "password123"
}
```

The role is not supplied by the public user and defaults to:

```text
user
```

### Login

```http
POST /api/auth/login
```

Authenticates a user and returns a JWT.

### Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

Returns information about the currently authenticated user.

---

# Quiz Routes

All quiz routes require authentication.

### Get All Quizzes

```http
GET /api/quizzes
Authorization: Bearer <token>
```

### Get One Quiz

```http
GET /api/quizzes/:id
Authorization: Bearer <token>
```

### Create Quiz

```http
POST /api/quizzes
Authorization: Bearer <admin-token>
```

Admin only.

### Update Quiz

```http
PATCH /api/quizzes/:id
Authorization: Bearer <admin-token>
```

Admin only.

### Delete Quiz

```http
DELETE /api/quizzes/:id
Authorization: Bearer <admin-token>
```

Admin only.

### Submit Quiz

```http
POST /api/quizzes/:id/submit
Authorization: Bearer <token>
```

A user submits their answers. The backend is responsible for checking the answers and calculating the score.

The client should not be trusted to send the final score.

---

# Question Routes

All question routes require authentication.

### Get All Questions

```http
GET /api/questions
Authorization: Bearer <token>
```

### Get One Question

```http
GET /api/questions/:id
Authorization: Bearer <token>
```

### Create Question

```http
POST /api/questions/:id
Authorization: Bearer <admin-token>
```

Admin only.

> In the current implementation, the question creation route uses `/:id`. The meaning of this ID depends on the controller implementation.

### Update Question

```http
PATCH /api/questions/:id
Authorization: Bearer <admin-token>
```

Admin only.

### Delete Question

```http
DELETE /api/questions/:id
Authorization: Bearer <admin-token>
```

Admin only.

---

# Result Routes

All result routes require authentication.

### Get All Results

```http
GET /api/results
Authorization: Bearer <admin-token>
```

Admin only in the current route configuration.

### Create Result

```http
POST /api/results
Authorization: Bearer <admin-token>
```

Admin only in the current route configuration.

### Get One Result

```http
GET /api/results/:id
Authorization: Bearer <token>
```

The controller should ensure that a normal user can only access results they are allowed to see.

### Update Result

```http
PATCH /api/results/:id
Authorization: Bearer <admin-token>
```

Admin only.

### Delete Result

```http
DELETE /api/results/:id
Authorization: Bearer <admin-token>
```

Admin only.

---

# Authentication Flow

The authentication flow is:

```text
Signup
   ↓
User created
   ↓
Password hashed
   ↓
Login
   ↓
JWT generated
   ↓
Client sends JWT
   ↓
authenticated middleware
   ↓
req.user
   ↓
Controller
```

For admin-protected routes:

```text
Request
   ↓
authenticated
   ↓
authorized("admin")
   ↓
Controller
```

Authentication answers:

> Who is the user?

Authorization answers:

> Is this user allowed to perform this operation?

---

# Quiz Submission Flow

The intended quiz submission flow is:

```text
User submits answers
        ↓
Find Quiz
        ↓
Get Quiz Questions
        ↓
Get correct answers
        ↓
Compare submitted answers
        ↓
Calculate score
        ↓
Create Result
        ↓
Return Result
```

The score should always be calculated by the backend rather than trusted from the client.

---

# Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit the `.env` file to GitHub.

Make sure `.env` is included in `.gitignore`.

---

# Installation

Clone the repository and install dependencies:

```bash
npm install
```

Create the `.env` file with the required variables.

Then start the development server:

```bash
npm run dev
```

Or use the project's configured start command if different.

---

# Testing

The API was tested using Postman.

Recommended testing flow:

```text
1. Signup
2. Login
3. Save JWT
4. Test /auth/me
5. Test protected routes
6. Create/use an admin account
7. Test admin quiz operations
8. Test question operations
9. Submit a quiz
10. Check the generated result
11. Test unauthorized requests
12. Test invalid IDs and missing data
```

Important authorization tests include:

```text
User → Create Quiz        → should be rejected
User → Update Quiz        → should be rejected
User → Delete Quiz        → should be rejected
User → Create Question    → should be rejected
User → Delete Question    → should be rejected
Admin → Admin operations  → should be allowed
```

---

# Future Improvements

The next planned improvements are:

## 1. Pagination

Add pagination to large collections such as quizzes, questions, and results.

Example:

```text
GET /api/quizzes?page=1&limit=10
```

## 2. Filtering

Allow users to filter quizzes by fields such as:

```text
category
difficulty
```

## 3. Search

Add search functionality for quiz titles/descriptions.

## 4. Image Upload

Allow images to be uploaded for quizzes/questions or user profiles.

## 5. Deployment

Deploy the backend and connect it to a production MongoDB database.

## 6. API Documentation

Add Swagger/OpenAPI documentation for easier API exploration.

## 7. Automated Testing

Add automated tests using tools such as Jest and Supertest.

## 8. Security Improvements

Possible future improvements include:

- Rate limiting
- Security headers
- More strict request validation
- MongoDB indexes
- Improved authentication/token handling
- Production logging

## 9. Performance

After the core application is stable:

- Optimize database queries
- Add appropriate indexes
- Improve pagination
- Consider caching where it provides a real benefit

---

# Learning Goals

This project was built to practice backend concepts including:

- REST API design
- Express routing
- MVC-style project structure
- MongoDB
- Mongoose schemas and relationships
- Mongoose population
- Mongoose middleware
- JWT authentication
- Role-based authorization
- Password hashing
- Async error handling
- Centralized error handling
- CRUD operations
- Backend-side business logic
- Secure quiz submission
- Git and GitHub workflow

---

# Status

**Project:** Quiz App  
**Type:** Backend REST API  
**Status:** Completed initial version

Current version focuses on the core backend functionality. Pagination, filtering, search, deployment, image uploads, payments, automated testing, and other advanced production features are planned as future improvements.
