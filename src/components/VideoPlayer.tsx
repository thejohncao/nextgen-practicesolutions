
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface Scene {
  id: string;
  title: string;
  timeRange: string;
  description: string;
  voiceover: string;
  color?: string;
  agents?: Array<{
    name: string;
    role: string;
  }>;
}

interface VideoPlayerProps {
  scenes: Scene[];
  activeScene: string;
  onSceneChange: (sceneId: string) => void;
}

const VideoPlayer = ({ scenes, activeScene, onSceneChange }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(10); // Initial progress at 10% (in scene 1)
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would actually play/pause the video
  };
  
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // In a real implementation, this would mute/unmute the video
  };
  
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const timelineElement = e.currentTarget;
    const rect = timelineElement.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newProgress = (clickPosition / rect.width) * 100;
    
    setProgress(newProgress);
    
    // Determine which scene was clicked based on the progress
    const sceneDuration = 100 / scenes.length;
    const sceneIndex = Math.floor(newProgress / sceneDuration);
    const clickedScene = scenes[Math.min(sceneIndex, scenes.length - 1)];
    
    if (clickedScene) {
      onSceneChange(clickedScene.id);
    }
  };
  
  return (
    <div className="relative overflow-hidden rounded-xl glass-card animate-fade-in">
      {/* Video placeholder */}
      <div className="aspect-video w-full bg-gradient-to-br from-nextgen-dark to-black/90 flex items-center justify-center">
        {/* Simulated video content - this would be a real video in production */}
        <div className="text-center p-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-nextgen-purple/20 flex items-center justify-center mb-4">
            <Play className={`h-10 w-10 text-nextgen-purple ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
          </div>
          <h3 className="text-lg font-heading font-medium mb-2">NextGen Practice Solutions Demo</h3>
          <p className="text-sm text-white/60">Experience the AI Operating System for Modern Practices</p>
        </div>
      </div>
      
      {/* Video controls overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 flex items-end">
        <div className="w-full p-4">
          {/* Timeline bar with scene markers */}
          <div className="relative w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer" onClick={handleTimelineClick}>
            {/* Progress bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-nextgen-purple rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
            
            {/* Scene markers */}
            {scenes.map((scene, index) => {
              const position = (index / scenes.length) * 100;
              const isActiveScene = scene.id === activeScene;
              
              return (
                <div 
                  key={scene.id}
                  className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300 ${isActiveScene ? 'bg-nextgen-purple scale-125' : 'bg-white/50'}`}
                  style={{ left: `${position}%`, transform: `translateX(-50%) translateY(-50%) ${isActiveScene ? 'scale(1.25)' : 'scale(1)'}` }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSceneChange(scene.id);
                  }}
                >
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2">
                    <div className={`whitespace-nowrap text-xs px-2 py-1 rounded bg-black/70 ${isActiveScene ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                      {scene.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 text-white" />
                )}
              </button>
              
              <button 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                onClick={handleMuteToggle}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-white" />
                ) : (
                  <Volume2 className="h-4 w-4 text-white" />
                )}
              </button>
              
              <div className="text-sm text-white/70">
                {activeScene ? scenes.find(scene => scene.id === activeScene)?.timeRange : '0:00-0:00'}
              </div>
            </div>
            
            <div className="text-sm text-white/70">
              1:15 total
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
