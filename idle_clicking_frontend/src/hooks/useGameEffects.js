import { useState, useEffect } from 'react';
import { useSoundEffects } from './useSoundEffects';

export const useGameEffects = (gameState) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [showEffects, setShowEffects] = useState({
    levelUp: false,
    upgrade: false,
    reward: false
  });

  const {
    playClick,
    playUpgrade,
    playReward,
    playLevelUp,
    playBackground,
    stopBackground
  } = useSoundEffects();

  // Handle background music
  useEffect(() => {
    if (isMusicEnabled) {
      playBackground();
    } else {
      stopBackground();
    }
    return () => stopBackground();
  }, [isMusicEnabled, playBackground, stopBackground]);

  // Handle level up effects
  useEffect(() => {
    if (gameState?.justLeveledUp) {
      setShowEffects(prev => ({ ...prev, levelUp: true }));
      if (isSoundEnabled) playLevelUp();
    }
  }, [gameState?.level, isSoundEnabled, playLevelUp]);

  const handleClick = (clickHandler, clickPower) => {
    if (isSoundEnabled) playClick();
    clickHandler(clickPower);
  };

  const handleUpgrade = (upgradeHandler, upgradeId) => {
    if (isSoundEnabled) playUpgrade();
    upgradeHandler(upgradeId);
    setShowEffects(prev => ({ ...prev, upgrade: true }));
  };

  const handleReward = (rewardHandler, rewardId) => {
    if (isSoundEnabled) playReward();
    rewardHandler?.(rewardId);
    setShowEffects(prev => ({ ...prev, reward: true }));
  };

  const clearEffects = () => {
    setShowEffects({
      levelUp: false,
      upgrade: false,
      reward: false
    });
  };

  return {
    isSoundEnabled,
    setIsSoundEnabled,
    isMusicEnabled,
    setIsMusicEnabled,
    showEffects,
    handleClick,
    handleUpgrade,
    handleReward,
    clearEffects
  };
};
