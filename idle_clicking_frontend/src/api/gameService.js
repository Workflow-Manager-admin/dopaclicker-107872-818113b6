import axios from 'axios';

const BASE_URL = 'https://vscode-internal-55737-beta.beta01.cloud.kavia.ai:3001';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const gameService = {
  // External API endpoints
  getMemeTemplates: async () => {
    try {
      const response = await api.get('/external/meme_templates');
      return response.data;
    } catch (error) {
      console.error('Error fetching meme templates:', error);
      throw error;
    }
  },

  getAudiusTrending: async () => {
    try {
      const response = await api.get('/external/audius_trending');
      return response.data;
    } catch (error) {
      console.error('Error fetching Audius tracks:', error);
      throw error;
    }
  },

  getNewsHeadlines: async () => {
    try {
      const response = await api.get('/external/news_headlines');
      return response.data;
    } catch (error) {
      console.error('Error fetching news headlines:', error);
      throw error;
    }
  },

  // Game endpoints
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
