import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AddTransactionScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Add Transaction</Text>
      <Text style={styles.subtitle}>Form setup coming next.</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#030304',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#FFD600',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#030304',
    fontWeight: '700',
  },
});

export default AddTransactionScreen;
