import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface DateItemProps {
  readonly icon: keyof typeof Ionicons.glyphMap;
  readonly label: string;
  readonly date: string;
  readonly time: string;
}

export const DateItem: React.FC<DateItemProps> = ({ icon, label, date, time }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={22} color="#007d79" />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  iconWrapper: {
    marginRight: 10,
    marginTop: 2,
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 2,
  },
  date: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  time: {
    fontSize: 11,
    color: '#64748b',
  },
});
