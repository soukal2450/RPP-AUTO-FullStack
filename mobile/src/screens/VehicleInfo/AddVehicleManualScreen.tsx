import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { NeonHeader, NeonButton, DarkInput } from '../../components/common';
import { Colors, Spacing } from '../../theme/colors';
import { SCREEN_NAMES } from '../../constants';
import ApiService from '../../services/api';

export const AddVehicleManualScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    vin: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    licensePlate: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.vin) newErrors.vin = 'VIN is required';
    if (!formData.make) newErrors.make = 'Make is required';
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.year) newErrors.year = 'Year is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddVehicle = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await ApiService.addVehicle(formData);

      Alert.alert(
        'Success',
        'Vehicle added successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate(SCREEN_NAMES.VEHICLE_LIST),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to add vehicle'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <NeonHeader title="Add Vehicle" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <DarkInput
          label="VIN Number *"
          placeholder="17-digit VIN"
          value={formData.vin}
          onChangeText={(value) => updateField('vin', value)}
          maxLength={17}
          autoCapitalize="characters"
          icon="barcode"
          error={errors.vin}
        />

        <DarkInput
          label="Make *"
          placeholder="e.g., Toyota"
          value={formData.make}
          onChangeText={(value) => updateField('make', value)}
          icon="car"
          error={errors.make}
        />

        <DarkInput
          label="Model *"
          placeholder="e.g., Camry"
          value={formData.model}
          onChangeText={(value) => updateField('model', value)}
          icon="car-sport"
          error={errors.model}
        />

        <DarkInput
          label="Year *"
          placeholder="e.g., 2020"
          value={formData.year}
          onChangeText={(value) => updateField('year', value)}
          keyboardType="numeric"
          maxLength={4}
          icon="calendar"
          error={errors.year}
        />

        <DarkInput
          label="Mileage (Optional)"
          placeholder="Current mileage"
          value={formData.mileage}
          onChangeText={(value) => updateField('mileage', value)}
          keyboardType="numeric"
          icon="speedometer"
        />

        <DarkInput
          label="License Plate (Optional)"
          placeholder="ABC-1234"
          value={formData.licensePlate}
          onChangeText={(value) => updateField('licensePlate', value)}
          autoCapitalize="characters"
          icon="document-text"
        />

        <NeonButton
          title="Add Vehicle"
          onPress={handleAddVehicle}
          loading={loading}
          style={styles.addButton}
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  addButton: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
});
