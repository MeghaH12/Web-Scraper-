Books REST API
A simple, lightweight REST API for managing a collection of books built with Node.js and Express.js. This API provides full CRUD (Create, Read, Update, Delete) operations with in-memory storage - no database required!

📚 Features
Full CRUD Operations: Create, read, update, and delete books
In-Memory Storage: No database setup required - perfect for development and testing
Data Validation: Robust validation for book properties
Error Handling: Comprehensive error handling with meaningful messages
RESTful Design: Follows REST API conventions and best practices
JSON API: Clean JSON request/response format
Sample Data: Comes pre-loaded with sample books for testing
🚀 Quick Start
Prerequisites
Node.js (v12 or higher)
npm (comes with Node.js)
Installation
Clone or create the project

mkdir books-api
cd books-api
Initialize npm and install dependencies

npm init -y
npm install express
Create the API file

Save the provided code as app.js
Start the server

node app.js
Verify it's running

Books API server is running on http://localhost:3000
📖 API Documentation
Base URL
http://localhost:3000
Book Schema
{
  "id": "number (auto-generated)",
  "title": "string (required)",
  "author": "string (required)",
  "year": "number (optional)",
  "genre": "string (optional)"
}
Endpoints
1. Get All Books
GET /books
Response:

{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "year": 1960,
      "genre": "Fiction"
    }
  ]
}
2. Get Book by ID
GET /books/:id
Response:

{
  "success": true,
  "data": {
    "id": 1,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "year": 1960,
    "genre": "Fiction"
  }
}
3. Create New Book
POST /books
Content-Type: application/json
Request Body:

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925,
  "genre": "Classic Literature"
}
Response:

{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 4,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925,
    "genre": "Classic Literature"
  }
}
4. Update Book Completely
PUT /books/:id
Content-Type: application/json
Request Body: (All fields required)

{
  "title": "Updated Title",
  "author": "Updated Author",
  "year": 2023,
  "genre": "Updated Genre"
}
5. Update Book Partially
PATCH /books/:id
Content-Type: application/json
Request Body: (Only fields to update)

{
  "genre": "Science Fiction"
}
6. Delete Book
DELETE /books/:id
Response:

{
  "success": true,
  "message": "Book deleted successfully",
  "data": {
    "id": 1,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "year": 1960,
    "genre": "Fiction"
  }
}
🧪 Testing the API
Using cURL
Get all books:

curl http://localhost:3000/books
Get a specific book:

curl http://localhost:3000/books/1
Create a new book:

curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "year": 1951,
    "genre": "Fiction"
  }'
Update a book partially:

curl -X PATCH http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"genre": "Classic Fiction"}'
Delete a book:

curl -X DELETE http://localhost:3000/books/1
Using Postman or Thunder Client
Import the following endpoints:

GET http://localhost:3000/books
GET http://localhost:3000/books/1
POST http://localhost:3000/books
PUT http://localhost:3000/books/1
PATCH http://localhost:3000/books/1
DELETE http://localhost:3000/books/1
Set Content-Type: application/json for POST, PUT, and PATCH requests

⚠️ Error Handling
The API provides comprehensive error handling:

Validation Errors (400 Bad Request)
{
  "success": false,
  "message": "Validation errors",
  "errors": [
    "Title is required and must be a non-empty string",
    "Author is required and must be a non-empty string"
  ]
}
Not Found (404)
{
  "success": false,
  "message": "Book not found"
}
Server Error (500)
{
  "success": false,
  "message": "Something went wrong!"
}
🏗️ Project Structure
books-api/
├── app.js              # Main application file
├── package.json        # Project dependencies
├── package-lock.json   # Dependency lock file
└── README.md          # This file
🔧 Configuration
The API runs on port 3000 by default. You can change this by modifying the PORT constant in app.js:

const PORT = process.env.PORT || 3000;
📝 Data Validation Rules
Title: Required, must be a non-empty string
Author: Required, must be a non-empty string
Year: Optional, must be a valid integer between 0 and current year
Genre: Optional, string
🚧 Limitations
In-Memory Storage: Data is lost when the server restarts
No Authentication: No user authentication or authorization
No Pagination: All books are returned in a single request
No Search: No filtering or search capabilities
Single Instance: Not designed for multiple server instances
🔮 Future Enhancements
 Add database integration (MongoDB, PostgreSQL, etc.)
 Implement authentication and authorization
 Add pagination and filtering
 Include search functionality
 Add data persistence
 Implement rate limiting
 Add API documentation with Swagger
 Include unit and integration tests
 Add logging middleware
 Implement CORS support
🤝 Contributing
Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
This project is open source and available under the MIT License.

🆘 Troubleshooting
Common Issues
Port already in use

Error: listen EADDRINUSE: address already in use :::3000
Solution: Change the PORT in app.js or kill the process using port 3000
Module not found

Error: Cannot find module 'express'
Solution: Run npm install express
JSON parsing error

SyntaxError: Unexpected token in JSON
Solution: Ensure you're sending valid JSON and setting Content-Type: application/json
📞 Support
If you have any questions or need help, please:

Check the troubleshooting section above
Review the API documentation
Create an issue in the project repository

