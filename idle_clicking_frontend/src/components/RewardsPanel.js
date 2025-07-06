import React from 'react';

const RewardsPanel = ({ rewards, onClaimReward }) => {
  return (
    <div className="rewards-panel">
      <h2>Rewards & Bonuses</h2>
      <div className="rewards-list">
        {rewards.map((reward) => (
          <div key={reward.id} className="reward-item">
            <div className="reward-content">
              {reward.type === 'meme' && (
                <img 
                  src={reward.imageUrl} 
                  alt="Reward meme" 
                  className="reward-meme"
                />
              )}
              <div className="reward-info">
                <h3>{reward.title}</h3>
                <p>{reward.description}</p>
                {!reward.claimed && (
                  <button 
                    onClick={() => onClaimReward(reward.id)}
                    className="claim-button"
                  >
                    Claim Reward!
                  </button>
                )}
              </div>
            </div>
            {reward.claimed && (
              <div className="claimed-badge">
                Claimed! 🎉
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsPanel;
