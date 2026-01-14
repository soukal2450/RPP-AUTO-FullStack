import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NeonButton, DarkInput } from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme/colors';
import { SCREEN_NAMES } from '../../constants';
import ApiService from '../../services/api';

export const SignupScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleSignup = async () => {
    try {
      setLoading(true);
      setErrors({});

      // Validation
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        setErrors({ general: 'Please fill all fields' });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: 'Passwords do not match' });
        return;
      }

      if (formData.password.length < 8) {
        setErrors({ password: 'Password must be at least 8 characters' });
        return;
      }

      const response = await ApiService.signup(
        formData.name,
        formData.email,
        formData.password,
        formData.phone
      );

      // Navigate to OTP verification
      navigation.navigate(SCREEN_NAMES.OTP_VERIFY, { email: formData.email });
    } catch (error: any) {
      setErrors({
        general: error.response?.data?.message || 'Signup failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join CarFix AI today</Text>
        </View>

        <View style={styles.form}>
          <DarkInput
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChangeText={(value) => updateField('name', value)}
            icon="person"
            error={errors.name}
          />

          <DarkInput
            label="Email"
            placeholder="your@email.com"
            value={formData.email}
            onChangeText={(value) => updateField('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail"
            error={errors.email}
          />

          <DarkInput
            label="Phone Number"
            placeholder="+1 234 567 8900"
            value={formData.phone}
            onChangeText={(value) => updateField('phone', value)}
            keyboardType="phone-pad"
            icon="call"
            error={errors.phone}
          />

          <DarkInput
            label="Password"
            placeholder="Min 8 characters"
            value={formData.password}
            onChangeText={(value) => updateField('password', value)}
            secureTextEntry
            icon="lock-closed"
            error={errors.password}
          />

          <DarkInput
            label="Confirm Password"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChangeText={(value) => updateField('confirmPassword', value)}
            secureTextEntry
            icon="lock-closed"
            error={errors.confirmPassword}
          />

          {errors.general && (
            <Text style={styles.errorText}>{errors.general}</Text>
          )}

          <NeonButton
            title="Sign Up"
            onPress={handleSignup}
            loading={loading}
            style={styles.signupButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neonBlue,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  signupButton: {
    marginTop: Spacing.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  loginText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.md,
  },
  loginLink: {
    color: Colors.neonBlue,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
});
