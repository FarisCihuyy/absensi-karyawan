# Absence Management API

Backend REST API untuk sistem manajemen absensi yang dibangun dengan Node.js, Express, dan PostgreSQL.

## 📋 Arsitektur

```
src/
├── config/           # Database dan environment configuration
├── middleware/       # Error handler, auth, async wrapper
├── errors/          # Custom error classes
├── validators/      # Joi validation schemas
├── services/        # Business logic (auth, absence operations)
├── controllers/     # Request handlers
├── routes/          # API endpoints
└── server.js        # Main application
```

## 🚀 Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` dengan konfigurasi database:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=absence_management
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

### 3. Create Database
```bash
createdb absence_management
```

### 4. Run Migrations
```bash
npm run migrate:up
```

### 5. Seed Initial Data (Admin User)
```bash
node scripts/seed.js
```

Default admin credentials:
- Username: `admin`
- Password: `admin123`

### 6. Start Server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server akan berjalan di `http://localhost:5000`

---

## 📚 API Endpoints

### Authentication

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "username": "admin"
    }
  }
}
```

---

### Absences (Protected - Require Authorization Header)

Semua endpoint absences memerlukan `Authorization: Bearer <accessToken>` di header.

#### Get All Absences (with Pagination & Filter)
```
GET /api/absences?page=1&limit=10&sortBy=created_at&sortOrder=desc&nama=John&jenis_kelamin=L
Authorization: Bearer <accessToken>

Query Parameters:
- page: number (default: 1)
- limit: number (default: 10, max: 100)
- sortBy: 'nama' | 'tanggal_absen' | 'created_at' (default: created_at)
- sortOrder: 'asc' | 'desc' (default: desc)
- nama: string (optional, search)
- jenis_kelamin: 'L' | 'P' (optional, filter)

Response:
{
  "success": true,
  "message": "Absences retrieved successfully",
  "data": {
    "data": [
      {
        "id": 1,
        "nama": "John Doe",
        "alamat": "Jl. Merdeka No. 123",
        "jenis_kelamin": "L",
        "tanggal_absen": "2024-01-15",
        "jam_masuk": "08:00:00",
        "jam_keluar": "17:00:00",
        "created_at": "2024-01-15T10:00:00Z",
        "updated_at": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

#### Get Single Absence
```
GET /api/absences/:id
Authorization: Bearer <accessToken>

Response:
{
  "success": true,
  "message": "Absence retrieved successfully",
  "data": {
    "id": 1,
    "nama": "John Doe",
    "alamat": "Jl. Merdeka No. 123",
    "jenis_kelamin": "L",
    "tanggal_absen": "2024-01-15",
    "jam_masuk": "08:00:00",
    "jam_keluar": "17:00:00",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
}
```

#### Create Absence
```
POST /api/absences
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "nama": "John Doe",
  "alamat": "Jl. Merdeka No. 123",
  "jenis_kelamin": "L",
  "tanggal_absen": "2024-01-15",
  "jam_masuk": "08:00",
  "jam_keluar": "17:00"
}

Response: (201 Created)
{
  "success": true,
  "message": "Absence created successfully",
  "data": { ... }
}
```

#### Update Absence
```
PUT /api/absences/:id
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "nama": "Jane Doe",
  "jam_masuk": "07:30"
}

Response:
{
  "success": true,
  "message": "Absence updated successfully",
  "data": { ... }
}
```

#### Delete Absence
```
DELETE /api/absences/:id
Authorization: Bearer <accessToken>

Response:
{
  "success": true,
  "message": "Absence record deleted successfully"
}
```

---

## 📝 Error Handling

API mengembalikan error dalam format konsisten:

```json
{
  "success": false,
  "message": "Error description",
  "details": [
    {
      "path": "nama",
      "message": "\"nama\" is required"
    }
  ]
}
```

Common HTTP Status Codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔧 Development

### Database Migrations

Create new migration:
```bash
npm run migrate:create add_column_example
```

Run pending migrations:
```bash
npm run migrate:up
```

Rollback last migration:
```bash
npm run migrate:down
```

### Project Structure

- **Services**: Contain business logic (database queries, auth logic)
- **Controllers**: Handle HTTP requests, validate input, call services
- **Routes**: Define API endpoints dan middleware
- **Middleware**: Cross-cutting concerns (error handling, auth, logging)
- **Validators**: Joi schemas untuk input validation
- **Errors**: Custom error classes untuk structured error handling

### Adding New Feature

1. Create schema in `src/validators/schemas.js`
2. Create service logic in `src/services/`
3. Create controller in `src/controllers/`
4. Create routes in `src/routes/`
5. Add route to `src/server.js`
6. Create migration if needed in `migrations/`

---

## 🔐 Security Notes

- Always change `JWT_SECRET` di production
- Passwords di-hash menggunakan bcryptjs
- CORS enabled untuk frontend integration
- Token expiration diatur ke 1 jam (configurable)
- Input validation menggunakan Joi

---

## 📦 Dependencies

- `express` - Web framework
- `pg` - PostgreSQL client
- `joi` - Data validation
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables
- `node-pg-migrate` - Database migrations

---

## 📞 Support

Untuk masalah atau pertanyaan, hubungi tim development.
