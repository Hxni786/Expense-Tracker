import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import BalanceCard from '../components/BalanceCard';
import SummaryCard from '../components/SummaryCard';
import TransactionItem from '../components/TransactionItem';
import { fetchTransactions } from '../services/api';
import { calculateSummary, formatCurrency } from '../utils/calculations';

// ─────────────────────────────────────────────────────────────
// Dashboard Screen
// ─────────────────────────────────────────────────────────────
const DashboardScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // ── Fetch data ──────────────────────────────────────────────
  const loadTransactions = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);

      const data = await fetchTransactions();
      const safeTransactions = Array.isArray(data) ? data : [];
      const sorted = [...safeTransactions].sort((a, b) => new Date(b.date) - new Date(a.date));

      setTransactions(sorted);
      setSummary(calculateSummary(sorted));
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      setError('Could not load transactions. Pull down to retry.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Reload every time the screen gains focus (e.g., after adding a transaction)
  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadTransactions(true);
  };

  // ── Render helpers ──────────────────────────────────────────
  const renderHeader = () => (
    <View style={[styles.listHeader, { paddingTop: Math.max(insets.top, 12) }]}>
      {/* ── App bar ── */}
      <View style={styles.appBar}>
        <View>
          <Text style={styles.appTitle}>Expense Tracker</Text>
          <Text style={styles.appSubtitle}>by Hxni</Text>
        </View>
        <TouchableOpacity
          style={styles.avatarBtn}
          onPress={() => Alert.alert('Profile', 'Profile screen coming soon!')}
          activeOpacity={0.7}
        >
          <Text style={styles.avatarText}>H</Text>
        </TouchableOpacity>
      </View>

      {/* ── Balance hero card ── */}
      <BalanceCard
        balance={summary.balance}
        totalIncome={summary.totalIncome}
        totalExpense={summary.totalExpense}
      />

      {/* ── 3-column summary row ── */}
      <View style={styles.summaryRow}>
        <SummaryCard
          label="Income"
          value={formatCurrency(summary.totalIncome)}
          color="#22C55E"
          icon="💹"
        />
        <SummaryCard
          label="Expense"
          value={formatCurrency(summary.totalExpense)}
          color="#EF4444"
          icon="📉"
        />
        <SummaryCard
          label="Balance"
          value={formatCurrency(summary.balance)}
          color="#FFD600"
          icon="⚖️"
        />
      </View>

      {/* ── Transactions section heading ── */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Transactions</Text>
        <Text style={styles.sectionCount}>{transactions.length} total</Text>
      </View>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <TransactionItem
      transaction={item}
      isLast={index === transactions.length - 1}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🧾</Text>
      <Text style={styles.emptyTitle}>No transactions yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the <Text style={{ color: '#FFD600' }}>＋</Text> button to add your first one
      </Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>⚠️</Text>
      <Text style={styles.emptyTitle}>Something went wrong</Text>
      <Text style={styles.emptySubtitle}>{error}</Text>
    </View>
  );

  // ── Loading state ───────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="light-content" backgroundColor="#030304" />
        <View style={styles.centeredLoader}>
          <ActivityIndicator size="large" color="#FFD600" />
          <Text style={styles.loadingText}>Loading transactions…</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── Main render ─────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#030304" />

      <FlatList
        data={error ? [] : transactions}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={error ? renderError : renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFD600"
            colors={['#FFD600']}
          />
        }
        // Wrap transaction rows in a card
        ListFooterComponent={transactions.length > 0 ? <View style={styles.listFooterSpacer} /> : null}
        ItemSeparatorComponent={null}
        style={styles.flatList}
        // Card wrapper rendered around the items list via sticky header trick
        stickyHeaderIndices={[]}
      />

      {/* Transaction list card background wrapper */}
      {/* (Achieved by padding + background styling in renderItem) */}

      {/* ── Floating Action Button ── */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() =>
          navigation
            ? navigation.navigate('AddTransaction')
            : Alert.alert('Add Transaction', 'Navigate to AddTransaction screen.')
        }
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// ─────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#030304',
  },
  flatList: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },

  // ── App bar ──
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 11,
    color: '#FFD600',
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 1,
  },
  avatarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#030304',
  },

  // ── Header wrapper ──
  listHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // ── Summary row ──
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: -4,
  },

  // ── Section heading ──
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  sectionCount: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },

  // ── Transaction list card ──
  transactionCard: {
    backgroundColor: '#0F1115',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  listFooterSpacer: {
    height: 16,
  },

  // ── Loading ──
  centeredLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
  loadingText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },

  // ── Empty / Error ──
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },

  // ── FAB ──
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFD600',
    alignItems: 'center',
    justifyContent: 'center',
    // iOS
    shadowColor: '#FFD600',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    // Android
    elevation: 10,
  },
  fabIcon: {
    fontSize: 28,
    color: '#030304',
    fontWeight: '800',
    lineHeight: 34,
    marginTop: -2,
  },
});

export default DashboardScreen;
