import axios from 'axios';

const BASE_URL = 'https://vscode-internal-55737-beta.beta01.cloud.kavia.ai:3001';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const gameService = {
  // Click actions
  registerClick: async (clickPower) => {
    try {
      const response = await api.post('/click', { power: clickPower });
      return response.data;
    } catch (error) {
      console.error('Error registering click:', error);
      throw error;
    }
  },

  // Get available upgrades
  getUpgrades: async () => {
    try {
      const response = await api.get('/upgrades');
      return response.data;
    } catch (error) {
      console.error('Error fetching upgrades:', error);
      throw error;
    }
  },

  // Purchase upgrade
  purchaseUpgrade: async (upgradeId) => {
    try {
      const response = await api.post(`/upgrades/${upgradeId}/purchase`);
      return response.data;
    } catch (error) {
      console.error('Error purchasing upgrade:', error);
      throw error;
    }
  },

  // Get game state
  getGameState: async () => {
    try {
      const response = await api.get('/game-state');
      return response.data;
    } catch (error) {
      console.error('Error fetching game state:', error);
      throw error;
    }
  },

  // Get leaderboard
  getLeaderboard: async () => {
    try {
      const response = await api.get('/leaderboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  },
};
