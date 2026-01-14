import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { NeonHeader, GlassCard, NeonButton } from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { SCREEN_NAMES } from '../../constants';
import ApiService from '../../services/api';

export const MechanicsMapScreen = ({ navigation }: any) => {
  const [location, setLocation] = useState<any>(null);
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMechanics();
  }, []);

  const loadMechanics = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      const response = await ApiService.findNearbyMechanics(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );

      setMechanics(response.mechanics || []);
    } catch (error) {
      console.error('Failed to load mechanics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!location) {
    return (
      <View style={styles.container}>
        <NeonHeader title="Find Mechanics" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NeonHeader title="Find Mechanics" />

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Your Location"
          pinColor={Colors.neonBlue}
        />

        {mechanics.map((mechanic: any) => (
          <Marker
            key={mechanic.id}
            coordinate={{
              latitude: mechanic.lat,
              longitude: mechanic.lng,
            }}
            title={mechanic.name}
            description={mechanic.address}
            onPress={() => setSelectedMechanic(mechanic)}
          />
        ))}
      </MapView>

      {selectedMechanic && (
        <GlassCard style={styles.infoCard}>
          <View style={styles.mechanicHeader}>
            <View>
              <Text style={styles.mechanicName}>{selectedMechanic.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color={Colors.warning} />
                <Text style={styles.ratingText}>{selectedMechanic.rating} ({selectedMechanic.reviews})</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setSelectedMechanic(null)}>
              <Ionicons name="close-circle" size={28} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.mechanicAddress}>{selectedMechanic.address}</Text>
          <Text style={styles.mechanicDistance}>{selectedMechanic.distance} miles away</Text>

          <NeonButton
            title="View Profile"
            onPress={() => navigation.navigate(SCREEN_NAMES.MECHANIC_PROFILE, { mechanicId: selectedMechanic.id })}
            style={styles.viewButton}
          />
        </GlassCard>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
  },
  map: {
    flex: 1,
  },
  infoCard: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: Spacing.lg,
    right: Spacing.lg,
  },
  mechanicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  mechanicName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  ratingText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  mechanicAddress: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  mechanicDistance: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neonBlue,
    marginBottom: Spacing.md,
  },
  viewButton: {
    marginTop: Spacing.sm,
  },
});
