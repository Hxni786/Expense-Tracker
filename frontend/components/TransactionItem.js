import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency, formatDate } from '../utils/calculations';

/**
 * Category → emoji mapping.
 * Extend this object as new categories are added to the backend.
 */
const CATEGORY_ICONS = {
  food: '🍔',
  groceries: '🛒',
  transport: '🚌',
  salary: '💼',
  rent: '🏠',
  entertainment: '🎬',
  shopping: '🛍️',
  health: '💊',
  education: '📚',
  travel: '✈️',
  utilities: '💡',
  freelance: '💻',
  investment: '📈',
  gift: '🎁',
  other: '💰',
};

const getCategoryIcon = (category = '') =>
  CATEGORY_ICONS[category.toLowerCase()] ?? '💰';

/**
 * Single row in the transactions list.
 *
 * Props:
 *  - transaction: { id, amount, category, type, date }
 *  - isLast     : boolean – suppresses bottom border on last item
 */
const TransactionItem = ({ transaction, isLast }) => {
  const { amount, category, type, date } = transaction;
  const isIncome = type === 'income';
  const amountColor = isIncome ? '#22C55E' : '#EF4444';
  const prefix = isIncome ? '+' : '-';

  return (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      {/* Left: icon bubble + category/date */}
      <View style={styles.left}>
        <View style={[styles.iconBubble, { backgroundColor: `${amountColor}18` }]}>
          <Text style={styles.icon}>{getCategoryIcon(category)}</Text>
        </View>
        <View>
          <Text style={styles.category}>{category || 'Uncategorized'}</Text>
          <Text style={styles.date}>{formatDate(date)}</Text>
        </View>
      </View>

      {/* Right: amount */}
      <Text style={[styles.amount, { color: amountColor }]}>
        {prefix}{formatCurrency(Math.abs(parseFloat(amount)))}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBubble: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  category: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: 3,
  },
  date: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '400',
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    letterSpacing: 0.3,
  },
});

export default TransactionItem;
