# Developer Portfolio - Tamil Selvan R

A production-ready, single-page developer portfolio built with Next.js 14+, TypeScript, Tailwind CSS, and Firebase. This project combines a **Neo-Brutalist** public aesthetic with a **Professional Corporate** admin interface, featuring immersive developer-themed interactions like a coding splash screen and CLI-style 404 page.

## 🚀 Features

### Public Interface
- **🎨 Neo-Brutalist Design**: distinct, bold aesthetic with sharp edges and high contrast.
- **🖥️ Coding Splash Screen**: immersive "system boot" loading animation that simulates code compilation (2-4s duration).
- **🖱️ Custom Cursor**: interactive cursor element for a polished feel.
- **📊 Real-time Stats**: fetches live GitHub data (repos, stars, followers) via API.
- **🚫 CLI 404 Page**: custom "runtime error" page resembling a VS Code environment with terminal output.

### Admin Dashboard (`/admin`)
- **🏢 Corporate UI**: clean, professional interface for content management (distinct from public site).
- **📂 Project Management**:
  - **Drag-and-Drop Reordering**: easily arrange portfolio items.
  - **Image Upload**: drag-and-drop support for project thumbnails.
  - **CRUD Operations**: full control over project details.
- **📨 Message Center**: view and manage contact form submissions.
- **🔒 Secure Access**: protected by Firebase Authentication.

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Deployment**: Vercel

## 📂 Project Structure

```bash
portfolio/
├── app/
│   ├── admin/          # Protected admin routes (Corporate UI)
│   ├── api/            # Server-side API routes
│   ├── login/          # Admin authentication
│   ├── loading.tsx     # "Compiling" splash screen
│   ├── not-found.tsx   # "VS Code" style error page
│   └── page.tsx        # Main portfolio page
├── components/
│   ├── admin/          # Admin-specific components (ImageUpload, etc.)
│   └── ...             # Public UI components
├── lib/                # Firebase & utility functions
└── public/             # Static assets
```

## ⚡ Getting Started

### 1. Installation

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
npm install
```

### 2. Environment Setup

Create a `.env.local` file with your Firebase and GitHub credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# GitHub API (for stats)
GITHUB_USERNAME=...
GITHUB_TOKEN=...
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🔑 Admin Setup

1.  **Create Account**: Sign up via the `/login` page.
2.  **Set Admin Role**:
    - Go to your Firestore Console.
    - Find the `users` collection.
    - Set the `role` field of your user document to `"admin"`.
3.  **Access Dashboard**: Navigate to `/admin` to manage your portfolio content.

## 📄 License

MIT License.

---
*Built by Tamil Selvan R*
