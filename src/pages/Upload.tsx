
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload as UploadIcon, 
  FileText, 
  Video, 
  Globe, 
  Trash2, 
  Eye,
  Download,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'url';
  size: string;
  status: 'processing' | 'complete' | 'error';
  progress: number;
  uploadedAt: Date;
}

export default function Upload() {
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Product_Manual_v2.pdf',
      type: 'pdf',
      size: '2.4 MB',
      status: 'complete',
      progress: 100,
      uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Training_Video_Introduction.mp4',
      type: 'video',
      size: '15.2 MB',
      status: 'processing',
      progress: 67,
      uploadedAt: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '3',
      name: 'https://company.com/help-center',
      type: 'url',
      size: '~500 pages',
      status: 'complete',
      progress: 100,
      uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    }
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'url': return Globe;
      default: return FileText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return CheckCircle;
      case 'error': return AlertCircle;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Knowledge Upload</h1>
        <p className="text-muted-foreground">
          Upload PDFs, videos, or websites to train your AI assistant
        </p>
      </div>

      {/* Upload Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Upload Files
            </CardTitle>
            <CardDescription>PDFs, documents, and training materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <UploadIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag & drop files here, or click to select
              </p>
              <Button variant="outline" size="sm">
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* YouTube Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              YouTube Videos
            </CardTitle>
            <CardDescription>Extract knowledge from video content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Enter YouTube URL..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
              <Button className="w-full" disabled={!youtubeUrl}>
                Process Video
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Website Crawl */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Website Crawl
            </CardTitle>
            <CardDescription>Index website content and documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Enter website URL..."
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
              <Button className="w-full" disabled={!websiteUrl}>
                Crawl Website
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Uploaded Files */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Content</CardTitle>
          <CardDescription>Manage your knowledge base content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type);
              const StatusIcon = getStatusIcon(file.status);
              
              return (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <FileIcon className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{file.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.uploadedAt.toLocaleDateString()}</span>
                      </div>
                      {file.status === 'processing' && (
                        <div className="mt-2">
                          <Progress value={file.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">
                            Processing... {file.progress}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        file.status === 'complete' ? 'default' :
                        file.status === 'error' ? 'destructive' : 'secondary'
                      }
                    >
                      {StatusIcon && <StatusIcon className="h-3 w-3 mr-1" />}
                      {file.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
