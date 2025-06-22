# 🚀 AOS Backend - Laravel Project

---

## 📚 Overview

-   [Project Setup](#-project-setup)
-   [Artisan Useful Commands](#⚡%ef%b8%8f-artisan-useful-commands)
-   [Roles and Permissions](#-roles-and-permissions)
-   [Offer Statuses Management](#-offer-statuses-management)
-   [Word Export Configuration](#-word-export-configuration)
-   [Offer Drawings Configuration](#-offer-drawings-configuration)
-   [Offer Deletion Policy](#-offer-deletion-policy)
-   [API Overview](#-api-overview)
-   [Folder Structure](#-folder-structure)
-   [Default Users](#-default-users)

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
php artisan storage:link
php artisan jwt:secret

```

6. Start the development server:

```bash
php artisan serve
```

---

## ⚡️ Artisan Useful Commands

| Command                           | Purpose                              |
| --------------------------------- | ------------------------------------ |
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

## 📜 Word Export Configuration

> 📝 Word export now pulls data **directly from the `offers_calculated_wordexport` database view**, making the system more dynamic and easier to extend.

### ✅ How does it work now?

-   Word placeholders like `${general_offer_number}`, `${general_color}`, `${_ingredients_concatenated}` are directly matched with fields from the **`offers_calculated_wordexport` view**.
-   The data is loaded using a dedicated model: `App\Models\OfferCalculatedWordExport`.
-   This view is automatically updated via a database migration (`CreateOffersCalculatedWordExportView`).
-   The current date is still inserted into `${TODAY()}`.

### ✅ How to update the fields used in export?

1. Open the SQL view logic in:

    ```
    database/migrations/xxxx_xx_xx_create_offers_calculated_wordexport_view.php
    ```

2. Update the `SELECT` fields or computed columns as needed. For example:

```sql
SELECT
    oc.general_offer_number,
    oc.general_color,
    ...
    (
      SELECT GROUP_CONCAT(...) FROM ...
    ) AS _ingredients_concatenated
FROM offers_calculated oc
```

3. Run the migration again or re-run the view creation manually using:

```bash
php artisan migrate:refresh

```

4. Update the Word `.docx` template placeholders to match the exact field names (e.g., `${general_offer_number}`).

---

### ⚠️ Placeholder Naming Rules

-   All placeholders in the `.docx` template **must exactly match** the view field names.
-   Placeholders are **case-sensitive** (e.g., `${general_color}` ≠ `${GENERAL_COLOR}`).
-   Ensure the placeholders are not split or formatted across lines in Word.

---

### ✅ Template Path

The Word template file path is still defined via:

```php
'template_path' => 'app/templates/Angebot Vorlage AOS.docx',
```

in:

```
config/offer_word_export.php
```

No changes are needed here unless you want to use a different template file.

---

## 🖌️ Offer Drawings Configuration

> 📝 Offer drawing storage path is managed dynamically via `config/offer_drawings.php`.

### How does it work?

-   The `config/offer_drawings.php` file defines the base storage path for offer drawing files.
-   The `base_path` value is set **directly in the config file** without reading from `.env`.

Example:

```php
<?php

return [
    'base_path' => 'offer_drawings',
];
```

-   This ensures a clean and environment-independent setup.
-   Clients can update the storage path by editing the config file without touching `.env`.

---

## ❌ Offer Deletion Policy

-   **Never hard delete** an offer from the database.
-   Instead, set the `general_status_id` to the "Gelöscht" (Deleted) status.
-   This ensures that the offer remains archived and traceable.

---

## 📚 API Overview

| API Group       | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `Auth`          | Login, Get Me, Get User Permissions                           |
| `Users`         | CRUD operations on users                                      |
| `Roles`         | View roles and their details                                  |
| `Offers`        | CRUD offers, duplicate, export, manage drawing, raw materials |
| `Raw Materials` | CRUD raw materials                                            |
| `Additives`     | Manage additives for raw materials                            |
| `Offer Status`  | Fetch available offer statuses                                |

---

## 🪰 Folder Structure

| Folder      | Purpose                                   |
| ----------- | ----------------------------------------- |
| `app/`      | Core logic: controllers, models, services |
| `routes/`   | API and Web routes                        |
| `config/`   | Project configuration                     |
| `database/` | Migrations, seeders                       |
| `public/`   | Public assets                             |
| `storage/`  | Logs, cache, uploaded files               |

---

## 👤 Default Users

| Role       | Email                                           | Password |
| ---------- | ----------------------------------------------- | -------- |
| Admin      | [admin@aos.com](mailto:admin@aos.com)           | 123123   |
| Sales      | [sales@aos.com](mailto:sales@aos.com)           | 123123   |
| Production | [production@aos.com](mailto:production@aos.com) | 123123   |

---

# ✅ Everything is Ready to Go!

> Developed with ❤️ using Laravel + MySQL.

---
