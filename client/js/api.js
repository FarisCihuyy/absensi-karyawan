// js/api.js
const API_BASE_URL = "http://localhost:5000/api";

const authService = {
  login: async (username, password) => {
    console.log(username, password);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Store tokens
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.data.user));

    return data.data;
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  isLoggedIn: () => {
    return !!localStorage.getItem("accessToken");
  },

  getToken: () => {
    return localStorage.getItem("accessToken");
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

// ============================================
// ABSENCE SERVICE
// ============================================

const absenceService = {
  // Get all absences with pagination, sorting, filtering
  getAll: async (params = {}) => {
    const {
      page = 1,
      limit = 10,
      sortBy = "created_at",
      sortOrder = "desc",
      nama = "",
      jenis_kelamin = "",
    } = params;

    const queryParams = new URLSearchParams();
    queryParams.append("page", page);
    queryParams.append("limit", limit);
    queryParams.append("sortBy", sortBy);
    queryParams.append("sortOrder", sortOrder);

    if (nama) queryParams.append("nama", nama);
    if (jenis_kelamin) queryParams.append("jenis_kelamin", jenis_kelamin);

    const response = await fetch(`${API_BASE_URL}/absences?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch absences");
    }

    return data.data;
  },

  // Get single absence by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/absences/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch absence");
    }

    return data.data;
  },

  // Create new absence
  create: async (absenceData) => {
    const response = await fetch(`${API_BASE_URL}/absences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authService.getToken()}`,
      },
      body: JSON.stringify(absenceData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create absence");
    }

    return data.data;
  },

  // Update absence by ID
  update: async (id, absenceData) => {
    const response = await fetch(`${API_BASE_URL}/absences/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authService.getToken()}`,
      },
      body: JSON.stringify(absenceData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update absence");
    }

    return data.data;
  },

  // Delete absence by ID
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/absences/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete absence");
    }

    return data;
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const apiUtils = {
  // Format date untuk display
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  // Format time dari HH:mm:ss ke HH:mm
  formatTime: (timeString) => {
    return timeString.substring(0, 5);
  },

  // Handle error response
  handleError: (error) => {
    console.error("API Error:", error);
    alert(error.message || "Terjadi kesalahan");
  },
};

// Export untuk digunakan di file lain
// (jika menggunakan module system, gunakan export di atas)
