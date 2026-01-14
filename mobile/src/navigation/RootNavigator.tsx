import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { SCREEN_NAMES } from '../constants';

// Auth Screens
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { SignupScreen } from '../screens/Auth/SignupScreen';

// Dashboard Screens
import { DashboardHomeScreen } from '../screens/Dashboard/DashboardHomeScreen';

// Vehicle Screens
import { VehicleListScreen } from '../screens/VehicleInfo/VehicleListScreen';

// Diagnostics Screens
import { DiagnosticScanScreen } from '../screens/Diagnostics/DiagnosticScanScreen';

// Shop Screens
import { PartsSearchScreen } from '../screens/Shop/PartsSearchScreen';

// AI Screens
import { AIAssistantScreen } from '../screens/AI/AIAssistantScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === SCREEN_NAMES.DASHBOARD) {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          } else if (route.name === SCREEN_NAMES.VEHICLE_INFO) {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === SCREEN_NAMES.DIAGNOSTICS) {
            iconName = focused ? 'hardware-chip' : 'hardware-chip-outline';
          } else if (route.name === SCREEN_NAMES.SHOP) {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else if (route.name === SCREEN_NAMES.AI_CHAT) {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.neonBlue,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.cardBg,
          borderTopColor: Colors.borderDark,
          borderTopWidth: 1,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name={SCREEN_NAMES.DASHBOARD} component={DashboardHomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name={SCREEN_NAMES.VEHICLE_INFO} component={VehicleListScreen} options={{ tabBarLabel: 'Vehicles' }} />
      <Tab.Screen name={SCREEN_NAMES.DIAGNOSTICS} component={DiagnosticScanScreen} options={{ tabBarLabel: 'Scan' }} />
      <Tab.Screen name={SCREEN_NAMES.SHOP} component={PartsSearchScreen} options={{ tabBarLabel: 'Shop' }} />
      <Tab.Screen name={SCREEN_NAMES.AI_CHAT} component={AIAssistantScreen} options={{ tabBarLabel: 'AI' }} />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.darkBg },
        }}
      >
        {!isLoggedIn ? (
          <>
            <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
            <Stack.Screen name={SCREEN_NAMES.SIGNUP} component={SignupScreen} />
          </>
        ) : (
          <Stack.Screen name="MainApp" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
