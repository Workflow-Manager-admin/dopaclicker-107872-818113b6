import React, { useCallback } from 'react';
import Confetti from 'react-confetti';
import { toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';

const DopamineEffects = ({ 
  isLevelUp = false,
  isUpgrade = false,
  isReward = false,
  onEffectComplete
}) => {
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  React.useEffect(() => {
    if (isLevelUp) {
      triggerConfetti();
      toast.success('Level Up! 🎉', {
        icon: '⭐',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
    if (isUpgrade) {
      toast.success('Upgrade Unlocked! 🚀', {
        icon: '💪',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
    if (isReward) {
      triggerConfetti();
      toast.success('Bonus Reward! 🎁', {
        icon: '🎁',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }

    const timer = setTimeout(() => {
      onEffectComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLevelUp, isUpgrade, isReward, triggerConfetti, onEffectComplete]);

  return (
    <>
      {(isLevelUp || isReward) && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
    </>
  );
};

export default DopamineEffects;
