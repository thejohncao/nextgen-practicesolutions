
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KitVideo } from '../../types/kits';
import { Play, Video } from 'lucide-react';

interface VideosSectionProps {
  videos: KitVideo[];
}

const VideosSection: React.FC<VideosSectionProps> = ({ videos }) => {
  const getVideoEmbedUrl = (url: string) => {
    // Handle YouTube URLs
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('/').pop()?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Handle Vimeo URLs
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    // Return original URL for direct video files or other platforms
    return url;
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="text-3xl">🎥</div>
        <div>
          <h2 className="text-3xl font-bold text-white">Training Videos</h2>
          <p className="text-white/70">Video tutorials and training materials</p>
        </div>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="glass-card hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white">
                  <Play className="h-5 w-5 text-nextgen-purple" />
                  <span>{video.title}</span>
                </CardTitle>
                {video.description && (
                  <p className="text-white/70 text-sm">{video.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={getVideoEmbedUrl(video.video_url)}
                    title={video.title}
                    className="w-full h-full"
                    allowFullScreen
                    frameBorder="0"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <Video className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/70">No training videos available for this kit yet.</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default VideosSection;
