# Absence Management API

Backend REST API untuk sistem manajemen absensi yang dibangun dengan Node.js, Express, dan PostgreSQL.

## Setup & Installation

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
USER = username;
PASSWORD = password;
HOST = localhost;
PORT = 5000;
DATABASE = db_attendance;
JWT_SECRET= secreet;
```

### 3. Create Database

```bash
createdb db_attendance
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

## API Endpoints

```
POST   /api/auth/login               - Login
GET    /api/absences                 - Get all (with pagination/filter)
GET    /api/absences/:id             - Get single
POST   /api/absences                 - Create
PUT    /api/absences/:id             - Update
DELETE /api/absences/:id             - Delete
```
