# Android App Build Guide

## 📱 K & T Transport Android App

This guide will help you build and preview the K & T Transport app as a native Android application using Capacitor.

---

## ✅ Prerequisites

Before building the Android app, ensure you have:

1. **Node.js and npm** (already installed ✓)
2. **Android Studio** - Download from [https://developer.android.com/studio](https://developer.android.com/studio)
3. **Java Development Kit (JDK)** - Version 17+ recommended
4. **Android SDK** - Installed via Android Studio

---

## 🚀 Quick Start Commands

### Build and Open in Android Studio
```bash
npm run android:build
npm run android:open
```

### Build and Run on Device/Emulator
```bash
npm run android:run
```

### Manual Steps
```bash
# 1. Build the web app
npm run build

# 2. Sync with Android
npx cap sync android

# 3. Open in Android Studio
npx cap open android
```

---

## 📋 Step-by-Step Build Process

### Step 1: Install Android Studio

1. Download Android Studio from the official website
2. Install the Android SDK (API Level 34+ recommended)
3. Set up an Android Virtual Device (AVD) or connect a physical device

### Step 2: Configure Environment Variables

Add these to your system environment variables:

```bash
# Windows
ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Android\Android Studio\jbr

# Add to PATH
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%JAVA_HOME%\bin
```

### Step 3: Build the App

```bash
# Build the web assets
npm run build

# This creates the /dist folder with your production build
```

### Step 4: Sync with Android

```bash
# Sync web assets to Android project
npx cap sync android

# This copies /dist contents to android/app/src/main/assets/public
```

### Step 5: Open in Android Studio

```bash
# Open the Android project
npx cap open android
```

### Step 6: Run the App

**Option A: Using Android Studio**
1. Click the "Run" button (green play icon) in Android Studio
2. Select your target device (emulator or physical device)
3. Wait for the app to build and install

**Option B: Using Command Line**
```bash
# Run on connected device
npx cap run android

# Run on specific device
npx cap run android --target=<device-id>

# List available devices
adb devices
```

---

## 🔧 Development Workflow

### Making Changes

1. **Edit your code** in the web app (`components/`, `App.tsx`, etc.)
2. **Rebuild**:
   ```bash
   npm run build
   ```
3. **Sync to Android**:
   ```bash
   npx cap sync android
   ```
4. **Reload in Android Studio** or re-run the app

### Live Reload (Development)

For faster development, you can use live reload:

1. Start the dev server:
   ```bash
   npm run dev
   ```
2. Update `capacitor.config.ts`:
   ```typescript
   server: {
     url: 'http://192.168.1.X:3000', // Your computer's IP
     cleartext: true
   }
   ```
3. Run `npx cap sync android` and run the app

---

## 📱 Testing

### Emulator
- Use Android Virtual Device (AVD) in Android Studio
- Recommended: Pixel 6 with API 34+

### Physical Device
1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect via USB
4. Accept USB debugging prompt on device
5. Run `adb devices` to verify connection

---

## 📦 Building Release APK

### Debug APK (for testing)
```bash
cd android
./gradlew assembleDebug
```
Output: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (for production)
```bash
cd android
./gradlew assembleRelease
```
Output: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

### Signed Release APK

1. Generate a keystore:
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Create `android/key.properties`:
   ```properties
   storePassword=your-store-password
   keyPassword=your-key-password
   keyAlias=my-key-alias
   storeFile=../my-release-key.keystore
   ```

3. Build signed APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

---

## 🎨 App Configuration

### App Name and ID
Edit `capacitor.config.ts`:
```typescript
appId: 'com.knt.transport',
appName: 'K&T Transport',
```

### App Icons
Replace these files in `android/app/src/main/res/`:
- `mipmap-hdpi/` - 72x72
- `mipmap-mdpi/` - 48x48
- `mipmap-xhdpi/` - 96x96
- `mipmap-xxhdpi/` - 144x144
- `mipmap-xxxhdpi/` - 192x192

### Colors and Theme
Edit `android/app/src/main/res/values/colors.xml`:
```xml
<color name="colorPrimary">#1e40af</color>
<color name="colorPrimaryDark">#1e3a8a</color>
```

---

## 🐛 Troubleshooting

### "SDK location not found"
- Set `ANDROID_HOME` environment variable
- Or create `android/local.properties`:
  ```properties
  sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
  ```

### "Gradle build failed"
- Update Gradle: `cd android && ./gradlew wrapper --gradle-version=8.2`
- Clear cache: `./gradlew clean`

### "Unable to locate adb"
- Add Android SDK platform-tools to PATH
- Restart terminal/IDE

### App crashes on startup
- Check logcat in Android Studio
- Verify all assets copied: `npx cap sync android`
- Clear app data on device and reinstall

---

## 📊 App Features

The Android app includes all web features:
- ✅ Splash screen with animated logo
- ✅ Role-based authentication (Commuter, Driver, Admin)
- ✅ Color-coded themes per role
- ✅ Responsive mobile UI
- ✅ Bottom navigation (mobile)
- ✅ Push notifications (can be added)
- ✅ Offline capabilities (can be enhanced)

---

## 🔄 Updates and Deployment

### Update the App
1. Make changes to web code
2. Run `npm run build`
3. Run `npx cap sync android`
4. Rebuild in Android Studio

### Deploy to Google Play Store
1. Build signed release APK (see above)
2. Create Google Play Developer account ($25 one-time fee)
3. Upload APK to Play Console
4. Fill in store listing details
5. Submit for review

---

## 📱 App Bundle (AAB) for Play Store

Google Play requires AAB format:

```bash
cd android
./gradlew bundleRelease
```
Output: `android/app/build/outputs/bundle/release/app-release.aab`

---

## 🔗 Useful Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Studio Guide](https://developer.android.com/studio/intro)
- [Gradle Build Tool](https://gradle.org/)
- [Publishing to Play Store](https://developer.android.com/studio/publish)

---

## 💡 Tips

1. **Use Chrome DevTools**: Debug webview via `chrome://inspect`
2. **Logcat**: Monitor Android logs in Android Studio
3. **Hot Reload**: Use dev server for faster development
4. **Native Plugins**: Add Capacitor plugins for native features
5. **Performance**: Optimize bundle size with code splitting

---

## 📞 Support

For issues specific to:
- **Capacitor**: [GitHub Issues](https://github.com/ionic-team/capacitor/issues)
- **Android Studio**: [Stack Overflow](https://stackoverflow.com/questions/tagged/android-studio)
- **This App**: Check project documentation

---

**Built with ❤️ using Capacitor and React**
