import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import StoryCard from './StoryCard';
import '../styles/MapView.css';

const MapView = ({ 
  stories, 
  sidebarOpen, 
  setSidebarOpen, 
  activeFilter, 
  setActiveFilter, 
  filteredStories, 
  onStorySelect 
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Ensure the map redraws when the sidebar state changes
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'traditions', label: 'Traditions' },
    { id: 'folktales', label: 'Folktales' },
    { id: 'history', label: 'History' },
    { id: 'music', label: 'Music' },
    { id: 'food', label: 'Food' }
  ];

  return (
    <div className="map-container">
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        style={{ height: '100%', width: '100%' }}
        whenCreated={map => { mapRef.current = map; }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {stories.map(story => (
          <Marker 
            key={story.id} 
            position={story.location}
            eventHandlers={{
              click: () => onStorySelect(story)
            }}
          >
            <Popup>
              <strong>{story.title}</strong><br />
              {story.region}<br />
              <button onClick={() => onStorySelect(story)}>
                View Story
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <button 
        className={`toggle-sidebar ${!sidebarOpen ? 'hidden' : ''}`}
        onClick={toggleSidebar}
      >
        {sidebarOpen ? '›' : '‹'}
      </button>

      <div className={`sidebar ${!sidebarOpen ? 'hidden' : ''}`}>
        <h2>Stories Near You</h2>
        <div className="filters">
          {filterOptions.map(option => (
            <button 
              key={option.id}
              className={`filter-btn ${activeFilter === option.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        <div className="stories-container">
          {filteredStories.map(story => (
            <StoryCard 
              key={story.id} 
              story={story} 
              onClick={() => onStorySelect(story)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
