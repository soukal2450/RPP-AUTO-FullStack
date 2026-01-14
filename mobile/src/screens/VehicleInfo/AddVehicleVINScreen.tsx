import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { NeonHeader, NeonButton } from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme/colors';
import ApiService from '../../services/api';

export const AddVehicleVINScreen = ({ navigation }: any) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const captureAndScan = async () => {
    if (!camera) return;

    try {
      setScanning(true);
      const photo = await camera.takePictureAsync({ base64: true });

      const response = await ApiService.scanVIN(photo.base64 || '');

      if (response.vin) {
        Alert.alert(
          'VIN Detected',
          `VIN: ${response.vin}\n\nWould you like to add this vehicle?`,
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Add Vehicle',
              onPress: () => navigation.replace('VehicleDetails', { vin: response.vin }),
            },
          ]
        );
      } else {
        Alert.alert('No VIN Found', 'Please try again with better lighting and angle.');
      }
    } catch (error: any) {
      Alert.alert('Scan Failed', error.response?.data?.message || 'Failed to scan VIN');
    } finally {
      setScanning(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <NeonHeader title="Scan VIN" />
        <View style={styles.centerContainer}>
          <Text style={styles.messageText}>Requesting camera permission...</Text>
        </View>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <NeonHeader title="Scan VIN" />
        <View style={styles.centerContainer}>
          <Text style={styles.messageText}>Camera permission denied</Text>
          <Text style={styles.subText}>Please enable camera access in settings</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NeonHeader title="Scan VIN" />

      <Camera
        style={styles.camera}
        type={CameraType.back}
        ref={(ref) => setCamera(ref)}
      >
        <View style={styles.overlay}>
          <View style={styles.scanFrame} />
          <Text style={styles.instructionText}>
            Position VIN number within the frame
          </Text>
        </View>
      </Camera>

      <View style={styles.controls}>
        <NeonButton
          title={scanning ? 'Scanning...' : 'Capture & Scan'}
          onPress={captureAndScan}
          loading={scanning}
          style={styles.scanButton}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('AddVehicleManual')}
          style={styles.manualButton}
        >
          <Text style={styles.manualText}>Enter VIN Manually</Text>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  messageText: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subText: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: '80%',
    height: 150,
    borderWidth: 3,
    borderColor: Colors.neonBlue,
    borderRadius: 12,
  },
  instructionText: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    marginTop: Spacing.xl,
    textAlign: 'center',
  },
  controls: {
    padding: Spacing.lg,
    backgroundColor: Colors.cardBg,
  },
  scanButton: {
    marginBottom: Spacing.md,
  },
  manualButton: {
    alignItems: 'center',
    padding: Spacing.md,
  },
  manualText: {
    fontSize: Typography.fontSize.md,
    color: Colors.neonBlue,
  },
});
