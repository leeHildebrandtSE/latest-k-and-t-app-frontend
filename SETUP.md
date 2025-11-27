# K & T Transport App - Setup & Run Instructions

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**

Check your installations:
```bash
node --version
npm --version
```

## 🚀 Quick Start

### Step 1: Fix Import Statements

First, we need to remove version numbers from import statements. Run this PowerShell script:

```powershell
powershell -ExecutionPolicy Bypass -File fix-imports.ps1
```

Or manually run this command in PowerShell:
```powershell
Get-ChildItem -Path . -Recurse -Include "*.tsx","*.ts" | ForEach-Object { (Get-Content $_.FullName -Raw) -replace '@(\d+\.\d+\.\d+)"', '"' -replace '@(\d+\.\d+\.\d+);', ';' | Set-Content $_.FullName -NoNewline }
```

### Step 2: Install Dependencies

Navigate to the project directory and install all required packages:

```bash
npm install
```

Or if you prefer yarn:
```bash
yarn install
```

Or with pnpm:
```bash
pnpm install
```

### Step 3: Run the Development Server

Start the development server:

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

Or with pnpm:
```bash
pnpm dev
```

The application will automatically open in your default browser at `http://localhost:3000`

## 🔐 Logging In

The app uses **mock authentication**. You can log in with any credentials!

**Quick Test Credentials:**
- Email: `test@knt.com`
- Password: `password`

> **Note:** Any email/password combination will work for testing purposes.

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```
k-and-t-app/
├── components/           # React components
│   ├── layouts/         # Layout components for different user roles
│   ├── screens/         # Screen components (admin, auth, commuter, driver, shared)
│   └── ui/              # Reusable UI components (shadcn/ui)
├── data/                # Mock data
├── styles/              # Global CSS styles
├── types/               # TypeScript type definitions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.html           # HTML template
```

## 🎯 User Roles

The application supports three user roles:

1. **Commuter** - Book and manage trips
2. **Driver** - Create trips, manage vehicles, accept bookings
3. **Admin** - System oversight, analytics, user management

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📦 Key Dependencies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Recharts** - Charts and data visualization
- **Sonner** - Toast notifications

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration

## 🐛 Troubleshooting

### Import errors with version numbers

If you see import errors with version numbers (e.g., `@radix-ui/react-slot@1.1.2`), run the fix-imports script:

```powershell
powershell -ExecutionPolicy Bypass -File fix-imports.ps1
```

### Port already in use

If port 3000 is already in use, you can change it in `vite.config.ts`:

```typescript
server: {
  port: 3001, // Change to your preferred port
  open: true,
}
```

### Module not found errors

Delete `node_modules` and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📱 Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Role-based Access** - Different interfaces for commuters, drivers, and admins
- **Real-time Updates** - Mock real-time notifications and updates
- **Data Visualization** - Charts and analytics for admins and drivers
- **Trip Management** - Full trip lifecycle from creation to completion
- **User Management** - Admin tools for managing users and vehicles

## 🎨 Customization

### Styling

The app uses Tailwind CSS. Customize the theme in `tailwind.config.js` and CSS variables in `styles/globals.css`.

### Mock Data

Modify mock data in `data/mockData.ts` to test different scenarios.

## 📄 License

This project is for educational and demonstration purposes.

## 🤝 Support

If you encounter any issues, please check the troubleshooting section above or review the configuration files.

---

**Happy Coding! 🚗✨**
