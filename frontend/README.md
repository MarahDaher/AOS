# 🚀 AOS Frontend - React + Vite + Shadcn Project

---

## 📚 Overview

This is the frontend application for the AOS Project, built with **React**, **Vite**, **TypeScript**, and **Shadcn/UI**.
It communicates with the Laravel backend using **REST API** endpoints.

---

## 🛠 Project Setup

1. Clone the repository.
2. Navigate to the `frontend` directory:

```bash
cd frontend
```

3. Install project dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

---

## ⚡ Available Scripts

| Command           | Purpose                          |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start local development server   |
| `npm run build`   | Build the project for production |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Lint the code using ESLint       |

---

## 📂 Folder Structure

```bash
frontend/
├── public/            # Static public files (index.html)
├── src/
│   ├── api/           # Axios API communication
│   ├── assets/        # Static assets like images, icons
│   ├── components/    # Reusable UI components (using Shadcn/UI)
│   ├── pages/         # Application pages
│   │   ├── Auth/      # Login, authentication pages
│   │   ├── Errors/    # Error pages (404, etc.)
│   │   ├── Offers/    # Offer-related pages and forms
│   │   │   ├── FormSections/
│   │   │   │   ├── BasicData/
│   │   │   │   ├── Calculation/
│   │   │   │   ├── Prices/
│   │   │   │   └── ProcessSheet/
│   │   │   ├── Tabs/
│   │   │   │   ├── BasicData.tsx
│   │   │   │   ├── Calculation.tsx
│   │   │   │   ├── Drawing.tsx
│   │   │   │   ├── Prices.tsx
│   │   │   │   └── ProcessSheet.tsx
│   │   │   ├── DrawingForm.tsx
│   │   │   ├── OfferForm.tsx
│   │   │   ├── Offers.tsx
│   │   │   └── Columns.tsx
│   │   └── Users/      # User management pages
│   ├── shared/         # Shared components, hooks, or context
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Entry point
├── .env                # Environment variables
├── vite.config.ts      # Vite configuration
├── eslint.config.js    # ESLint configuration
├── index.html          # HTML template
└── README.md           # Project README
```

---

## 👩‍💻 Technologies Used

- **React 18**
- **Vite**
- **TypeScript**
- **Shadcn/UI** (built on top of TailwindCSS)
- **Axios** (for API calls)
- **React Router Dom** (for routing)
- **ESLint** (code linting)

---

## 🔧 Environment Variables

Make sure you have a `.env` file in the `frontend/` directory with:

```bash
VITE_API_URL=http://localhost:8000/api
```

Adjust the `VITE_API_URL` according to your backend server address.

---

## 🔗 API Communication

- API calls are centralized in `src/api/`.
- Axios instances are used for authentication tokens, error handling, and general requests.
- Example: Login, CRUD Offers, Fetch Users, etc.

---

## 🛠 Additional Notes

- UI components follow **Shadcn/UI** standards and best practices.
- Forms and pages are split cleanly into **Tabs** and **FormSections** for modularity.
- Project uses **ESLint** for code style checking.
- Prettier can be added optionally if needed.

---

# ✅ Ready to Start Building!

---

> Developed with ❤️ using React, Vite, Shadcn, and Laravel backend.
