import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Activity, ShieldAlert, Cpu } from 'lucide-react';

export default function HomeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [overlayActiveTab, setOverlayActiveTab] = useState<'none' | 'firmware' | 'integrity' | 'alerts'>('none');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    // Auto-play might fail due to browser policies if unmuted, so we default to isMuted = true
    video.muted = isMuted;
    if (isPlaying) {
      video.play().catch(() => {
        setIsPlaying(false);
      });
    }

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMuteUnmute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSpeedChange = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    video.currentTime = position * duration;
    setCurrentTime(position * duration);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <div className="relative group w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-200/20 shadow-2xl transition-all duration-500 hover:shadow-blue-900/10 hover:border-blue-500/30 font-sans" id="home-hero-video-container">
      {/* Chrome Menu Header */}
      <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-xs"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block shadow-xs"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block shadow-xs"></span>
          <span className="text-slate-400 font-mono text-[10px] ml-2 select-none tracking-wider">defendx-cockpit://dashboard-stream</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-[10px] bg-blue-500/15 border border-blue-500/30 text-blue-400 px-2.5 py-0.5 rounded-full font-mono font-bold animate-pulse">
            <Activity className="w-2.5 h-2.5" /> LIVE
          </span>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative aspect-video bg-black overflow-hidden select-none">
        <video
          ref={videoRef}
          src="https://wazuh.com/wp-content/themes/wazuh-v3/assets/images/home/wazuh-dashboard-wide.mp4"
          className="w-full h-full object-cover select-none"
          loop
          playsInline
          muted={isMuted}
          autoPlay
          onClick={handlePlayPause}
        />

        {/* Dynamic Holographic Interactive Overlays */}
        {overlayActiveTab === 'firmware' && (
          <div className="absolute top-1/4 left-1/4 bg-slate-950/90 border border-blue-500 text-blue-400 p-3 rounded-lg shadow-xl text-[10px] font-mono space-y-1 animate-fade-in z-20 backdrop-blur-md max-w-[200px]">
            <p className="font-bold uppercase tracking-wider text-white border-b border-blue-500/30 pb-1">Firmware Audit</p>
            <p className="flex justify-between"><span>Files Checked:</span><span>4,902</span></p>
            <p className="flex justify-between"><span>Violations:</span><span className="text-emerald-400 font-bold">0</span></p>
            <p className="text-emerald-400 font-bold uppercase tracking-widest text-[8px] pt-1">● COMPLIANT</p>
          </div>
        )}

        {overlayActiveTab === 'integrity' && (
          <div className="absolute bottom-1/3 right-1/4 bg-slate-950/90 border border-amber-500 text-amber-400 p-3 rounded-lg shadow-xl text-[10px] font-mono space-y-1 animate-fade-in z-20 backdrop-blur-md max-w-[200px]">
            <p className="font-bold uppercase tracking-wider text-white border-b border-amber-500/30 pb-1">File Integrity</p>
            <p className="flex justify-between"><span>FIM Daemons:</span><span>Active</span></p>
            <p className="flex justify-between"><span>Hashing Rate:</span><span>340MB/s</span></p>
            <p className="text-amber-400 font-bold uppercase tracking-widest text-[8px] pt-1">● MONITORING</p>
          </div>
        )}

        {overlayActiveTab === 'alerts' && (
          <div className="absolute top-1/3 right-1/3 bg-slate-950/90 border border-red-500 text-red-400 p-3 rounded-lg shadow-xl text-[10px] font-mono space-y-1 animate-fade-in z-20 backdrop-blur-md max-w-[200px]">
            <p className="font-bold uppercase tracking-wider text-white border-b border-red-500/30 pb-1">Alert Matrix</p>
            <p className="flex justify-between"><span>Critical Alerts:</span><span>0</span></p>
            <p className="flex justify-between"><span>Mitigated Threat:</span><span>42</span></p>
            <p className="text-emerald-400 font-bold uppercase tracking-widest text-[8px] pt-1">● PROTECTED</p>
          </div>
        )}

        {/* Interactive Feature Tags Hover-Trigger bar */}
        <div className="absolute top-3 left-3 flex gap-1.5 z-20">
          <button
            onClick={() => setOverlayActiveTab(overlayActiveTab === 'firmware' ? 'none' : 'firmware')}
            className={`px-3 py-1 rounded-sm text-[9px] font-mono font-bold tracking-wider uppercase border transition-all ${
              overlayActiveTab === 'firmware'
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-900/80 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Firmware Audit
          </button>
          <button
            onClick={() => setOverlayActiveTab(overlayActiveTab === 'integrity' ? 'none' : 'integrity')}
            className={`px-3 py-1 rounded-sm text-[9px] font-mono font-bold tracking-wider uppercase border transition-all ${
              overlayActiveTab === 'integrity'
                ? 'bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-slate-900/80 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            FIM Baselines
          </button>
          <button
            onClick={() => setOverlayActiveTab(overlayActiveTab === 'alerts' ? 'none' : 'alerts')}
            className={`px-3 py-1 rounded-sm text-[9px] font-mono font-bold tracking-wider uppercase border transition-all ${
              overlayActiveTab === 'alerts'
                ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-500/30'
                : 'bg-slate-900/80 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Threat Alerts
          </button>
        </div>

        {/* Hover Controls Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 z-20">
          {/* Progress Bar */}
          <div 
            onClick={handleProgressClick}
            className="w-full h-1 bg-slate-700 hover:h-2 rounded-full cursor-pointer transition-all relative overflow-hidden"
          >
            <div 
              className="absolute left-0 top-0 bottom-0 bg-blue-500"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            {/* Play/Pause/Mute */}
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePlayPause}
                className="text-slate-300 hover:text-white transition-colors"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              </button>
              
              <button 
                onClick={handleMuteUnmute}
                className="text-slate-300 hover:text-white transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-slate-400 font-mono text-[10px] select-none">
                {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')} / {Math.floor(duration / 60 || 0)}:{(Math.floor(duration % 60 || 0)).toString().padStart(2, '0')}
              </span>
            </div>

            {/* Playback Speeds and Fullscreen */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 rounded px-1.5 py-0.5">
                {[1, 1.5, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={`px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-sm transition-colors ${
                      playbackSpeed === speed ? 'bg-blue-600 text-white font-black' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              <button 
                onClick={handleFullscreen}
                className="text-slate-300 hover:text-white p-1"
                title="Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
