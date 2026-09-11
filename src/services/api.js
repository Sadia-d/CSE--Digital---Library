const SERVER_URL = "https://cub-project-i5q4.onrender.com";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${SERVER_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || data.error || `Request failed: ${response.status}`
    );
  }

  return data;
}

/* ================= AUTH ================= */

export async function registerUser(userData) {
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function loginUser(userData) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function getProfile() {
  return request("/api/auth/profile");
}

export async function updateProfile(userData) {
  return request("/api/auth/profile", {
    method: "PUT",
    body: JSON.stringify(userData),
  });
}

/* ================= BOOKS ================= */

export async function getBooks() {
  return request("/api/books");
}

export async function getPopularBooks() {
  return request("/api/books/popular");
}

export async function getBook(id) {
  return request(`/api/books/${id}`);
}

/* ================= SUBJECTS ================= */

export async function getSubjects() {
  return request("/api/subjects");
}

export async function getSubject(id) {
  return request(`/api/subjects/${id}`);
}

/* ================= RESOURCES ================= */

export async function getResources() {
  return request("/api/resources");
}

export async function getRecentResources() {
  return request("/api/resources/recent");
}

export async function getResource(id) {
  return request(`/api/resources/${id}`);
}

/* ================= BOOKMARKS ================= */

export async function getBookmarks() {
  return request("/api/bookmarks");
}

export async function addBookmark(bookId) {
  return request("/api/bookmarks", {
    method: "POST",
    body: JSON.stringify({
      bookId,
    }),
  });
}

export async function deleteBookmark(id) {
  return request(`/api/bookmarks/${id}`, {
    method: "DELETE",
  });
}

/* ================= REVIEWS ================= */

export async function getMyReviews() {
  return request("/api/reviews/mine");
}

export async function addReview(bookId, reviewData) {
  return request(`/api/reviews/${bookId}`, {
    method: "POST",
    body: JSON.stringify(reviewData),
  });
}

export async function deleteReview(id) {
  return request(`/api/reviews/${id}`, {
    method: "DELETE",
  });
}

/* ================= SEARCH ================= */

export async function searchBooks(query) {
  return request(`/api/search?q=${encodeURIComponent(query)}`);
}

export { SERVER_URL };