export const API_CONFIG = {
  BASE_URL: 'https://api.carfixai.com',
  TIMEOUT: 30000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      SIGNUP: '/auth/signup',
      VERIFY_OTP: '/auth/verify-otp',
      FORGOT_PASSWORD: '/auth/forgot-password',
    },
    VEHICLE: {
      ADD: '/vehicle/add',
      LIST: '/vehicle/list',
      DETAILS: '/vehicle/:id',
      SCAN_VIN: '/vehicle/scan-vin',
    },
    DIAGNOSTICS: {
      SCAN: '/diagnostics/scan',
      HISTORY: '/diagnostics/history',
      DETAILS: '/diagnostics/:id',
    },
    SHOP: {
      PARTS_SEARCH: '/shop/parts/search',
      MECHANICS_NEARBY: '/shop/mechanics/nearby',
      BOOK_APPOINTMENT: '/shop/book',
    },
    AI: {
      CHAT: '/ai/chat',
      ANALYZE_IMAGE: '/ai/analyze-image',
      GET_RECOMMENDATIONS: '/ai/recommendations',
    },
    PAYMENT: {
      CREATE_INTENT: '/payment/create-intent',
      CONFIRM: '/payment/confirm',
    },
  },
};

export const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_KEY_HERE';

export const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

export const SCREEN_NAMES = {
  // Auth Stack
  SPLASH: 'Splash',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  OTP_VERIFY: 'OTPVerify',
  FORGOT_PASSWORD: 'ForgotPassword',

  // Onboarding Stack
  ONBOARDING_1: 'Onboarding1',
  ONBOARDING_2: 'Onboarding2',
  ONBOARDING_3: 'Onboarding3',

  // Main Tab Navigator
  DASHBOARD: 'Dashboard',
  VEHICLE_INFO: 'VehicleInfo',
  DIAGNOSTICS: 'Diagnostics',
  SHOP: 'Shop',
  AI_CHAT: 'AIChat',

  // Dashboard Stack
  HOME: 'Home',
  NOTIFICATIONS: 'Notifications',

  // Vehicle Stack
  VEHICLE_LIST: 'VehicleList',
  ADD_VEHICLE_MANUAL: 'AddVehicleManual',
  ADD_VEHICLE_VIN: 'AddVehicleVIN',
  VEHICLE_DETAILS: 'VehicleDetails',
  MAINTENANCE_SCHEDULE: 'MaintenanceSchedule',
  SERVICE_HISTORY: 'ServiceHistory',

  // Diagnostics Stack
  DIAGNOSTIC_SCAN: 'DiagnosticScan',
  SCAN_RESULTS: 'ScanResults',
  ERROR_CODE_DETAILS: 'ErrorCodeDetails',
  DIAGNOSTIC_HISTORY: 'DiagnosticHistory',

  // Shop Stack
  PARTS_SEARCH: 'PartsSearch',
  PARTS_DETAILS: 'PartsDetails',
  MECHANICS_MAP: 'MechanicsMap',
  MECHANIC_PROFILE: 'MechanicProfile',
  BOOK_APPOINTMENT: 'BookAppointment',
  CART: 'Cart',
  CHECKOUT: 'Checkout',

  // AI Stack
  AI_ASSISTANT: 'AIAssistant',
  IMAGE_ANALYSIS: 'ImageAnalysis',

  // Profile Stack
  PROFILE: 'Profile',
  EDIT_PROFILE: 'EditProfile',
  SETTINGS: 'Settings',
  SUBSCRIPTION: 'Subscription',
  HELP_SUPPORT: 'HelpSupport',
};
