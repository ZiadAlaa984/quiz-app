quiz-api/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
└── README.md

                    ┌─────────────┐
                    │    User     │
                    └──────┬──────┘
                           │
                     Authentication
                           │
             ┌─────────────┴─────────────┐
             ↓                           ↓
         Normal User                  Admin
             │                           │
             ↓                           ↓
       View Quizzes               Manage Quizzes
             │                       /    |    \
             ↓                      ↓     ↓     ↓
        Take Quiz              Create  Update Delete
             │
             ↓
        Submit Answers
             │
             ↓
       Backend calculates
          the score
             │
             ↓
          Result




testing plan 

✓ Signup
✓ Signup duplicate email
✓ Signup missing fields
✓ Login correct credentials
✓ Login wrong password
✓ Login nonexistent user
✓ Access protected route without token
✓ Access protected route with invalid token
✓ Access protected route with valid token

✓ User accesses user endpoint
✓ User tries admin endpoint
✓ Admin accesses admin endpoint
✓ User tries to modify quiz
✓ User tries to delete quiz
✓ User tries to create question

✓ Create quiz
✓ Get all quizzes
✓ Get single quiz
✓ Update quiz
✓ Delete quiz
✓ Get nonexistent quiz
✓ Invalid quiz ID
✓ Missing required fields

✓ Create question
✓ Update question
✓ Delete question
✓ Get question
✓ Invalid question
✓ Question validation


✓ All answers correct
✓ All answers wrong
✓ Some correct
✓ Missing answer
✓ Extra answer
✓ Wrong question ID
✓ Submit nonexistent quiz
✓ Submit without authentication

✓ Create result
✓ Get my results
✓ Get specific result
✓ User cannot access another user's result
✓ Invalid result ID


User A → Result B
User A → Delete Quiz
User A → Update Quiz
User A → Create Question
User A → Change role to admin
s

Postman
   ↓
كل الـ endpoints شغالة
   ↓
كل الـ errors متغطية
   ↓
Authentication
   ↓
Authorization
   ↓
Security tests
   ↓
Pagination / Filtering / Search
   ↓
GitHub