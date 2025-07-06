import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './App.css';
import GameButton from './components/GameButton';
import ProgressBar from './components/ProgressBar';
import UpgradePanel from './components/UpgradePanel';
import RewardsPanel from './components/RewardsPanel';
import DopamineEffects from './components/DopamineEffects';
import { useGame } from './hooks/useGame';
import { useGameEffects } from './hooks/useGameEffects';

const queryClient = new QueryClient();

// Game component separated from App to use hooks inside QueryClientProvider
const GameComponent = () => {
  const {
    gameState,
    upgrades,
    leaderboard,
    isLoading,
    handleGameClick,
    handleUpgradeAction,
  } = useGame();
  
  const [theme, setTheme] = useState('light');
  
  const {
    isSoundEnabled,
    setIsSoundEnabled,
    isMusicEnabled,
    setIsMusicEnabled,
    showEffects,
    handleClick,
    handleUpgrade,
    handleReward,
    clearEffects
  } = useGameEffects(gameState);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (isLoading) {
    return <div className="loading">Loading game...</div>;
  }

  return (
    <div className="App">
      <Toaster position="top-right" />
      <DopamineEffects
        isLevelUp={showEffects.levelUp}
        isUpgrade={showEffects.upgrade}
        isReward={showEffects.reward}
        onEffectComplete={clearEffects}
      />
      <div className="game-container">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        
        <div className="game-header">
          <h1>Dopamine Clicker</h1>
          <div className="stats">
            <span>Total Clicks: {gameState?.totalClicks || 0}</span>
            <span>Current Clicks: {gameState?.currentClicks || 0}</span>
          </div>
        </div>

        <div className="game-main">
          <ProgressBar 
            current={gameState?.xp || 0}
            max={gameState?.maxXp || 100}
            level={gameState?.level || 1}
          />
          <GameButton onClick={() => handleClick(() => handleGameClick(gameState?.clickPower || 1), gameState?.clickPower || 1)} />
        </div>

        <UpgradePanel 
          upgrades={upgrades || []}
          onUpgrade={(upgradeId) => handleUpgrade(handleUpgradeAction, upgradeId)}
          currentClicks={gameState?.currentClicks || 0}
        />

        {leaderboard && (
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
              {leaderboard.map((entry, index) => (
                <li key={index}>
                  {entry.username}: {entry.score}
                </li>
              ))}
            </ul>
          </div>
        )}

        <RewardsPanel
          rewards={gameState?.rewards || []}
          onClaimReward={(rewardId) => handleReward(null, rewardId)}
        />

        <div className="sound-controls">
          <button
            className={`sound-button ${isSoundEnabled ? 'active' : ''}`}
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            aria-label="Toggle sound effects"
          >
            {isSoundEnabled ? '🔊' : '🔇'}
          </button>
          <button
            className={`sound-button ${isMusicEnabled ? 'active' : ''}`}
            onClick={() => setIsMusicEnabled(!isMusicEnabled)}
            aria-label="Toggle background music"
          >
            {isMusicEnabled ? '🎵' : '🎵'}
          </button>
        </div>
      </div>
    </div>
  );
};

// PUBLIC_INTERFACE
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameComponent />
    </QueryClientProvider>
  );
}

export default App;
