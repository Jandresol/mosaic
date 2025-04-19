import React, { useState, useRef } from 'react';
import '../styles/Modal.css';

const ContributeModal = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    storyteller: '',
    region: '',
    type: 'folktale',
    inputMethod: 'text',
    storyText: '',
    tags: '',
    location: [0, 0] // Default location
  });
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('Ready to record');
  const [audioURL, setAudioURL] = useState('');
  
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleInputMethodChange = (e) => {
    setFormData(prev => ({ ...prev, inputMethod: e.target.value }));
  };
  
  const handleRecordClick = async () => {
    if (!isRecording) {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];
        
        mediaRecorderRef.current.ondataavailable = (e) => {
          audioChunksRef.current.push(e.data);
        };
        
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);
        };
        
        mediaRecorderRef.current.start();
        setIsRecording(true);
        setRecordingStatus('Recording in progress...');
      } catch (err) {
        console.error('Error accessing microphone:', err);
        setRecordingStatus('Error: Could not access microphone');
      }
    } else {
      // Stop recording
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingStatus('Recording complete');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process form data
    const tags = formData.tags.split(',').map(tag => tag.trim());
    
    // Create preview from the first part of the story text
    const preview = formData.storyText.length > 150 
      ? `${formData.storyText.substring(0, 150)}...` 
      : formData.storyText;
    
    // Format the content as HTML
    const content = `
      <h2>${formData.title}</h2>
      <p class="storyteller">As told by ${formData.storyteller}</p>
      <div class="story-full-content">
        <p>${formData.storyText.replace(/\n\n/g, '</p><p>')}</p>
      </div>
      <div class="educational-resources">
        <h3>Educational Resources</h3>
        <button class="resource-btn">Lesson Plan</button>
        <button class="resource-btn">Children's Storybook</button>
        <button class="resource-btn">Discussion Questions</button>
      </div>
    `;
    
    // Submit the new story
    onSubmit({
      title: formData.title,
      storyteller: formData.storyteller,
      region: formData.region,
      type: formData.type,
      preview,
      content,
      tags,
      location: formData.location,
      audioURL: audioURL || null
    });
  };
  
  return (
    <div className="modal active">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>×</button>
        <h2>Share Your Cultural Story</h2>
        <p>Record an oral history, upload an audio file, or write your story directly. Your contribution will help preserve cultural knowledge for future generations.</p>
        
        <form className="story-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="storyTitle">Story Title</label>
            <input 
              type="text" 
              id="title" 
              value={formData.title}
              onChange={handleChange}
              placeholder="Give your story a memorable name" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="storyteller">Storyteller</label>
            <input 
              type="text" 
              id="storyteller"
              value={formData.storyteller}
              onChange={handleChange}
              placeholder="Who is sharing this story? (Name or Anonymous)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="region">Region of Origin</label>
            <input 
              type="text" 
              id="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="Where does this story come from?"
            />
          </div>
          
          <div className="form-group">
            <label>Story Type</label>
            <select 
              id="type" 
              value={formData.type}
              onChange={handleChange}
            >
              <option value="folktale">Folktale</option>
              <option value="history">Historical Event</option>
              <option value="tradition">Cultural Tradition</option>
              <option value="music">Music & Dance</option>
              <option value="food">Food & Cuisine</option>
              <option value="crafts">Arts & Crafts</option>
              <option value="language">Language & Expressions</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Choose Your Input Method</label>
            <select 
              id="inputMethod" 
              value={formData.inputMethod}
              onChange={handleInputMethodChange}
            >
              <option value="text">Write Your Story</option>
              <option value="record">Record Audio</option>
              <option value="upload">Upload Audio File</option>
            </select>
          </div>
          
          {formData.inputMethod === 'text' && (
            <div className="form-group">
              <label htmlFor="storyText">Your Story</label>
              <textarea 
                id="storyText" 
                value={formData.storyText}
                onChange={handleChange}
                rows="6" 
                placeholder="Share your story here..."
              />
            </div>
          )}
          
          {formData.inputMethod === 'record' && (
            <div className="form-group">
              <div className="recording-interface">
                <button 
                  type="button" 
                  className={`record-btn ${isRecording ? 'recording' : ''}`}
                  onClick={handleRecordClick}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="6" fill="white"/>
                  </svg>
                </button>
                <div className="record-status">{recordingStatus}</div>
                {audioURL && (
                  <audio 
                    ref={audioRef}
                    className="audio-preview" 
                    controls 
                    src={audioURL}
                  />
                )}
              </div>
            </div>
          )}
          
          {formData.inputMethod === 'upload' && (
            <div className="form-group">
              <label htmlFor="audioFile">Upload Audio File</label>
              <input type="file" id="audioFile" accept="audio/*" />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="tags">Tags (separate with commas)</label>
            <input 
              type="text" 
              id="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="migration, resilience, family, traditions"
            />
          </div>
          
          <button type="submit" className="submit-btn">Submit Story</button>
        </form>
      </div>
    </div>
  );
};

export default ContributeModal;