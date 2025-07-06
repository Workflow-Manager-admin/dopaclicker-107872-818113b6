import useSound from 'use-sound';

// Sound effect URLs - would be replaced with actual audio files
const SOUND_URLS = {
  click: '/sounds/click.mp3',
  upgrade: '/sounds/upgrade.mp3',
  reward: '/sounds/reward.mp3',
  levelUp: '/sounds/level-up.mp3',
  background: '/sounds/background-lofi.mp3'
};

export const useSoundEffects = () => {
  const [playClick] = useSound(SOUND_URLS.click, { volume: 0.5 });
  const [playUpgrade] = useSound(SOUND_URLS.upgrade, { volume: 0.7 });
  const [playReward] = useSound(SOUND_URLS.reward, { volume: 0.7 });
  const [playLevelUp] = useSound(SOUND_URLS.levelUp, { volume: 0.8 });
  const [playBackground, { stop: stopBackground }] = useSound(SOUND_URLS.background, { 
    volume: 0.3,
    loop: true 
  });

  return {
    playClick,
    playUpgrade,
    playReward,
    playLevelUp,
    playBackground,
    stopBackground
  };
};
