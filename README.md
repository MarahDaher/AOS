# 🚀 AOS Fullstack Project (Backend + Frontend)

---

## 📚 Overview

This project is a fullstack application for managing offers, users, raw materials, and exporting documents.  
The system consists of:

- A **Laravel backend** (API server)
- A **React + Vite + Shadcn frontend** (user interface)

---

## 🖌️ Technology Stack

| Part     | Technologies                       |
| -------- | ---------------------------------- |
| Backend  | Laravel, MySQL                     |
| Frontend | React, Vite, Shadcn UI, Axios, MUI |

---

## 🏠 System Architecture

```plaintext
[React Frontend]  -->  [Laravel Backend API]  -->  [MySQL Database]
```

- Frontend communicates with the backend over **REST API**.
- Backend handles business logic, permissions, export generation, etc.

---

## 🛠 Project Setup Instructions

### Backend (Laravel)

```bash
cd backend/
composer install
cp .env.example .env
# Edit .env file (database connection)
php artisan migrate --seed
php artisan sync:offer-statuses
php artisan serve
```

### Frontend (React + Vite)

```bash
cd frontend/
npm install
cp .env.example .env
# Edit .env file (API URL)
npm run dev
```

---

## ⚡ Available Scripts

### Backend

| Command                           | Purpose                         |
| --------------------------------- | ------------------------------- |
| `php artisan migrate --seed`      | Migrate and seed database       |
| `php artisan sync:offer-statuses` | Sync offer statuses from config |
| `php artisan serve`               | Start Laravel server            |

### Frontend

| Command         | Purpose                        |
| --------------- | ------------------------------ |
| `npm run dev`   | Start local development server |
| `npm run build` | Build project for production   |
| `npm run lint`  | Lint the code with ESLint      |

---

## 📂 Folder Structure

```bash
backend/
├── app/
├── config/
├── database/
├── routes/
└── ...

frontend/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   │   ├── Auth/
│   │   ├── Errors/
│   │   ├── Offers/
│   │   │   ├── FormSections/
│   │   │   ├── Tabs/
│   │   └── Users/
│   ├── shared/
│   ├── App.tsx
│   ├── main.tsx
├── public/
└── ...
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=aos_backend
DB_USERNAME=root
DB_PASSWORD=
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000/api
```

---

## 🔗 API Communication

- Frontend uses **Axios** (`src/api/`) to make requests to the backend.
- Auth, Offers, Raw Materials, and Additives are managed via secured APIs.
- Tokens are handled through the API headers if necessary.

---

## 📝 Word Export & Config Management

- **Word Export**:  
  Dynamic Word template export handled via `config/offer_word_export.php`.  
  Placeholder fields are mapped to model fields automatically.
- **Offer Status Management**:  
  Offer statuses and field permissions are configured in `config/offer_statuses.php`.  
  No database changes needed manually.

- **Offer Drawings Storage**:  
  Controlled through `config/offer_drawings.php` without needing `.env` values.

---

## 👤 Default Users

| Role       | Email              | Password |
| ---------- | ------------------ | -------- |
| Admin      | admin@aos.com      | 123123   |
| Sales      | sales@aos.com      | 123123   |
| Production | production@aos.com | 123123   |

---

## 📋 Notes

- UI built with **Shadcn UI** and **MUI** for modularity and speed.
- Backend is fully modular, using Laravel best practices.
- Config-driven architecture: no need for code changes when adding new statuses, export fields, or storage paths.
- ESLint and Prettier (optional) are enforced in frontend for clean code.
- Docker setup can be added in future to automate MySQL and phpMyAdmin.

---

# ✅ Everything is Ready to Go!

> Developed with ❤️ by the AOS team using Laravel + React + Shadcn + Vite.

---
