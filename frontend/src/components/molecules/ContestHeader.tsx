import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../theme';

export interface ContestHeaderProps {
  readonly title: string;
  readonly tags: readonly string[];
  readonly certificateNote: string;
  readonly prizePool: string;
  readonly entryFee: string;
  readonly spotsLeft: number;
  readonly totalSpots: number;
  readonly isRegistered?: boolean;
}

export const ContestHeader: React.FC<ContestHeaderProps> = ({
  title,
  tags,
  certificateNote,
  prizePool,
  entryFee,
  spotsLeft,
  totalSpots,
  isRegistered = true,
}) => {
  const bookedSpots = Math.max(0, totalSpots - spotsLeft);
  const progressPercent = Math.min(100, Math.max(5, (bookedSpots / totalSpots) * 100));

  return (
    <View style={styles.card}>
      {/* Title & Registration Badge */}
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {isRegistered && (
          <View style={styles.registeredBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#007d79" />
            <Text style={styles.registeredText}>Registered</Text>
          </View>
        )}
      </View>

      {/* Tags Row */}
      <View style={styles.tagsRow}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tagPill}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        <View style={styles.certificateRow}>
          <Ionicons name="trophy-outline" size={14} color="#007d79" />
          <Text style={styles.certificateText}>{certificateNote}</Text>
        </View>
      </View>

      {/* Metrics Row (3 Columns) */}
      <View style={styles.metricsRow}>
        {/* Prize Pool */}
        <View style={styles.metricCol}>
          <Text style={styles.metricLabel}>Prize Pool</Text>
          <Text style={styles.prizePoolValue}>{prizePool}</Text>
        </View>

        {/* Entry Fee */}
        <View style={styles.metricCol}>
          <Text style={styles.metricLabel}>Entry Fee</Text>
          <Text style={styles.entryFeeValue}>{entryFee}</Text>
        </View>

        {/* Spots Left & Progress */}
        <View style={[styles.metricCol, styles.spotsCol]}>
          <View style={styles.spotsCountRow}>
            <Ionicons name="people-outline" size={13} color="#007d79" />
            <Text style={styles.spotsLeftText}>Only {spotsLeft} spots left</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.bookedText}>
            {bookedSpots} / {totalSpots} Booked
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e8eeee',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginRight: 10,
    lineHeight: 26,
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f7f5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#bce4da',
  },
  registeredText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007d79',
    marginLeft: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tagPill: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  certificateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 2,
  },
  certificateText: {
    fontSize: 12,
    color: '#007d79',
    fontWeight: '500',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  metricCol: {
    flex: 1,
  },
  spotsCol: {
    flex: 1.3,
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: '400',
  },
  prizePoolValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007d79',
  },
  entryFeeValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  spotsCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  spotsLeftText: {
    fontSize: 12,
    color: '#007d79',
    fontWeight: '600',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007d79',
    borderRadius: 2,
  },
  bookedText: {
    fontSize: 11,
    color: '#64748b',
  },
});
