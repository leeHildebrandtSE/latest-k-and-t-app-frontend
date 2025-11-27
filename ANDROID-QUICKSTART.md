# 🚀 Quick Android Preview Guide

## Instant Preview (No Android Studio Required)

### Option 1: Mobile Browser Preview
1. Start the development server:
   ```bash
   npm run dev
   ```
2. On your Android device:
   - Open Chrome
   - Navigate to `http://YOUR-COMPUTER-IP:3000`
   - Tap menu (⋮) → "Install app" to add to home screen

### Option 2: Build APK for Android Studio

If you have Android Studio installed:

```bash
# Quick build and open
npm run android:build
npm run android:open
```

Then press the green **Run** button in Android Studio!

---

## 📱 What You Get

Your Android app includes:
- ✅ Native Android app with K&T Transport branding
- ✅ Splash screen with blue logo
- ✅ Full role-based functionality (Commuter/Driver/Admin)
- ✅ Color-coded themes (Orange/Blue/Green)
- ✅ Mobile-optimized UI with bottom navigation
- ✅ Works offline after initial load

---

## 🎯 Testing Without Android Studio

### Using Your Phone's Browser
1. Make sure your phone and computer are on the same WiFi network
2. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` or `ip addr`
3. Run `npm run dev`
4. On phone, visit: `http://192.168.X.X:3000` (use your IP)

### Install as PWA
1. In Chrome mobile, tap menu (⋮)
2. Select "Install app" or "Add to Home Screen"
3. The app will work like a native app!

---

## 🏗️ Full Android Build

See **ANDROID-BUILD.md** for complete instructions on:
- Installing Android Studio
- Building release APK
- Publishing to Google Play Store

---

## 🔄 Making Updates

After changing code:
```bash
npm run android:build
```

Then reload/rerun in Android Studio.

---

**Need help?** Check ANDROID-BUILD.md for detailed instructions!
