# B-Mart Billing & Invoice System

> A browser-based point-of-sale and invoicing tool built for a local retail store (B-Mart Big Bazar): barcode-driven billing, saved invoices with searchable history, staff accounts and an admin panel — a static front end on **Firebase Firestore**, no server to maintain.

[![Open the app](https://img.shields.io/badge/Open-GitHub%20Pages-181717?style=for-the-badge&logo=github&logoColor=white)](https://ppro916.github.io/B-Mart-Invoice/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-Firestore%209.23-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Live app:** <https://ppro916.github.io/B-Mart-Invoice/> — the app asks for a staff username and password that are stored in the store's own Firestore database, so the live deployment cannot be used without credentials. Run it against your own Firebase project (see [Getting started](#getting-started)).

## Screenshots

Captured at 1280×800 from a local run. The three invoice rows are **sample data injected for the screenshot** (login was skipped because the real store database is private).

| Billing screen | Add a product |
| --- | --- |
| ![Billing screen](docs/screenshots/billing-screen.png) | ![Add item dialog](docs/screenshots/add-item.png) |

## Features

- **Barcode billing** — type or scan a barcode, press Enter and the product is fetched from Firestore and added to the bill; scanning it again increases the quantity.
- **Live bill table** — +/− and numeric quantity controls, delete with confirmation, running total of the store's selling price (MRP column vs. store rate shown per line).
- **Save invoice** — stores the items, staff name and timestamp in Firestore with an automatic bill number in the form `dd-mm-yyyy-001`, `…-002`, …
- **Invoice history** — searchable list (by date `dd-mm-yyyy` or bill number), newest first, with expandable item details.
- **Add products on the fly** — popup form that writes a new product (name, barcode, weight, company MRP, store rate) to Firestore, refusing duplicate barcodes.
- **Staff login** — staff sign in with a username and password checked against Firestore; the billing staff name is printed on the bill.
- **Admin panel** — register counter users, list all users and view per-user entry/exit counts from the activity log.
- **Built-in calculator** popup for quick sums at the counter.
- **Branded splash screen** — progress-bar loader that redirects to the billing page.

## Tech stack

| Area | Tools |
| --- | --- |
| Front end | HTML5, CSS3, vanilla JavaScript (no build step) |
| Data | Firebase Firestore (JS SDK 9.23.0 compat build from the Google CDN) |
| Hosting | GitHub Pages (static) |

## How it works

```mermaid
flowchart LR
  I[index.html<br/>splash] -->|3 s redirect| B[invoice.html<br/>billing screen]
  B -->|prompt login| F[(Firestore)]
  B -->|barcode lookup / add product| F
  B -->|save invoice| F
  B -->|Invoices button| L[invoices-list.html<br/>search + details]
  L --> F
  B -->|Admin Panel + password| A[admin.html<br/>staff + logs]
  A --> F
```

| Firestore collection | Used for |
| --- | --- |
| `staff/{username}` | Counter users (`name`, `username`, `password`) — read by the login prompt, written by the admin panel |
| `products/{barcode}` | Product catalogue (`name`, `weight`, `cmrp`, `ymrp`) |
| `invoices/{auto-id}` | Saved bills (`billNo`, `date`, `createdAt`, `staff`, `items[]`) |
| `usersLog/{username}` | Per-day entry/exit log shown in the admin panel |

## Getting started

```bash
git clone https://github.com/ppro916/B-Mart-Invoice.git
cd B-Mart-Invoice
python3 -m http.server 8000      # then open http://localhost:8000
```

To use your own data:

1. Create a Firebase project and enable **Cloud Firestore**.
2. Replace the `firebaseConfig` object in `invoice.html`, `admin.html` and `invoices-list.html` with your project's web config.
3. Create the `staff` and `products` collections (the admin panel can create staff users).

## Configuration

This is a static site, so there are no server environment variables. Admin access is configured in [`config.js`](config.js):

| Setting | Description |
| --- | --- |
| `adminPasswordSha256` | SHA-256 hex digest of the password for the **Admin Panel** button. Create it with `printf '%s' 'your-long-passphrase' \| sha256sum`. Leave it empty to disable the shortcut. |

> The Firebase **web** config (API key, project id, …) is public by design; what protects the data are your **Firestore security rules**. Make sure they are locked down before using real data.

## Known limitations

- Authentication is a lightweight, client-side check (staff passwords are compared in the browser with documents in Firestore). For production use, move to **Firebase Authentication** with strict Firestore security rules and never store plain-text passwords.
- The admin shortcut in `config.js` is only a UI gate for the same reason.
- `login.html` is an earlier, unfinished login page and is not part of the current flow (the splash screen opens `invoice.html`, which asks for credentials itself).

## Roadmap

- [ ] Migrate staff sign-in to Firebase Authentication and add Firestore security rules
- [ ] Printable / PDF invoice layout
- [ ] Escape user-provided text before rendering and replace the calculator's `eval`
- [ ] Daily sales summary from saved invoices

## Author

**Moreshwar Bhonde** — AI & Data Science engineering student, AI-first developer, founder of AI Nexus × Neon AI Studio.

- GitHub: [@ppro916](https://github.com/ppro916)
- Website: [neonaistudio.in](https://neonaistudio.in)

## License

[MIT](LICENSE)
