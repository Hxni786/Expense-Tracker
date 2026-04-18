import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * A compact card used in the 3-column summary row.
 *
 * Props:
 *  - label   : string  – e.g. "Income", "Expense", "Balance"
 *  - value   : string  – pre-formatted currency string
 *  - color   : string  – accent color for value text & glow
 *  - icon    : string  – emoji icon shown above label
 */
const SummaryCard = ({ label, value, color, icon }) => {
  return (
    <View style={[styles.card, { shadowColor: color, borderColor: `${color}22` }]}>
      {/* Subtle top accent line */}
      <View style={[styles.accentBar, { backgroundColor: color }]} />

      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.value, { color }]} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#0F1115',
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    overflow: 'hidden',
    // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    // Android shadow
    elevation: 6,
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    opacity: 0.85,
  },
  icon: {
    fontSize: 18,
    marginBottom: 6,
    marginTop: 4,
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    letterSpacing: 0.3,
    marginBottom: 3,
  },
  label: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});

export default SummaryCard;
