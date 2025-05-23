# Jayce Restaurant Landing Page

A modern, responsive landing page for Jayce Restaurant, featuring Asian-European fusion cuisine. Includes a beautiful menu, featured dishes, and contact information. Admin dashboard included for menu management.

---

## Features

- **Responsive Design:** Works on all devices (desktop, tablet, mobile)
- **Semantic HTML5:** Uses header, main, section, footer, etc.
- **Modern CSS:** Flexbox, Grid, CSS variables, BEM naming
- **Accessible:** Alt text, focus states, keyboard navigation
- **No JS on Landing Page:** Only used for menu rendering and admin logic
- **No external libraries** (except Font Awesome for icons)
- **Admin Dashboard:** Manage menu items (add, edit, delete) via Supabase backend

---

## Project Structure

```
day02-day05-JS-RestAPI/
├── assets/           # Images, logo, map placeholder, etc.
├── css/
│   └── style.css     # Main styles
├── js/
│   ├── script.js     # Menu rendering logic
│   └── admin.js      # Admin dashboard logic
├── backend/          # FastAPI backend (for admin)
├── index.html        # Landing page
├── admin.html        # Admin dashboard
└── README.md         # Project documentation
```

---

## Usage

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd day02-day05-JS-RestAPI
   ```

2. **Open the landing page:**
   - Open `index.html` directly in your browser, or
   - Run a local server:
     ```bash
     python -m http.server 3000
     ```
     Then visit [http://localhost:3000](http://localhost:3000)

3. **Admin Dashboard (optional):**
   - Open `admin.html` in your browser
   - Log in with your Supabase admin credentials
   - Manage menu items (requires backend and Supabase setup)

---

## Customization

- **Images:** Place your images in the `assets/` folder and update paths in HTML as needed.
- **Colors & Fonts:** Edit `css/style.css` for color variables and font settings.
- **Menu Data:** Menu is loaded dynamically via JS and backend API.

---

## Accessibility & Best Practices

- Uses semantic HTML and ARIA where needed
- All images have descriptive `alt` text
- Keyboard navigation and focus states supported
- Responsive and mobile-friendly

---

## Credits

- Design & Code: Jayce Restaurant Team
- Icons: [Font Awesome](https://fontawesome.com/)
- Images: Unsplash, Pexels, or your own assets

---

## License

MIT License

---

## Task Checklist

- [x] Semantic, accessible HTML structure
- [x] Responsive, modern CSS
- [x] Menu and featured dishes sections
- [x] Contact and footer with icons
- [x] Admin dashboard for menu management

