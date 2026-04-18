import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DashboardScreen from './screens/DashboardScreen';
import AddTransactionScreen from './screens/AddTransactionScreen';

// ── Diagnostic Error Boundary ────────────────────────────────
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CRITICAL APP ERROR:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={diagnostics.container}>
          <Text style={diagnostics.title}>⚠️ Diagnostic Mode</Text>
          <Text style={diagnostics.subtitle}>The app crashed. Please tell me the error below:</Text>
          <View style={diagnostics.errorBox}>
            <Text style={diagnostics.errorText}>{this.state.error}</Text>
          </View>
        </View>
      );
    }
    return this.props.children;
  }
}

const diagnostics = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#030304', justifyContent: 'center', padding: 30 },
  title: { color: '#FFD600', fontSize: 24, fontWeight: '800', marginBottom: 5 },
  subtitle: { color: '#94A3B8', fontSize: 14, marginBottom: 20 },
  errorBox: { backgroundColor: '#1A1A1A', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#EF4444' },
  errorText: { color: '#EF4444', fontFamily: 'monospace', fontSize: 13 },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#030304' },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
