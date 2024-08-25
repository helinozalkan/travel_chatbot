import React from 'react';
import './SettingsModal.css';

const SettingsModal = ({ onClose, onAvatarSelect, avatars }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Avatar Seç</h2>
        <div className="avatar-grid">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index}`}
              className="avatar-option"
              onClick={() => onAvatarSelect(avatar)}
            />
          ))}
        </div>
        <button onClick={onClose} className="close-button">
          Kapat
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
