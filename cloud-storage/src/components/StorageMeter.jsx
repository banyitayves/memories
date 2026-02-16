import React from 'react';
import '../styles/StorageMeter.css';

function StorageMeter({ storage }) {
  const percentage = (storage.used / storage.total) * 100;
  const getColor = () => {
    if (percentage > 80) return '#ef4444';
    if (percentage > 60) return '#f97316';
    return '#10b981';
  };

  return (
    <div className="storage-meter">
      <h3>Storage</h3>
      <div className="storage-bar">
        <div 
          className="storage-used" 
          style={{ 
            width: `${percentage}%`,
            backgroundColor: getColor()
          }}
        />
      </div>
      <div className="storage-info">
        <span className="used">{storage.used}GB</span>
        <span className="total">of {storage.total}GB</span>
      </div>
      <div className="storage-percent">{percentage.toFixed(1)}% used</div>
      <button className="upgrade-btn">⬆️ Upgrade Plan</button>
    </div>
  );
}

export default StorageMeter;
