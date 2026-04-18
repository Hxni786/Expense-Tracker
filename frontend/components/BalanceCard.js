import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '../utils/calculations';

/**
 * The hero card at the top of the dashboard.
 * Shows the net balance prominently with income/expense sub-rows.
 *
 * Props:
 *  - balance      : number
 *  - totalIncome  : number
 *  - totalExpense : number
 */
const BalanceCard = ({ balance, totalIncome, totalExpense }) => {
  const isPositive = balance >= 0;

  return (
    <View style={styles.card}>
      {/* Background decorative circle */}
      <View style={styles.decorCircle} />

      <Text style={styles.eyebrow}>NET BALANCE</Text>

      <Text style={[styles.balanceAmount, { color: isPositive ? '#FFD600' : '#EF4444' }]}>
        {formatCurrency(balance)}
      </Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Income / Expense sub-row */}
      <View style={styles.subRow}>
        <View style={styles.subItem}>
          <View style={[styles.dot, { backgroundColor: '#22C55E' }]} />
          <View>
            <Text style={styles.subLabel}>INCOME</Text>
            <Text style={[styles.subAmount, { color: '#22C55E' }]}>
              {formatCurrency(totalIncome)}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.subItem}>
          <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
          <View>
            <Text style={styles.subLabel}>EXPENSE</Text>
            <Text style={[styles.subAmount, { color: '#EF4444' }]}>
              {formatCurrency(totalExpense)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0F1115',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,214,0,0.15)',
    padding: 28,
    marginBottom: 16,
    overflow: 'hidden',
    // iOS
    shadowColor: '#FFD600',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    // Android
    elevation: 8,
  },
  decorCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,214,0,0.04)',
    top: -60,
    right: -60,
  },
  eyebrow: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginBottom: 20,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  subLabel: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  subAmount: {
    fontSize: 15,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  separator: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: 16,
  },
});

export default BalanceCard;
