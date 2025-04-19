import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Header from './components/Header';
import MapView from './components/MapView';
// import StoryModal from './components/StoryModal';
// import ContributeModal from './components/ContributeModal';
import { sampleStories } from './data/sampleStories';
import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    identity: '',
    theme: 'purple',
    language: 'en'
  });
  const [stories, setStories] = useState(sampleStories);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Apply theme from user preferences
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', userPreferences.theme);
  }, [userPreferences.theme]);

  const startApp = (preferences) => {
    setUserPreferences(preferences);
    setShowWelcome(false);
  };

  const handleStorySelect = (story) => {
    setSelectedStory(story);
    setShowStoryModal(true);
  };

  const handleAddStory = (newStory) => {
    // Add a unique ID and timestamp to the new story
    const storyWithId = {
      ...newStory,
      id: stories.length + 1,
      timestamp: new Date().toISOString()
    };
    setStories([...stories, storyWithId]);
    setShowContributeModal(false);
  };

  const filteredStories = activeFilter === 'all' 
    ? stories 
    : stories.filter(story => story.type === activeFilter);

  return (
    <Router>
      <div className="app">
        {showWelcome ? (
          <Welcome onStart={startApp} />
        ) : (
          <>
            <Header 
              userIdentity={userPreferences.identity}
              onContributeClick={() => setShowContributeModal(true)}
            />
            <div className="main-container">
              <Routes>
                <Route path="/" element={
                  <MapView 
                    stories={stories}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    filteredStories={filteredStories}
                    onStorySelect={handleStorySelect}
                  />
                } />
                {/* Add more routes here as needed */}
              </Routes>
            </div>

            {showStoryModal && selectedStory && (
              <StoryModal 
                story={selectedStory} 
                onClose={() => setShowStoryModal(false)} 
              />
            )}

            {showContributeModal && (
              <ContributeModal 
                onSubmit={handleAddStory}
                onClose={() => setShowContributeModal(false)}
              />
            )}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;