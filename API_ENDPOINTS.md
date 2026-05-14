# API Endpoints for MyReads (Suggested)

This file lists recommended backend endpoints for a fully-featured MyReads app. Use these to implement server-side persistence, auth, and extended features.

## Authentication
- POST /auth/signup
  - Body: { name, email, password }
  - Response: { user: { id, name, email }, token }
- POST /auth/login
  - Body: { email, password }
  - Response: { user, token }
- GET /auth/me
  - Headers: Authorization: Bearer <token>
  - Response: { user }
- POST /auth/logout
  - Headers: Authorization

## Books (Core)
- GET /books
  - List all books for the authenticated user (or public library)
  - Response: { books: [ { id, title, authors, imageLinks, shelf, notes } ] }
- GET /books/:id
  - Response: { book }
- POST /books
  - Add a new book to user's library
  - Body: { id, title, authors, coverUrl, shelf }
  - Response: { book }
- PUT /books/:id
  - Update metadata or shelf
  - Body: { shelf, notes, tags }
  - Response: { book }
- DELETE /books/:id
  - Remove a book from user's library

## Search
- GET /search?q=term&limit=20
  - Query the public index (or third-party) for books
  - Response: { books: [ { id, title, authors, imageLinks } ] }

## User Shelves & Preferences
- GET /users/:id/shelves
  - Response: { shelves: { currentlyReading: [ids], wantToRead: [ids], read: [ids] } }
- PUT /users/:id/preferences
  - Body: { view: 'grid' | 'list', theme, itemsPerPage }

## Notes & Reviews
- GET /books/:id/notes
- POST /books/:id/notes
- PUT /books/:id/notes/:noteId
- DELETE /books/:id/notes/:noteId

## Cover Image Uploads
- POST /uploads/images
  - Multipart form upload: { file }
  - Response: { url }

## Admin / Catalog (optional)
- POST /catalog/import
- GET /catalog/books/:id

## Webhooks / Analytics
- POST /webhooks/book-added
- POST /webhooks/book-updated

## Example Mock Responses (subset)
### GET /books
{
  "books": [
    {
      "id": "book-1",
      "title": "Sustainable Frontiers",
      "authors": ["A. Green"],
      "imageLinks": { "thumbnail": "https://picsum.photos/128/193?random=1" },
      "shelf": "currentlyReading"
    }
  ]
}

### PUT /books/book-1
Request: { "shelf": "read" }
Response: { "book": { ...updated book object... } }


---

Keep this file as a living document and extend with authentication flows (OAuth), rate limits, pagination, and validation rules as you implement the backend.
