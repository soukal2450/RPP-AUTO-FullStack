import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { NeonHeader, GlassCard, NeonButton } from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { SCREEN_NAMES } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileScreen = ({ navigation }: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.replace(SCREEN_NAMES.LOGIN);
          },
        },
      ]
    );
  };

  const MenuItem = ({ icon, title, value, onPress }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View style={styles.menuIconContainer}>
          <Ionicons name={icon} size={20} color={Colors.neonBlue} />
        </View>
        <View>
          <Text style={styles.menuTitle}>{title}</Text>
          {value && <Text style={styles.menuValue}>{value}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NeonHeader title="Profile" showBack={false} rightIcon="settings" onRightPress={() => navigation.navigate(SCREEN_NAMES.SETTINGS)} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <GlassCard style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={48} color={Colors.neonBlue} />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color={Colors.darkBg} />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@email.com'}</Text>

          <NeonButton
            title="Edit Profile"
            onPress={() => navigation.navigate(SCREEN_NAMES.EDIT_PROFILE)}
            variant="outline"
            style={styles.editButton}
          />
        </GlassCard>

        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <MenuItem
            icon="card"
            title="Subscription"
            value="Pro Plan"
            onPress={() => navigation.navigate(SCREEN_NAMES.SUBSCRIPTION)}
          />
          <MenuItem
            icon="wallet"
            title="Payment Methods"
            onPress={() => navigation.navigate('PaymentMethods')}
          />
          <MenuItem
            icon="notifications"
            title="Notifications"
            onPress={() => navigation.navigate('NotificationSettings')}
          />
        </GlassCard>

        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <MenuItem
            icon="help-circle"
            title="Help & Support"
            onPress={() => navigation.navigate(SCREEN_NAMES.HELP_SUPPORT)}
          />
          <MenuItem
            icon="document-text"
            title="Terms & Privacy"
            onPress={() => navigation.navigate('Terms')}
          />
          <MenuItem
            icon="information-circle"
            title="About"
            value="v1.0.0"
            onPress={() => navigation.navigate('About')}
          />
        </GlassCard>

        <NeonButton
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
  },
  content: {
    padding: Spacing.lg,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neonBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  editButton: {
    width: '100%',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
  },
  menuValue: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  logoutButton: {
    marginTop: Spacing.lg,
  },
});
