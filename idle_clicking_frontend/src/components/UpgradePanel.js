import React from 'react';
import './UpgradePanel.css';

// PUBLIC_INTERFACE
const UpgradePanel = ({ upgrades, onUpgrade, currentClicks }) => {
  return (
    <div className="upgrade-panel">
      <h2>Upgrades</h2>
      <div className="upgrades-list">
        {upgrades.map((upgrade) => (
          <button
            key={upgrade.id}
            className={`upgrade-item ${currentClicks >= upgrade.cost ? 'available' : 'locked'}`}
            onClick={() => onUpgrade(upgrade.id)}
            disabled={currentClicks < upgrade.cost}
          >
            <div className="upgrade-info">
              <h3>{upgrade.name}</h3>
              <p>{upgrade.description}</p>
              <span className="upgrade-cost">Cost: {upgrade.cost} clicks</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UpgradePanel;
