# Absence Management Frontend

Frontend untuk Absence Management System dengan Bootstrap 5 dan vanilla JavaScript.

## 📋 Fitur

✅ **Authentication**
- Login page dengan form validation
- Token management (localStorage)
- Protected routes (auto redirect ke login jika belum authenticated)

✅ **Dashboard**
- List absence records dengan pagination
- Search & filter (nama, jenis kelamin)
- Sorting
- CRUD operations (Create, Read, Update, Delete)
- Responsive design

✅ **User Interface**
- Beautiful gradient design
- Bootstrap 5 components
- Bootstrap Icons
- Modal dialogs untuk form
- Success/error alerts

## 📁 Struktur Project

```
absence-app-frontend/
├── index.html          # Entry point (redirect ke login/dashboard)
├── login.html          # Login page
├── dashboard.html      # Main dashboard dengan CRUD
├── js/
│   └── api.js         # API service layer (fetch calls)
├── package.json
└── README.md
```

## 🚀 Setup & Running

### Option 1: Python HTTP Server (Recommended)

```bash
cd absence-app-frontend

# Start server di port 3000
python3 -m http.server 3000

# Atau gunakan npm script
npm run dev
```

Akses: `http://localhost:3000`

### Option 2: Node.js HTTP Server

```bash
npm install -g http-server
http-server -p 3000
```

### Option 3: Use dengan Live Server (VS Code)

Buka `index.html` dengan Live Server extension di VS Code.

---

## ⚙️ Configuration

Edit API base URL di `js/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Sesuaikan dengan backend URL (development/production).

---

## 🔐 Authentication Flow

1. User buka aplikasi → redirect ke `login.html`
2. Input username & password → POST ke `/api/auth/login`
3. Jika berhasil → simpan token ke localStorage
4. Redirect ke `dashboard.html`
5. Dashboard fetch data dengan Authorization header: `Bearer <token>`
6. Jika token expired → redirect ke login

---

## 📝 File Explanation

### `index.html`
Entry point yang redirect based on login status.

```javascript
const token = localStorage.getItem('accessToken');
if (token) {
  window.location.href = 'dashboard.html';
} else {
  window.location.href = 'login.html';
}
```

### `login.html`
Login page dengan form validation dan error handling.

**Features:**
- Username & password input
- Form validation
- Error message display
- Demo credentials display
- Loading state pada button

### `dashboard.html`
Main dashboard dengan complete CRUD functionality.

**Features:**
- Sidebar dengan navigation
- Topbar dengan user info & logout button
- Filter & search (nama, gender)
- Table dengan pagination
- Add/Edit/Delete modal
- Responsive design

### `js/api.js`
API service layer yang handle semua HTTP calls.

**Contains:**
- `authService` - Login, logout, token management
- `absenceService` - Get, create, update, delete absences
- `apiUtils` - Helper functions (format date/time, error handling)

---

## 🔌 API Integration

### Login API Call

```javascript
await authService.login(username, password);
```

Response:
```json
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": { "id": 1, "username": "admin" }
  }
}
```

### Get Absences

```javascript
const result = await absenceService.getAll({
  page: 1,
  limit: 10,
  nama: 'John',
  jenis_kelamin: 'L'
});
```

### Create Absence

```javascript
const absence = await absenceService.create({
  nama: 'John Doe',
  alamat: 'Jl. Merdeka No. 123',
  jenis_kelamin: 'L',
  tanggal_absen: '2024-01-15',
  jam_masuk: '08:00',
  jam_keluar: '17:00'
});
```

### Update Absence

```javascript
const absence = await absenceService.update(id, {
  nama: 'Jane Doe',
  jam_masuk: '07:30'
});
```

### Delete Absence

```javascript
await absenceService.delete(id);
```

---

## 🧪 Testing

### Login Credentials
```
Username: admin
Password: admin123
```

### Test Workflow
1. Open `http://localhost:3000` in browser
2. Login dengan credentials di atas
3. Akan redirect ke dashboard
4. Try add, edit, delete absence records
5. Try filter & search
6. Check pagination
7. Click logout

---

## 🎨 Styling Features

- **Gradient colors** - Purple to blue gradient theme
- **Responsive** - Mobile-friendly design
- **Bootstrap 5** - Latest bootstrap components
- **Icons** - Bootstrap Icons untuk visual clarity
- **Animations** - Smooth transitions & hover effects
- **Form validation** - Client-side validation feedback

---

## 🔗 API Endpoints Used

```
POST   /api/auth/login              - Login
GET    /api/absences                 - Get all (with pagination/filter)
GET    /api/absences/:id             - Get single
POST   /api/absences                 - Create
PUT    /api/absences/:id             - Update
DELETE /api/absences/:id             - Delete
```

---

## 🛠️ Troubleshooting

### CORS Error?
Pastikan backend sudah setup CORS correctly:
```javascript
app.use(cors());
```

### Token expired?
Login kembali untuk mendapatkan token baru.

### API tidak terkoneksi?
Check:
1. Backend running di `http://localhost:5000`
2. API_BASE_URL di `js/api.js` correct
3. Browser console untuk error details

### Data tidak muncul?
Check:
1. Login successful (token tersimpan di localStorage)
2. API returns data (check Network tab di DevTools)
3. JavaScript console untuk error

---

## 📦 Dependencies

- **Bootstrap 5** - CSS framework (via CDN)
- **Bootstrap Icons** - Icons (via CDN)
- **Vanilla JavaScript** - No additional JS libraries

---

## 🚀 Production Deployment

1. Update `API_BASE_URL` ke production backend URL
2. Build/minify jika perlu
3. Deploy HTML files ke web server (Apache, Nginx, etc)
4. Enable HTTPS untuk production

---

## 📝 Notes

- Semua data disimpan di backend (PostgreSQL)
- Frontend hanya UI layer + API calls
- localStorage only untuk token storage (temporary)
- Responsive design support mobile, tablet, desktop
- Single page application (SPA) tanpa routing library

Good luck! 🎉
