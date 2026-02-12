# Quick Start Guide

## Installation

```bash
cd portfolio-neobrutalist
npm install
```

## Environment Setup

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

## Firebase Setup

1. Create Firebase project
2. Enable Authentication (Email/Password)
3. Enable Firestore
4. Add config to `.env.local`

## Create Admin User

1. Run `npm run dev`
2. Sign up via SIGN IN button
3. In Firebase Console → Firestore:
   - Create `users` collection
   - Add document with your UID
   - Set `role: "admin"`

## Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

## Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
git push
# Then import in Vercel dashboard
```

## Features

✅ Neo-Brutalist design with beige/black sections  
✅ Custom cursor with hover effects  
✅ Firebase Auth + Firestore  
✅ Real GitHub API stats  
✅ Admin dashboard at `/admin`  
✅ Contact form with Firestore  
✅ Testimonials management  
✅ Fully responsive  

## Admin Access

Visit `/admin` after signing in with admin role.

## Customization

- Update bio in `components/About.tsx`
- Add projects in `components/SelectedWorks.tsx`
- Modify experience in `components/Experience.tsx`
- Set GitHub username in `.env.local`
