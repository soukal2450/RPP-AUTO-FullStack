import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { NeonHeader, NeonButton, GlassCard } from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { SCREEN_NAMES } from '../../constants';
import ApiService from '../../services/api';

export const VehicleListScreen = ({ navigation }: any) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const response = await ApiService.getVehicles();
      setVehicles(response.vehicles || []);
    } catch (error) {
      console.error('Failed to load vehicles:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const VehicleCard = ({ vehicle }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREEN_NAMES.VEHICLE_DETAILS, { vehicleId: vehicle.id })}
    >
      <GlassCard style={styles.vehicleCard}>
        <View style={styles.vehicleHeader}>
          <View style={styles.iconContainer}>
            <Ionicons name="car-sport" size={32} color={Colors.neonBlue} />
          </View>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName}>{vehicle.make} {vehicle.model}</Text>
            <Text style={styles.vehicleYear}>{vehicle.year}</Text>
            <Text style={styles.vehicleVin}>VIN: {vehicle.vin}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} />
        </View>

        <View style={styles.vehicleStats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Mileage</Text>
            <Text style={styles.statValue}>{vehicle.mileage || 'N/A'}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Last Service</Text>
            <Text style={styles.statValue}>{vehicle.lastService || 'N/A'}</Text>
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NeonHeader title="My Vehicles" showBack={false} rightIcon="add-circle" onRightPress={() => navigation.navigate(SCREEN_NAMES.ADD_VEHICLE_MANUAL)} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadVehicles(); }} />
        }
      >
        {vehicles.length > 0 ? (
          vehicles.map((vehicle: any) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="car" size={80} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No vehicles added yet</Text>
            <Text style={styles.emptySubtext}>Add your first vehicle to get started</Text>
            <NeonButton
              title="Add Vehicle"
              onPress={() => navigation.navigate(SCREEN_NAMES.ADD_VEHICLE_MANUAL)}
              style={styles.addButton}
            />
          </View>
        )}
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
    flexGrow: 1,
  },
  vehicleCard: {
    marginBottom: Spacing.md,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.neonBlue + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  vehicleYear: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  vehicleVin: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  vehicleStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderDark,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  statValue: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neonBlue,
    marginTop: Spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xxl * 2,
  },
  emptyText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
  },
  emptySubtext: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  addButton: {
    marginTop: Spacing.xl,
  },
});
