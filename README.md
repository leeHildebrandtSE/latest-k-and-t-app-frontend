# K & T Transport App

A comprehensive lift club & commuter management system with three user portals: Commuter, Driver, and Admin.

## � Android App Available!

This app can be previewed as a native Android application!

**Quick Start:**
```bash
npm run android:open  # Opens in Android Studio
```

**Complete Guides:**
- 🚀 [ANDROID-QUICKSTART.md](./ANDROID-QUICKSTART.md) - Get started fast
- 📚 [ANDROID-BUILD.md](./ANDROID-BUILD.md) - Detailed build instructions
- ✅ [ANDROID-PREVIEW-COMPLETE.md](./ANDROID-PREVIEW-COMPLETE.md) - Setup summary

## �🔐 Test Credentials

The app uses **mock authentication**. You can log in with any email/password combination.

**Quick Test Credentials:**
- Email: `test@knt.com`
- Password: `password`

> **Note:** Any email/password will work for testing purposes.

## 🧭 Navigation Guide

### Primary Navigation (Main Sections)
**Desktop (>1280px):**
- Fixed sidebar on the left with role-specific menu items
- Click menu items to switch between main sections

**Mobile (<1024px):**
- Bottom tab navigation bar
- Tap icons to switch between sections
- Active tab highlighted in navy blue

**Tablet (1024-1280px):**
- Collapsible sidebar behavior

### Secondary Navigation (Detail Views)
When you drill down into details (e.g., viewing a specific trip):

**Header Back Button appears:**
- **Mobile:** Arrow icon (←) in the top-left header
- **Desktop:** "← Back" button in the header next to page title
- Click/tap to return to the previous main section

### Navigation Flow Examples

**Commuter Flow:**
```
Home → (Select Trip) → Trip Details → (Back Button) → Home
     ↓
My Trips → View Bookings
     ↓
Notifications → Mark as Read
     ↓
Profile → View/Edit Info
```

**Driver Flow:**
```
Dashboard → View Stats
     ↓
My Trips → Manage Trips
     ↓
Requests → Approve/Reject (with badge notification)
     ↓
Vehicles → Add/Manage Fleet
```

**Admin Flow:**
```
Dashboard → Analytics & Charts
     ↓
Drivers → Manage Driver Accounts
     ↓
Commuters → Manage User Accounts
     ↓
Vehicles → Oversee All Vehicles
     ↓
Trips → Monitor All Trips
     ↓
Financials → Revenue Reports
```

### Special Features
- 🔔 **Notification Badges:** Red dot/number shows unread notifications
- 📌 **Sticky Header:** Header stays visible when scrolling
- 🎯 **Context-Aware:** Back button only appears when needed
- 💡 **Navigation Tips:** Toast notifications guide you on first login

## 👥 User Roles

### 1. Commuter Portal
- Browse available trips
- Book seats on trips
- View booked trips
- Receive notifications
- Manage profile

### 2. Driver Portal
- Dashboard with statistics
- Manage trips
- Handle trip requests (approve/reject)
- Vehicle management
- View notifications
- Manage profile

### 3. Admin Portal
- Analytics dashboard
- User management (drivers & commuters)
- Vehicle oversight
- Trip monitoring
- Financial reports
- System settings

## 🎨 Design System

- **Primary Color:** Navy Blue (#1e3a8a)
- **Accent Color:** Amber (#f59e0b)
- **Layout:** Responsive (Desktop, Tablet, Mobile)
- **Icons:** Lucide React
- **Charts:** Recharts
- **UI Components:** ShadCN UI

## 📱 Responsive Breakpoints

- **Mobile:** < 1024px (Bottom tabs)
- **Tablet:** 1024px - 1280px (Collapsible sidebar)
- **Desktop:** > 1280px (Fixed sidebar)

## 🚀 Getting Started

1. Open the app
2. Select your user role (Commuter, Driver, or Admin)
3. Login with any credentials (e.g., `test@knt.com` / `password`)
4. Explore the features!

## 🔄 Navigation Best Practices Implemented

This app follows modern mobile-first navigation patterns used by industry leaders like Uber, Lyft, and Airbnb:

✅ **Tab-based navigation** for main sections (mobile app standard)  
✅ **Contextual header back button** for detail views (appears only when needed)  
✅ **Sticky headers** for better UX and constant access to navigation  
✅ **Badge notifications** for unread items and pending actions  
✅ **Responsive design** across all devices with appropriate navigation patterns  
✅ **Clear visual hierarchy** with consistent spacing and typography  
✅ **Smart page titles** that update based on current context  
✅ **Toast notifications** to guide users and confirm actions

### Why This Pattern?

**Mobile-First Approach:**
- Bottom tab navigation keeps primary actions within thumb reach
- Header back button provides intuitive drill-down navigation
- Minimizes cognitive load with clear, consistent patterns

**Desktop Enhancement:**
- Sidebar provides always-visible navigation options
- Back button in header maintains consistency with mobile
- More screen real estate for content

**Accessibility:**
- Large touch targets (44px minimum)
- Clear visual feedback on interactions
- Keyboard navigation support through standard HTML elements
