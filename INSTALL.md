# 🚗 K & T Transport App - Installation & Setup Guide

A comprehensive lift club & commuter management system built with React, TypeScript, and Vite.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup Instructions](#detailed-setup-instructions)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Testing the Application](#testing-the-application)
- [Build for Production](#build-for-production)
- [Troubleshooting](#troubleshooting)

---

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** (comes with Node.js) or **yarn** or **pnpm**
  - Verify npm: `npm --version`

- **Git Bash** or **PowerShell** (Windows users)

---

## 🚀 Quick Start

```bash
# 1. Navigate to project directory
cd /c/Users/leehi/Downloads/k-and-t-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will open automatically at `http://localhost:3000`

---

## 📝 Detailed Setup Instructions

### Step 1: Verify Node.js Installation

```bash
node --version
# Should show v18.0.0 or higher

npm --version
# Should show v9.0.0 or higher
```

If Node.js is not installed or version is too old:
1. Visit https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Restart your terminal

### Step 2: Navigate to Project Directory

```bash
cd /c/Users/leehi/Downloads/k-and-t-app
```

### Step 3: Install Dependencies

This will install all required packages defined in `package.json`:

```bash
npm install
```

**Expected output:**
```
added XXX packages in XXs
```

**What gets installed:**
- React 18 - UI framework
- TypeScript - Type safety
- Vite - Build tool and dev server
- Tailwind CSS - Styling framework
- Radix UI - Accessible component primitives
- Lucide React - Icon library
- Recharts - Data visualization
- Sonner - Toast notifications
- And more...

### Step 4: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v6.x.x  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

The application will automatically open in your default browser!

---

## 🎮 Running the Application

### Development Mode

```bash
npm run dev
```

- Runs on `http://localhost:3000`
- Hot Module Replacement (HMR) enabled
- Instant updates when you save files
- Opens browser automatically

### Production Build

```bash
npm run build
```

Creates optimized production build in `/dist` folder.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally before deployment.

### Linting

```bash
npm run lint
```

Check code for errors and style issues.

---

## 📂 Project Structure

```
k-and-t-app/
├── components/              # All React components
│   ├── figma/              # Design system components
│   ├── layouts/            # Layout wrappers (Admin, Driver, Commuter)
│   ├── screens/            # Main screen components
│   │   ├── admin/         # Admin dashboard screens
│   │   ├── auth/          # Authentication screens
│   │   ├── commuter/      # Commuter portal screens
│   │   ├── driver/        # Driver portal screens
│   │   └── shared/        # Shared screens (Profile, Notifications)
│   └── ui/                # Reusable UI components (shadcn/ui)
├── data/                   # Mock data for development
├── styles/                 # Global CSS and Tailwind config
├── types/                  # TypeScript type definitions
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

---

## 🔐 Testing the Application

The app uses **mock authentication** - any credentials will work!

### Recommended Test Credentials

- **Email:** `test@knt.com`
- **Password:** `password`

Or use any email/password combination.

### User Roles to Test

1. **Commuter Portal**
   - Browse available trips
   - Book rides
   - View trip history
   - Manage profile

2. **Driver Portal**
   - View dashboard statistics
   - Manage trip requests
   - Add/edit vehicles
   - View earnings

3. **Admin Portal**
   - System analytics
   - User management
   - Revenue tracking
   - Occupancy rates

---

## 🏗️ Build for Production

### Create Production Build

```bash
npm run build
```

**Output:**
- Optimized files in `/dist` folder
- Minified JavaScript and CSS
- Tree-shaken dependencies
- Ready for deployment

### Preview Production Build

```bash
npm run preview
```

Test the production build locally before deploying.

### Deploy to Production

The `/dist` folder can be deployed to:
- **Vercel:** `vercel deploy`
- **Netlify:** Drag & drop `/dist` folder
- **GitHub Pages:** Configure in repository settings
- **Any static hosting service**

---

## 🐛 Troubleshooting

### Issue: `Cannot find module 'vite'`

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: `Port 3000 already in use`

**Solution 1:** Kill the process using port 3000
```bash
# Windows (PowerShell)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:3000 | xargs kill
```

**Solution 2:** Change the port in `vite.config.ts`:
```typescript
server: {
  port: 3001, // or any available port
  open: true,
}
```

### Issue: TypeScript errors in IDE

**Solution:**
1. Close and reopen VS Code
2. Reload TypeScript server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
3. Ensure all dependencies are installed: `npm install`

### Issue: Styles not loading

**Solution:**
```bash
npm install tailwindcss postcss autoprefixer tailwindcss-animate
```

### Issue: Import errors with `@` paths

**Solution:** Verify `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

And `vite.config.ts` has:
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './'),
  },
}
```

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📦 Key Technologies

- **React 18.3** - UI library
- **TypeScript 5.7** - Type safety
- **Vite 6** - Build tool & dev server
- **Tailwind CSS 3.4** - Utility-first CSS
- **Radix UI** - Accessible components
- **Lucide React** - Icon library
- **Recharts 2.15** - Charts & graphs
- **Sonner** - Toast notifications

---

## 🎨 Features

✅ **Three User Portals**
- Commuter interface for booking trips
- Driver interface for managing rides
- Admin interface for system oversight

✅ **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

✅ **Real-time Updates**
- Toast notifications
- Live data updates
- Instant feedback

✅ **Data Visualization**
- Revenue charts
- Occupancy graphs
- Analytics dashboard

✅ **Role-Based Access**
- Secure authentication flow
- Role-specific navigation
- Permission-based features

---

## 📞 Support

If you encounter issues:

1. **Check this guide's troubleshooting section**
2. **Verify Node.js version:** `node --version` (must be v18+)
3. **Clear and reinstall:** 
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
4. **Check console for errors:** Open browser DevTools (F12)

---

## 📄 Additional Documentation

- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [NAVIGATION.md](./NAVIGATION.md) - Navigation guide
- [README.md](./README.md) - Original project README

---

## 🎉 You're All Set!

Start the development server and begin exploring:

```bash
npm run dev
```

Happy coding! 🚗✨

---

**Last Updated:** November 17, 2025
