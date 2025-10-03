import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload, Film, Trash2, Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ProfileDropdown } from "@/components/ProfileDropdown";

interface UploadedVideo {
  id: string;
  file: File;
  preview: string;
  thumbnail?: string;
  title: string;
  description: string;
}

const BiologyNature = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [mediaUploadOpen, setMediaUploadOpen] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<UploadedVideo | null>(null);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoSubmit = () => {
    if (!videoFile || !videoTitle.trim() || !videoDescription.trim()) {
      alert('Please fill in all required fields and select a video');
      return;
    }

    const newVideo: UploadedVideo = {
      id: Date.now().toString(),
      file: videoFile,
      preview: videoPreview!,
      thumbnail: thumbnailPreview || undefined,
      title: videoTitle,
      description: videoDescription,
    };

    setUploadedVideos(prev => [...prev, newVideo]);
    setMediaUploadOpen(false);
    
    // Reset form
    setVideoFile(null);
    setVideoPreview(null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setVideoTitle('');
    setVideoDescription('');
  };

  const handleDeleteVideo = (id: string) => {
    setUploadedVideos(prev => prev.filter(v => v.id !== id));
    if (selectedVideo?.id === id) {
      setSelectedVideo(null);
    }
  };

  const openVideoPlayer = (video: UploadedVideo) => {
    setSelectedVideo(video);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Navigation Bar */}
      <nav className="bg-[#395B50] text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/lesson-vault-04-06">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Biology & Nature Videos</h1>
          </div>
          <ProfileDropdown 
            profileImage={profileImage} 
            onLogout={handleLogout}
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-[#395B50]">Video Library</h2>
            <Dialog open={mediaUploadOpen} onOpenChange={setMediaUploadOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#395B50] hover:bg-[#2d4840] text-white">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Video
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Upload Biology & Nature Video</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="video">Video File *</Label>
                    <div className="mt-2">
                      <Input
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="cursor-pointer"
                      />
                      {videoPreview && (
                        <div className="mt-4">
                          <video src={videoPreview} controls className="w-full rounded-lg" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="thumbnail">Thumbnail (Optional)</Label>
                    <div className="mt-2">
                      <Input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="cursor-pointer"
                      />
                      {thumbnailPreview && (
                        <div className="mt-4">
                          <img src={thumbnailPreview} alt="Thumbnail preview" className="w-32 h-32 object-cover rounded-lg" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="Enter video title"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                      placeholder="Enter video description"
                      className="mt-2 min-h-[100px]"
                    />
                  </div>

                  <Button 
                    onClick={handleVideoSubmit}
                    className="w-full bg-[#395B50] hover:bg-[#2d4840]"
                  >
                    Upload Video
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Video Grid */}
          {uploadedVideos.length === 0 ? (
            <Card className="p-12 text-center">
              <Film className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No videos uploaded yet</h3>
              <p className="text-gray-500 mb-4">Start building your Biology & Nature video library</p>
              <Button 
                onClick={() => setMediaUploadOpen(true)}
                className="bg-[#395B50] hover:bg-[#2d4840]"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Your First Video
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div 
                      className="relative cursor-pointer group"
                      onClick={() => openVideoPlayer(video)}
                    >
                      {video.thumbnail ? (
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                          <Film className="h-16 w-16 text-white" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="h-16 w-16 text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2">{video.title}</CardTitle>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{video.description}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => openVideoPlayer(video)}
                        className="flex-1"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Play
                      </Button>
                      <Button 
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Video Player Modal */}
      {selectedVideo && (
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedVideo.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <video 
                src={selectedVideo.preview} 
                controls 
                autoPlay
                className="w-full rounded-lg"
              />
              <p className="text-gray-600">{selectedVideo.description}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BiologyNature;
