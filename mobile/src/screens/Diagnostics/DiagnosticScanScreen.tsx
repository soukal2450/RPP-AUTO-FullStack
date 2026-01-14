import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NeonHeader, NeonButton, GlassCard } from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { SCREEN_NAMES } from '../../constants';
import ApiService from '../../services/api';

export const DiagnosticScanScreen = ({ navigation, route }: any) => {
  const [scanning, setScanning] = useState(false);
  const vehicleId = route.params?.vehicleId;

  const startScan = async () => {
    if (!vehicleId) {
      Alert.alert('Error', 'Please select a vehicle first');
      return;
    }

    try {
      setScanning(true);
      const response = await ApiService.runDiagnostic(vehicleId);

      // Navigate to results
      navigation.navigate(SCREEN_NAMES.SCAN_RESULTS, {
        scanData: response.data,
      });
    } catch (error: any) {
      Alert.alert('Scan Failed', error.response?.data?.message || 'Failed to run diagnostic scan');
    } finally {
      setScanning(false);
    }
  };

  return (
    <View style={styles.container}>
      <NeonHeader title="Diagnostic Scan" />

      <View style={styles.content}>
        <GlassCard style={styles.infoCard}>
          <Ionicons name="information-circle" size={48} color={Colors.neonBlue} />
          <Text style={styles.infoTitle}>OBD-II Diagnostic Scan</Text>
          <Text style={styles.infoText}>
            Connect your OBD-II scanner to your vehicle's diagnostic port to read error codes and system status.
          </Text>
        </GlassCard>

        <GlassCard style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>Scan Steps:</Text>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>Locate your vehicle's OBD-II port (usually under dashboard)</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>Connect the scanner firmly</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>Turn on vehicle ignition (engine off)</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepText}>Tap "Start Scan" below</Text>
          </View>
        </GlassCard>

        <NeonButton
          title={scanning ? "Scanning..." : "Start Scan"}
          onPress={startScan}
          loading={scanning}
          style={styles.scanButton}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_NAMES.DIAGNOSTIC_HISTORY)}
          style={styles.historyButton}
        >
          <Text style={styles.historyText}>View Scan History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  infoCard: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  infoTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  infoText: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  stepsCard: {
    marginBottom: Spacing.xl,
  },
  stepsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neonBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  stepNumberText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkBg,
  },
  stepText: {
    flex: 1,
    fontSize: Typography.fontSize.md,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  scanButton: {
    marginBottom: Spacing.md,
  },
  historyButton: {
    alignItems: 'center',
    padding: Spacing.md,
  },
  historyText: {
    fontSize: Typography.fontSize.md,
    color: Colors.neonBlue,
    fontWeight: Typography.fontWeight.semibold,
  },
});
