
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KitFile } from '../../types/kits';
import { Download, FileText, Archive, Image, File } from 'lucide-react';

interface DownloadsSectionProps {
  files: KitFile[];
}

const getFileIcon = (fileType: string) => {
  const iconClass = "h-5 w-5";
  
  if (fileType.includes('pdf')) return <FileText className={iconClass} />;
  if (fileType.includes('zip') || fileType.includes('archive')) return <Archive className={iconClass} />;
  if (fileType.includes('image')) return <Image className={iconClass} />;
  return <File className={iconClass} />;
};

const formatFileSize = (sizeStr: string | null) => {
  if (!sizeStr) return '';
  
  // If it's already formatted, return as is
  if (sizeStr.includes('KB') || sizeStr.includes('MB') || sizeStr.includes('GB')) {
    return ` (${sizeStr})`;
  }
  
  // If it's a number, format it
  const bytes = parseInt(sizeStr);
  if (isNaN(bytes)) return '';
  
  if (bytes < 1024) return ` (${bytes} B)`;
  if (bytes < 1024 * 1024) return ` (${(bytes / 1024).toFixed(1)} KB)`;
  if (bytes < 1024 * 1024 * 1024) return ` (${(bytes / (1024 * 1024)).toFixed(1)} MB)`;
  return ` (${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB)`;
};

const DownloadsSection: React.FC<DownloadsSectionProps> = ({ files }) => {
  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="text-3xl">📄</div>
        <div>
          <h2 className="text-3xl font-bold text-white">Downloads</h2>
          <p className="text-white/70">Essential files and resources for your practice</p>
        </div>
      </div>

      {files.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <Card key={file.id} className="glass-card hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="text-nextgen-purple">
                    {getFileIcon(file.file_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{file.file_name}</div>
                    <div className="text-sm text-white/60 font-normal">
                      {file.file_type.toUpperCase()}{formatFileSize(file.file_size)}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-nextgen-purple hover:bg-nextgen-purple/90 text-white group-hover:shadow-lg transition-all duration-300"
                  onClick={() => window.open(file.file_url, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/70">No downloads available for this kit yet.</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default DownloadsSection;
