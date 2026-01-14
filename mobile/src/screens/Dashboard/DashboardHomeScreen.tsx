import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GlassCard, NeonHeader } from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../../services/api';

export const DashboardHomeScreen = ({ navigation }: any) => {
  const [vehicles, setVehicles] = useState([]);
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [vehiclesData, scansData] = await Promise.all([
        ApiService.getVehicles(),
        ApiService.getDiagnosticHistory(''),
      ]);
      setVehicles(vehiclesData.vehicles || []);
      setRecentScans(scansData.scans?.slice(0, 3) || []);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const QuickActionCard = ({ icon, title, color, onPress }: any) => (
    <TouchableOpacity onPress={onPress} style={styles.quickAction}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={32} color={color} />
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NeonHeader title="Dashboard" showBack={false} rightIcon="notifications" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.welcomeSubtext}>Keep your vehicle healthy</Text>
        </View>

        <View style={styles.quickActionsGrid}>
          <QuickActionCard
            icon="car"
            title="Add Vehicle"
            color={Colors.neonBlue}
            onPress={() => navigation.navigate('AddVehicleManual')}
          />
          <QuickActionCard
            icon="search"
            title="Scan VIN"
            color={Colors.neonCyan}
            onPress={() => navigation.navigate('AddVehicleVIN')}
          />
          <QuickActionCard
            icon="hardware-chip"
            title="Diagnostics"
            color={Colors.purple}
            onPress={() => navigation.navigate('DiagnosticScan')}
          />
          <QuickActionCard
            icon="storefront"
            title="Shop"
            color={Colors.orange}
            onPress={() => navigation.navigate('Shop')}
          />
        </View>

        <GlassCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Vehicles</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {vehicles.length > 0 ? (
            vehicles.slice(0, 2).map((vehicle: any, index) => (
              <View key={index} style={styles.vehicleCard}>
                <Ionicons name="car-sport" size={24} color={Colors.neonBlue} />
                <View style={styles.vehicleInfo}>
                  <Text style={styles.vehicleName}>{vehicle.make} {vehicle.model}</Text>
                  <Text style={styles.vehicleYear}>{vehicle.year}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No vehicles added yet</Text>
          )}
        </GlassCard>

        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          {recentScans.length > 0 ? (
            recentScans.map((scan: any, index) => (
              <View key={index} style={styles.scanCard}>
                <View style={styles.scanLeft}>
                  <Ionicons name="speedometer" size={20} color={Colors.warning} />
                  <Text style={styles.scanText}>{scan.errorCode}</Text>
                </View>
                <Text style={styles.scanDate}>{scan.date}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No diagnostic scans yet</Text>
          )}
        </GlassCard>
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
  welcomeSection: {
    marginBottom: Spacing.xl,
  },
  welcomeText: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  welcomeSubtext: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  quickAction: {
    width: '48%',
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  quickActionText: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  seeAllText: {
    color: Colors.neonBlue,
    fontSize: Typography.fontSize.sm,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.inputBg,
    borderRadius: 12,
    marginBottom: Spacing.sm,
  },
  vehicleInfo: {
    marginLeft: Spacing.md,
  },
  vehicleName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  vehicleYear: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  scanCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.inputBg,
    borderRadius: 12,
    marginBottom: Spacing.sm,
  },
  scanLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanText: {
    marginLeft: Spacing.sm,
    fontSize: Typography.fontSize.md,
    color: Colors.textPrimary,
  },
  scanDate: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  emptyText: {
    color: Colors.textMuted,
    textAlign: 'center',
    padding: Spacing.lg,
  },
});
