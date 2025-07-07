# 📚 Minimal Library Management System

A clean, functional, and fully responsive client-side library management system built using **React**, **Redux Toolkit Query**, and **TypeScript**. This application allows users to view, manage, and borrow books without any login or authentication. The backend is powered by **Node.js**, **Express**, **MongoDB**, and **Mongoose** with a modular MVC pattern.

---

## 🚀 Live Demo

> 🌐 Frontend: [Live Site Link](https://your-frontend-url.com)  
> 🔗 Backend API: [Live API Link](https://library-management-system-server-a3.vercel.app)  
> 📂 GitHub: [Frontend Repo](https://github.com/developersajeeb/Library-Management-System-client) | [Backend Repo](https://github.com/developersajeeb/Library-Management-System-server-A3)

---

## 📌 Features

### 1. Public Access
- No authentication required.
- Open access to all pages and actions.

### 2. Book Management 🛠️
- View all books in a clean tabular layout.
- Add new books via a structured form.
- Edit or delete existing books.
- Borrow books directly from the table.
- Automatically mark books as **Unavailable** when copies = 0.

### 3. Borrowing System 📖
- Borrow books with a due date and quantity input.
- Validations to prevent borrowing more than available.
- Successful borrow redirects to summary page.

### 4. Borrow Summary 📊
- Aggregated view of total borrowed quantities by book.
- Shows book title, ISBN, and borrowed count.

### 5. Minimal UI/UX ✨
- Clean and responsive interface using **Tailwind CSS**.
- Clear navigation and form structure.
- Fully mobile-responsive design.

---

## 🗂️ Page Routes

| Path | Description |
|------|-------------|
| `/books` | List of all books with actions |
| `/create-book` | Add new book form |
| `/books/:id` | Single book detailed view |
| `/edit-book/:id` | Edit form for existing book |
| `/borrow/:bookId` | Borrow form for selected book |
| `/borrow-summary` | Aggregated borrow summary |

---

## ⚙️ Technologies Used

| Layer | Technology |
|-------|------------|
| Frontend | React + TypeScript + Shadcn Ui + Tailwind |
| State Management | Redux Toolkit + RTK Query |
| Styling | Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |

---

## 🧠 Business Logic

- **Books** with 0 copies are automatically **unavailable**.
- Borrowing updates the available copies in real-time.
- Borrow quantity must be less than or equal to available stock.
- CRUD operations include success/failure UI feedback.

---

## 📦 Backend API Overview

### Endpoints
- `GET /books` - Get all books (with pagination)
- `POST /books` - Create a new book
- `GET /books/:id` - Get single book
- `PUT /books/:id` - Update book
- `DELETE /books/:id` - Delete book

- `POST /borrow` - Borrow a book
- `GET /borrow-summary` - Aggregated borrow stats

### Backend Stack
- Node.js + Express
- MongoDB + Mongoose
- Modular MVC Pattern
- Error Handling Middleware
- Optional JWT Auth Middleware
