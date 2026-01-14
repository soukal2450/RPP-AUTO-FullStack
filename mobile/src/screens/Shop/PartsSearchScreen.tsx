import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { NeonHeader, GlassCard, NeonButton } from '../../components/common';
import { Colors, Typography, Spacing, BorderRadius } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { SCREEN_NAMES } from '../../constants';
import ApiService from '../../services/api';

export const PartsSearchScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchParts = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const response = await ApiService.searchParts(searchQuery);
      setResults(response.parts || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const PartCard = ({ part }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREEN_NAMES.PARTS_DETAILS, { partId: part.id })}
    >
      <GlassCard style={styles.partCard}>
        <View style={styles.partHeader}>
          <View style={styles.partImagePlaceholder}>
            <Ionicons name="construct" size={32} color={Colors.neonBlue} />
          </View>
          <View style={styles.partInfo}>
            <Text style={styles.partName}>{part.name}</Text>
            <Text style={styles.partBrand}>{part.brand}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={Colors.warning} />
              <Text style={styles.ratingText}>{part.rating} ({part.reviews})</Text>
            </View>
          </View>
          <View style={styles.partRight}>
            <Text style={styles.partPrice}>${part.price}</Text>
            <Text style={styles.partStock}>{part.inStock ? 'In Stock' : 'Out of Stock'}</Text>
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NeonHeader title="Parts Shop" showBack={false} rightIcon="cart" onRightPress={() => navigation.navigate(SCREEN_NAMES.CART)} />

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search parts..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={searchParts}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {results.length > 0 ? (
          results.map((part: any) => <PartCard key={part.id} part={part} />)
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-circle" size={80} color={Colors.textMuted} />
            <Text style={styles.emptyText}>Search for automotive parts</Text>
            <Text style={styles.emptySubtext}>Engine, brakes, filters, and more</Text>
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
  searchContainer: {
    padding: Spacing.lg,
    paddingBottom: 0,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: Typography.fontSize.md,
    color: Colors.textPrimary,
  },
  content: {
    padding: Spacing.lg,
    flexGrow: 1,
  },
  partCard: {
    marginBottom: Spacing.md,
  },
  partHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: Colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  partName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  partBrand: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
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
  partRight: {
    alignItems: 'flex-end',
  },
  partPrice: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neonBlue,
  },
  partStock: {
    fontSize: Typography.fontSize.sm,
    color: Colors.success,
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
  },
});
