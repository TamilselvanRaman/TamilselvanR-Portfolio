# Neo-Brutalist Developer Portfolio

A production-ready, single-page developer portfolio built with Next.js 14+, TypeScript, Tailwind CSS, and Firebase. Features a dark cyberpunk Neo-Brutalist aesthetic with real-time GitHub stats integration and admin dashboard.

## Features

- 🎨 **Neo-Brutalist Design** - Sharp edges, heavy borders, alternating beige/black sections
- 🔥 **Firebase Integration** - Authentication, Firestore database, hosting-ready
- 📊 **Real GitHub Stats** - Live repository, stars, and follower counts via GitHub API
- 🔐 **Admin Dashboard** - Protected route for managing messages and testimonials
- 📱 **Fully Responsive** - Mobile-first design with custom cursor on desktop
- ⚡ **Next.js 14+** - App Router, Server Components, API Routes
- 🎯 **TypeScript** - Full type safety throughout

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth + Firestore)
- **API**: GitHub REST API
- **Deployment**: Vercel / Firebase Hosting

## Project Structure

```
portfolio-neobrutalist/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── admin/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── api/
│       └── github/
│           └── route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── TechStack.tsx
│   ├── Experience.tsx
│   ├── CodingStats.tsx
│   ├── SelectedWorks.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   ├── CustomCursor.tsx
│   └── AuthModal.tsx
├── lib/
│   ├── firebase.ts
│   └── github.ts
├── middleware.ts
└── firestore.rules
```

## Installation

### 1. Clone and Install Dependencies

```bash
cd portfolio-neobrutalist
npm install
```

### 2. Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** (Email/Password provider)
3. Enable **Firestore Database**
4. Copy your Firebase config

### 3. Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

GITHUB_USERNAME=your_github_username
GITHUB_TOKEN=your_github_personal_access_token
```

### 4. Create Admin User

1. Run the development server
2. Sign up a user via the SIGN IN button
3. In Firebase Console, go to Firestore Database
4. Create a `users` collection
5. Add a document with:
   - Document ID: `[user's UID from Authentication]`
   - Fields:
     - `email`: admin email
     - `role`: "admin"

### 5. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Firebase Hosting

```bash
npm run build
firebase init hosting
firebase deploy
```

## Firestore Collections

### `users`
```typescript
{
  uid: string;
  email: string;
  role: "admin" | "user";
}
```

### `messages`
```typescript
{
  name: string;
  email: string;
  projectDetails: string;
  createdAt: Timestamp;
}
```

### `testimonials`
```typescript
{
  client: string;
  rating: number;
  message: string;
  createdAt: Timestamp;
}
```

## Admin Dashboard

Access at `/admin` (requires admin role)

Features:
- View all contact form submissions
- Delete messages
- Add/edit/delete testimonials
- Overview statistics

## GitHub API

The portfolio fetches real-time stats:
- Total repositories
- Total stars across all repos
- Followers
- Following

Data is cached for 1 hour using Next.js `revalidate`.

## License

MIT

## Author

Tamil Selvan R - Full Stack Developer
