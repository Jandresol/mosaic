import React from 'react';
import '../styles/Modal.css';

const StoryModal = ({ story, onClose }) => {
  return (
    <div className="modal active">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>×</button>
        <div className="story-content" dangerouslySetInnerHTML={{ __html: story.content }} />
      </div>
    </div>
  );
};

export default StoryModal;
