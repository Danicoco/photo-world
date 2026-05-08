# PhotoWorld — Photo Gallery Web Application

A photography portfolio platform built with React, allowing visitors to browse photographers and their images, with access control based on login status.

## Live Demo

> https://photo-world-delta.vercel.app/

---

## Setup Instructions

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
git clone https://github.com/Danicoco/photo-world
cd photo-world
npm install
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Approach & Key Decisions

### State Management — React Context
I choose React Context for authentication state. The app is simple enough that Zustand or Redux would be overkill. A single `AuthContext` provides `user`, `login`, `logout`, and `isLoggedIn` to the whole application tree.

### Mock Authentication
Login accepts any non-empty username/password combination.

### Access Control
Implemented at the component level in `PhotographerProfile.jsx`:
- Visitors see the first 3 images, with remaining images shown blurred and locked.
- Logged-in users see all images.
- The locked tiles give visual feedback about what they're missing, encouraging sign-in.

### Data Layer
All data lives in `src/data/mockData.js` as a plain JS array — clean, typed, and easy to swap for a real API call. Images use `picsum.photos` with deterministic seeds so they look consistent across reloads.

### Routing
React Router v6 handles two routes:
- `/` — home page with photographer grid
- `/photographer/:id` — individual profile and gallery

---

## Tradeoffs

| Decision | Alternative | Why I chose this |
|---|---|---|
| React Context | Zustand | Simpler; no extra dependency for this scope |
| Mock data file | JSON Server | No extra server process; faster setup |
| Custom lightbox | react-image-lightbox | Fewer dependencies; full control over UX |
| CSS variables | Tailwind | Tailwind adds build complexity; plain CSS is okay for this simple project |

---


## Tech Stack

- **React 18** — UI framework
- **React Router v6** — Client-side routing
- **Vite** — Build tool
- **CSS Custom Properties** — Theming (no CSS-in-JS overhead)
- **Google Fonts** — Cormorant Garamond + DM Sans
- **picsum.photos** — Placeholder images with consistent seeds