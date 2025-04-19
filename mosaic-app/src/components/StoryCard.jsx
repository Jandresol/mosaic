import React from 'react';
import '../styles/StoryCard.css';

const StoryCard = ({ story, onClick }) => {
  return (
    <div className="story-card" onClick={onClick}>
      <div className="story-header">
        <h3 className="story-title">{story.title}</h3>
        <span className="story-region">{story.region}</span>
      </div>
      <p className="story-storyteller">By {story.storyteller}</p>
      <p className="story-preview">{story.preview}</p>
      <div className="story-tags">
        {story.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};
