absence-app-backend/
│
├── src/
│   ├── config/
│   │   └── database.js                 # PostgreSQL connection pool
│   │
│   ├── middleware/
│   │   ├── errorHandler.js             # Centralized error handling
│   │   ├── authMiddleware.js           # JWT token verification
│   │   └── asyncHandler.js             # Async error wrapper
│   │
│   ├── errors/
│   │   └── AppError.js                 # Custom error classes
│   │
│   ├── validators/
│   │   └── schemas.js                  # Joi validation schemas
│   │
│   ├── services/
│   │   ├── authService.js              # Authentication logic
│   │   └── absenceService.js           # Absence CRUD operations
│   │
│   ├── controllers/
│   │   ├── authController.js           # Auth request handlers
│   │   └── absenceController.js        # Absence request handlers
│   │
│   ├── routes/
│   │   ├── authRoutes.js               # Auth endpoints
│   │   └── absenceRoutes.js            # Absence endpoints
│   │
│   └── server.js                       # Express app & routes setup
│
├── migrations/
│   └── 1_initial_schema.js             # Create users & absences tables
│
├── scripts/
│   └── seed.js                         # Seed initial data (admin user)
│
├── .env.example                        # Environment variables template
├── .gitignore
├── package.json
└── README.md

---

## Flow Diagram

Request → Router → Controller → Validator → Service → Database
                        ↓
                   Error Handling ← Custom Errors

---

## Database Schema

Users Table:
- id (PK)
- username (UNIQUE)
- password (hashed)
- created_at
- updated_at

Absences Table:
- id (PK)
- nama
- alamat
- jenis_kelamin (L/P)
- tanggal_absen
- jam_masuk
- jam_keluar
- created_at
- updated_at

---

## Key Architecture Principles

1. **Separation of Concerns**
   - Controllers: Handle HTTP layer
   - Services: Handle business logic
   - Middleware: Handle cross-cutting concerns

2. **Error Handling**
   - Custom error classes untuk consistent error response
   - Centralized error middleware
   - Async error wrapper untuk automatic error catching

3. **Validation**
   - Input validation dengan Joi
   - Validation schemas terpusat di satu file
   - Joi error formatting ke response yang readable

4. **Database**
   - Raw pg queries (no ORM) untuk kontrol penuh
   - node-pg-migrate untuk version control schema
   - Connection pooling untuk performance

5. **Authentication**
   - JWT based authentication
   - Token stored di frontend (localStorage)
   - Protected routes dengan verifyToken middleware

6. **Maintainability**
   - Clear folder structure
   - Consistent naming conventions
   - Single responsibility principle
   - Easy to add new features
