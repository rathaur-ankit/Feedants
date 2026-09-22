import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface CountdownBannerProps {
  readonly countdown: string;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ countdown }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftCol}>
        <Ionicons name="hourglass-outline" size={16} color="#007d79" />
        <Text style={styles.labelText}>Registration closes in</Text>
      </View>
      <Text style={styles.timerText}>{countdown}</Text>
      <View style={styles.rightCol}>
        <Ionicons name="timer-outline" size={15} color="#007d79" />
        <Text style={styles.hurryText}>Hurry up!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#edf8f7',
    borderWidth: 1,
    borderColor: '#ccebe8',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    marginTop: 14,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  labelText: {
    color: '#1e293b',
    fontSize: 12,
    fontWeight: '500',
  },
  timerText: {
    color: '#006466',
    fontSize: 13,
    fontWeight: '700',
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hurryText: {
    color: '#007d79',
    fontSize: 12,
    fontWeight: '700',
  },
});
