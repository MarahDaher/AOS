# 🚀 AOS Backend - Laravel Project

---

## 🛠 Project Setup

1. Clone the repository.
2. Install dependencies:

```bash
composer install
npm install
npm run dev
```

3. Setup the environment:

```bash
cp .env.example .env
```

4. Configure `.env` database connection.
5. Run migrations and seeders:

```bash
php artisan migrate --seed
php artisan sync:offer-statuses
```

6. Start the development server:

```bash
php artisan serve
```

---

## ⚙️ Artisan Useful Commands

| Command                           | Purpose                              |
| :-------------------------------- | :----------------------------------- |
| `php artisan migrate --seed`      | Fresh migrate and seed database      |
| `php artisan sync:offer-statuses` | Sync offer statuses from config file |
| `php artisan cache:clear`         | Clear application cache              |
| `php artisan config:clear`        | Clear config cache                   |

---

## 📋 Roles and Permissions

-   **Admin**: View and edit everything.
-   **Sales**:
    -   View everything.
    -   Edit Tab 1-4 based on offer status:
        -   `null` or `Vorkalkulation`: Full edit allowed.
        -   `Angebot`: Only `general_status` and `general_order_number` editable.
        -   `Auftrag`, `Produziert`: Only `general_status` editable.
        -   `Versandt`: Cannot edit anything.
-   **Production**:
    -   View everything.
    -   Edit only Tab 5 (Running Card section), unless status is `Versandt` (no editing allowed).

---

## 📄 Offer Statuses Management

> 📝 Statuses are managed dynamically via `config/offer_statuses.php`

### How to update offer statuses?

1. Edit `config/offer_statuses.php`:

    - Update the `statuses` array (add, rename, remove statuses).
    - Update `editable_fields` per role and status.

2. Sync with database:

```bash
php artisan sync:offer-statuses
```

No manual database changes needed anymore! 🚀

---

## ❌ Offer Deletion Policy

    1. Never hard delete an offer from the database.

    2. Instead, set the general_status_id to the "Gelöscht" (Deleted) status.

    3. This ensures that the offer remains archived and traceable.

## 📚 API Overview

| API Group       | Description                                                   |
| :-------------- | :------------------------------------------------------------ |
| `Auth`          | Login, Get Me, Get User Permissions                           |
| `Users`         | CRUD operations on users                                      |
| `Roles`         | View roles and their details                                  |
| `Offers`        | CRUD offers, duplicate, export, manage drawing, raw materials |
| `Raw Materials` | CRUD raw materials                                            |
| `Additives`     | Manage additives for raw materials                            |
| `Offer Status`  | Fetch available offer statuses                                |

---

## 🧩 Folder Structure

| Folder      | Purpose                                   |
| :---------- | :---------------------------------------- |
| `app/`      | Core logic: controllers, models, services |
| `routes/`   | API and Web routes                        |
| `config/`   | Project configuration                     |
| `database/` | Migrations, seeders                       |
| `public/`   | Public assets                             |
| `storage/`  | Logs, cache, uploaded files               |

---

## 👤 Default Users

| Role       | Email              | Password |
| :--------- | :----------------- | :------- |
| Admin      | admin@aos.com      | 123123   |
| Sales      | sales@aos.com      | 123123   |
| Production | production@aos.com | 123123   |

---

# ✅ Everything is Ready to Go!

> Developed with ❤️ using Laravel + MySQL.

---
