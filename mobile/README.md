# CarFix AI - Mobile App

Complete React Native + Expo mobile application for CarFix AI automotive diagnostic platform.

## 🚀 Features

### ✅ Complete Implementation
- **36 Screens** fully coded and ready
- **Authentication Flow** (Login, Signup, OTP)
- **Dashboard** with quick actions
- **Vehicle Management** (Add, List, Details, VIN Scanner)
- **Diagnostic Scanning** with OBD-II integration
- **Parts Shop** with search and cart
- **Mechanics Map** with Google Maps integration
- **AI Chat Assistant** for vehicle help
- **Image Analysis** for damage assessment
- **Payment Integration** with Stripe
- **Industrial AI Dark Theme** throughout

### 📱 Tech Stack
- React Native 0.74
- Expo SDK 51
- React Navigation 6
- TypeScript support
- Expo Camera for VIN scanning
- Expo Location for mechanics finder
- React Native Maps
- Stripe React Native SDK
- Axios for API calls
- AsyncStorage for local data

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- Expo CLI installed globally: `npm install -g expo-cli`
- Expo account (free): https://expo.dev/signup

### Setup Steps

1. **Extract the project**
   ```bash
   unzip CarFixAI_Mobile.zip
   cd CarFixAI_Mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   - Open `src/constants/index.ts`
   - Update `BASE_URL` to your backend API
   - Add your Stripe and Google Maps API keys

4. **Start development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on device/emulator**
   - Scan QR code with Expo Go app (Android/iOS)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator

## 🏗️ Building APK

### Method 1: EAS Build (Recommended)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure build**
   ```bash
   eas build:configure
   ```

4. **Build APK**
   ```bash
   eas build --platform android --profile preview
   ```

5. **Download APK**
   - Build will be uploaded to Expo servers
   - Download link will be provided in terminal
   - Install APK on Android device

### Method 2: Local Build with Android Studio

1. **Eject from Expo**
   ```bash
   expo prebuild
   ```

2. **Open in Android Studio**
   - Open `android` folder in Android Studio
   - Wait for Gradle sync to complete

3. **Build APK**
   - Build > Build Bundle(s) / APK(s) > Build APK(s)
   - APK will be in `android/app/build/outputs/apk/`

### Method 3: Cloud Service (No Local Setup)

Use Expo EAS from phone browser:
1. Go to https://expo.dev
2. Create account (free)
3. Upload project via web interface
4. Trigger build remotely
5. Download APK when ready

## 📁 Project Structure

```
CarFixAI_Mobile/
├── src/
│   ├── components/
│   │   └── common/          # Reusable UI components
│   ├── constants/           # API endpoints, config
│   ├── navigation/          # React Navigation setup
│   ├── screens/
│   │   ├── Auth/           # Login, Signup
│   │   ├── Dashboard/      # Home screen
│   │   ├── VehicleInfo/    # Vehicle management
│   │   ├── Diagnostics/    # OBD-II scanning
│   │   ├── Shop/           # Parts & mechanics
│   │   ├── AI/             # AI assistant
│   │   └── Profile/        # User settings
│   ├── services/           # API service layer
│   ├── theme/              # Colors, typography
│   └── utils/              # Helper functions
├── App.tsx                 # App entry point
├── app.json               # Expo configuration
└── package.json           # Dependencies
```

## 🎨 Screens Implemented (36 Total)

### Authentication (5)
- Splash Screen
- Login
- Signup
- OTP Verification
- Forgot Password

### Onboarding (3)
- Welcome screens 1-3

### Dashboard (2)
- Home with quick actions
- Notifications

### Vehicle Management (6)
- Vehicle list
- Add vehicle (manual)
- Add vehicle (VIN scanner)
- Vehicle details
- Maintenance schedule
- Service history

### Diagnostics (4)
- Diagnostic scan
- Scan results
- Error code details
- Diagnostic history

### Shop (7)
- Parts search
- Parts details
- Cart
- Checkout
- Mechanics map
- Mechanic profile
- Book appointment

### AI Assistant (2)
- Chat interface
- Image analysis

### Profile (7)
- Profile view
- Edit profile
- Settings
- Subscription management
- Payment methods
- Help & support
- About

## 🔧 Configuration

### Backend API
Update `src/constants/index.ts`:
```typescript
BASE_URL: 'https://YOUR_BACKEND_URL'
```

### Stripe
Add your Stripe publishable key:
```typescript
STRIPE_PUBLISHABLE_KEY: 'pk_test_YOUR_KEY'
```

### Google Maps
Add API key in `src/constants/index.ts`:
```typescript
GOOGLE_MAPS_API_KEY: 'YOUR_KEY'
```

## 🎯 Next Steps

1. **Test all screens** in Expo Go app
2. **Connect to your backend API** (update BASE_URL)
3. **Add real API keys** (Stripe, Google Maps)
4. **Test payment flow** with Stripe test cards
5. **Build APK** using one of the methods above
6. **Test on physical device**
7. **Deploy to Google Play Store**

## 📱 Testing

### Expo Go Testing (Quick)
1. Install Expo Go from Play Store
2. Run `expo start`
3. Scan QR code with Expo Go app
4. All features work except:
   - Native payments (need standalone build)
   - Some camera features

### Standalone APK Testing (Full)
1. Build APK using EAS or Android Studio
2. Install on Android device
3. All features work including payments

## 🐛 Troubleshooting

### Metro bundler issues
```bash
npm start -- --reset-cache
```

### Dependency conflicts
```bash
rm -rf node_modules package-lock.json
npm install
```

### Expo CLI issues
```bash
npm install -g expo-cli@latest
```

### Android build errors
- Ensure Java 11 is installed
- Check Android SDK is updated
- Clear Gradle cache

## 📞 Support

For build assistance:
- Expo Forums: https://forums.expo.dev
- React Native Discord: https://discord.gg/reactiflux
- Stack Overflow: Tag `react-native` + `expo`

## 📝 License

Proprietary - CarFix AI Platform

---

**Built with ❤️ using React Native + Expo**

All 36 screens are production-ready. Just:
1. Install dependencies
2. Update API config
3. Build APK
4. Deploy!
