# Firebase Setup for Projects

## Quick Setup Steps

1. **Create Firebase Project**
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow setup wizard

2. **Enable Firestore Database**
   - In Firebase Console, go to "Firestore Database"
   - Click "Create database"
   - Start in **test mode**

3. **Enable Firebase Storage**
   - Go to "Storage" in Firebase Console
   - Click "Get started"
   - Start in **test mode**

4. **Get Firebase Configuration**
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps"
   - Click web app icon (</>)
   - Copy the firebaseConfig values

5. **Add to .env.local**
   - Copy `.env.local.example` to `.env.local`
   - Replace placeholder values with your Firebase config

6. **Test the App**
   ```bash
   npm run dev
   
   # Admin panel
   http://localhost:3000/admin/projects
   
   # Main portfolio
   http://localhost:3000
   ```

7. **Create Admin Account**
   - Go to **Firebase Console** > **Authentication**
   - Click **"Get started"** if not enabled
   - Enable **"Email/Password"** sign-in method
   - Go to **"Users"** tab
   - Click **"Add user"**
   - Enter your desired **Email** and **Password**
   - Use these credentials to login at `/login`

## Firestore Structure

Collection: `projects`

Document fields:
- `title` (string)
- `description` (string)
- `technologies` (array of strings)
- `githubUrl` (string)
- `liveUrl` (string)
- `imageUrl` (string)
- `featured` (boolean)
- `order` (number)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## Storage Structure

```
/projects/{projectId}/{imageName}
```

## Important Notes

- The app works with fallback data if Firebase is not configured
- Admin panel is accessible without authentication (add auth later)
- Images are stored in Firebase Storage
- All changes sync in real-time
