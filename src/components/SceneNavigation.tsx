
import React from 'react';

interface Scene {
  id: string;
  title: string;
  timeRange: string;
  description: string;
  voiceover: string;
  color?: string;
}

interface SceneNavigationProps {
  scenes: Scene[];
  activeScene: string;
  onSceneChange: (sceneId: string) => void;
}

const SceneNavigation = ({ scenes, activeScene, onSceneChange }: SceneNavigationProps) => {
  return (
    <div className="glass-card p-4">
      <h3 className="text-lg font-heading font-semibold mb-4">Video Timeline</h3>
      
      <div className="space-y-1">
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex flex-col ${
              scene.id === activeScene 
                ? 'bg-nextgen-purple/20 border-l-2 border-nextgen-purple' 
                : 'hover:bg-white/5'
            }`}
            onClick={() => onSceneChange(scene.id)}
          >
            <div className="flex justify-between items-center">
              <span className={`font-medium ${scene.id === activeScene ? 'text-white' : 'text-white/80'}`}>
                {scene.title}
              </span>
              <span className="text-xs text-white/60">{scene.timeRange}</span>
            </div>
            <span className="text-xs text-white/60 mt-1 line-clamp-1">
              {scene.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SceneNavigation;
