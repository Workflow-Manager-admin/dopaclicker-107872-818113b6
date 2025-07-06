import React, { useState, useEffect } from 'react';
import './App.css';
import GameButton from './components/GameButton';
import ProgressBar from './components/ProgressBar';
import UpgradePanel from './components/UpgradePanel';

// Mock upgrades data - will be replaced with backend data
const initialUpgrades = [
  {
    id: 1,
    name: "Double Click",
    description: "Double your click power",
    cost: 10,
    multiplier: 2
  },
  {
    id: 2,
    name: "Auto Clicker",
    description: "Automatically click once per second",
    cost: 50,
    clicksPerSecond: 1
  }
];

// PUBLIC_INTERFACE
function App() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [currentClicks, setCurrentClicks] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [maxXp, setMaxXp] = useState(100);
  const [upgrades, setUpgrades] = useState(initialUpgrades);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleClick = () => {
    const newClicks = clickPower;
    setTotalClicks(prev => prev + newClicks);
    setCurrentClicks(prev => prev + newClicks);
    setXp(prev => {
      const newXp = prev + newClicks;
      if (newXp >= maxXp) {
        setLevel(prev => prev + 1);
        setMaxXp(prev => prev * 1.5);
        return newXp - maxXp;
      }
      return newXp;
    });
  };

  const handleUpgrade = (upgradeId) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (upgrade && currentClicks >= upgrade.cost) {
      setCurrentClicks(prev => prev - upgrade.cost);
      if (upgrade.multiplier) {
        setClickPower(prev => prev * upgrade.multiplier);
      }
      // Remove purchased upgrade from list
      setUpgrades(prev => prev.filter(u => u.id !== upgradeId));
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
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
            <span>Total Clicks: {totalClicks}</span>
            <span>Current Clicks: {currentClicks}</span>
          </div>
        </div>

        <div className="game-main">
          <ProgressBar 
            current={xp}
            max={maxXp}
            level={level}
          />
          <GameButton onClick={handleClick} />
        </div>

        <UpgradePanel 
          upgrades={upgrades}
          onUpgrade={handleUpgrade}
          currentClicks={currentClicks}
        />
      </div>
    </div>
  );
}

export default App;
