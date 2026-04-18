import axios from 'axios';

// ─── Change this to your machine's local IP when testing on a physical device ───
// e.g. 'http://192.168.1.10:5000'
const BASE_URL = 'https://chilly-doodles-tap.loca.lt';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'bypass-tunnel-reminder': 'true',
  },
});

export const fetchTransactions = async () => {
  try {
    const response = await apiClient.get('/api/transactions');
    const payload = response.data;

    // Defensive check: Ensure payload is an object and has identifying JSON structure
    if (!payload || typeof payload !== 'object') {
      console.warn('API returned non-object response:', payload);
      return [];
    }

    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    
    return [];
  } catch (err) {
    console.error('fetchTransactions error:', err.message);
    throw err; // Re-throw so DashboardScreen can catch and show the error message inside the UI
  }
};

export default apiClient;
