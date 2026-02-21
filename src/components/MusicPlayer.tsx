import React, { useState } from 'react';
import { 
  Music, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Heart, 
  Repeat,
  Shuffle,
  List,
  Headphones
} from 'lucide-react';
import Navigation from './Navigation';
import { User } from '../types/User';

interface MusicPlayerProps {
  user: User;
  onLogout: () => void;
}

const MusicPlayer = ({ user, onLogout }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
  const [volume, setVolume] = useState(75);

  const playlists = [
    {
      id: 1,
      name: "Anxiety Relief",
      description: "Calming sounds to ease anxious thoughts",
      trackCount: 24,
      duration: "1h 45m",
      color: "from-blue-400 to-cyan-500",
      image: "🌊",
      category: "anxiety",
      tracks: [
        { id: 1, title: "Ocean Waves", artist: "Nature Sounds", duration: "5:32", moodEffect: "Calming" },
        { id: 2, title: "Deep Breathing Meditation", artist: "Mindful Guide", duration: "8:15", moodEffect: "Relaxing" },
        { id: 3, title: "Forest Rain", artist: "Nature Sounds", duration: "6:20", moodEffect: "Peaceful" },
        { id: 4, title: "Gentle Piano Flow", artist: "Calm Melodies", duration: "4:45", moodEffect: "Soothing" }
      ]
    },
    {
      id: 2,
      name: "Depression Support",
      description: "Uplifting music to brighten your mood",
      trackCount: 32,
      duration: "2h 15m",
      color: "from-green-400 to-emerald-500",
      image: "🌱",
      category: "depression",
      tracks: [
        { id: 5, title: "Morning Sunshine", artist: "Hopeful Tunes", duration: "3:42", moodEffect: "Uplifting" },
        { id: 6, title: "Positive Affirmations", artist: "Self-Love", duration: "7:30", moodEffect: "Encouraging" },
        { id: 7, title: "Acoustic Hope", artist: "Healing Strings", duration: "4:18", moodEffect: "Inspiring" },
        { id: 8, title: "Gentle Recovery", artist: "Therapy Music", duration: "5:55", moodEffect: "Healing" }
      ]
    },
    {
      id: 3,
      name: "Sleep & Relaxation",
      description: "Soothing sounds for better sleep",
      trackCount: 18,
      duration: "3h 20m",
      color: "from-purple-400 to-pink-500",
      image: "🌙",
      category: "sleep",
      tracks: [
        { id: 9, title: "Nighttime Stories", artist: "Sleep Guide", duration: "12:45", moodEffect: "Sleep-inducing" },
        { id: 10, title: "White Noise Ocean", artist: "Sleep Sounds", duration: "60:00", moodEffect: "Relaxing" },
        { id: 11, title: "Lullaby Dreams", artist: "Peaceful Nights", duration: "4:32", moodEffect: "Calming" },
        { id: 12, title: "Deep Sleep Meditation", artist: "Rest Easy", duration: "15:20", moodEffect: "Restful" }
      ]
    },
    {
      id: 4,
      name: "Focus & Study",
      description: "Background music for concentration",
      trackCount: 28,
      duration: "2h 5m",
      color: "from-orange-400 to-red-500",
      image: "📚",
      category: "focus",
      tracks: [
        { id: 13, title: "Brown Noise Study", artist: "Focus Sounds", duration: "45:00", moodEffect: "Concentrating" },
        { id: 14, title: "Classical Study Mix", artist: "Academic Music", duration: "6:15", moodEffect: "Focused" },
        { id: 15, title: "Lo-fi Hip Hop", artist: "Study Beats", duration: "3:48", moodEffect: "Relaxed Focus" },
        { id: 16, title: "Nature Ambience", artist: "Study Nature", duration: "8:30", moodEffect: "Peaceful" }
      ]
    },
    {
      id: 5,
      name: "Stress Relief",
      description: "Quick stress-busting audio therapy",
      trackCount: 16,
      duration: "55m",
      color: "from-indigo-400 to-purple-500",
      image: "🧘‍♀️",
      category: "stress",
      tracks: [
        { id: 17, title: "5-Minute Calm", artist: "Quick Relief", duration: "5:00", moodEffect: "Instant Relief" },
        { id: 18, title: "Breathing Exercise", artist: "Stress Away", duration: "3:30", moodEffect: "Calming" },
        { id: 19, title: "Progressive Relaxation", artist: "Tension Release", duration: "12:15", moodEffect: "Releasing" },
        { id: 20, title: "Mindfulness Bell", artist: "Present Moment", duration: "2:45", moodEffect: "Centering" }
      ]
    },
    {
      id: 6,
      name: "Mood Booster",
      description: "Energizing tracks to lift your spirits",
      trackCount: 25,
      duration: "1h 30m",
      color: "from-yellow-400 to-orange-500",
      image: "☀️",
      category: "mood",
      tracks: [
        { id: 21, title: "Happy Vibes", artist: "Mood Lifter", duration: "3:22", moodEffect: "Energizing" },
        { id: 22, title: "Confidence Boost", artist: "Self Esteem", duration: "4:10", moodEffect: "Empowering" },
        { id: 23, title: "Morning Motivation", artist: "Start Strong", duration: "5:45", moodEffect: "Motivating" },
        { id: 24, title: "Positive Energy", artist: "Good Vibes", duration: "3:55", moodEffect: "Uplifting" }
      ]
    }
  ];

  const playTrack = (track: any, playlist: any) => {
    setCurrentTrack({ ...track, playlist: playlist.name });
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getMoodEffectColor = (effect: string) => {
    switch (effect.toLowerCase()) {
      case 'calming':
      case 'relaxing':
      case 'peaceful':
        return 'bg-blue-100 text-blue-700';
      case 'uplifting':
      case 'encouraging':
      case 'inspiring':
      case 'energizing':
      case 'motivating':
        return 'bg-green-100 text-green-700';
      case 'healing':
      case 'soothing':
        return 'bg-purple-100 text-purple-700';
      case 'sleep-inducing':
      case 'restful':
        return 'bg-indigo-100 text-indigo-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (selectedPlaylist) {
    return (
      <div className="flex">
        <Navigation user={user} onLogout={onLogout} />
        <main className="flex-1 ml-64 p-8">
          <button
            onClick={() => setSelectedPlaylist(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Playlists
          </button>

          {/* Playlist Header */}
          <div className={`bg-gradient-to-br ${selectedPlaylist.color} rounded-2xl p-8 text-white mb-6`}>
            <div className="flex items-center">
              <div className="text-6xl mr-6">{selectedPlaylist.image}</div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{selectedPlaylist.name}</h1>
                <p className="text-lg opacity-90 mb-4">{selectedPlaylist.description}</p>
                <div className="flex items-center space-x-6">
                  <span>{selectedPlaylist.trackCount} tracks</span>
                  <span>{selectedPlaylist.duration}</span>
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-2 rounded-full font-medium transition-colors flex items-center">
                    <Play className="h-5 w-5 mr-2" />
                    Play All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Track List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Tracks</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {selectedPlaylist.tracks.map((track: any, index: number) => (
                <div
                  key={track.id}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => playTrack(track, selectedPlaylist)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                        <Music className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{track.title}</h3>
                        <p className="text-sm text-gray-600">{track.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodEffectColor(track.moodEffect)}`}>
                        {track.moodEffect}
                      </span>
                      <span className="text-sm text-gray-600">{track.duration}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTrack(track, selectedPlaylist);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-2"
                      >
                        <Play className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Navigation user={user} onLogout={onLogout} />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Music Therapy</h1>
          <p className="text-gray-600">Scientifically-curated playlists designed to improve your mental wellbeing</p>
        </div>

        {/* Now Playing (if track is selected) */}
        {currentTrack && (
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-2xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Music className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{currentTrack.title}</h3>
                  <p className="opacity-90">{currentTrack.artist}</p>
                  <p className="text-sm opacity-80">From: {currentTrack.playlist}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="hover:bg-white hover:bg-opacity-20 p-3 rounded-full transition-colors">
                  <SkipBack className="h-6 w-6" />
                </button>
                <button 
                  onClick={togglePlay}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-full transition-colors"
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </button>
                <button className="hover:bg-white hover:bg-opacity-20 p-3 rounded-full transition-colors">
                  <SkipForward className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Music Therapy Benefits */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Headphones className="h-6 w-6 text-blue-600 mr-2" />
            How Music Therapy Helps Mental Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Neuroplasticity</h3>
              <p className="text-sm text-gray-600">Music rewires your brain for better emotional regulation</p>
            </div>
            <div>
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Natural Chemistry</h3>
              <p className="text-sm text-gray-600">Releases dopamine, serotonin, and reduces cortisol</p>
            </div>
            <div>
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Heart Rate Sync</h3>
              <p className="text-sm text-gray-600">Regulates breathing and heart rate for calm</p>
            </div>
            <div>
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Focus & Memory</h3>
              <p className="text-sm text-gray-600">Improves cognitive function and concentration</p>
            </div>
          </div>
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer overflow-hidden"
              onClick={() => setSelectedPlaylist(playlist)}
            >
              <div className={`bg-gradient-to-br ${playlist.color} h-32 flex items-center justify-center text-4xl`}>
                {playlist.image}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{playlist.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{playlist.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <List className="h-4 w-4 mr-1" />
                    <span>{playlist.trackCount} tracks</span>
                  </div>
                  <div className="flex items-center">
                    <Music className="h-4 w-4 mr-1" />
                    <span>{playlist.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (playlist.tracks[0]) {
                        playTrack(playlist.tracks[0], playlist);
                      }
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play Now
                  </button>
                  <button className="text-gray-400 hover:text-red-500 p-2 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Controls */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Relief Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { name: "2-Min Breathing", duration: "2:00", effect: "Instant Calm", icon: "🫁" },
              { name: "5-Min Meditation", duration: "5:00", effect: "Deep Relaxation", icon: "🧘‍♀️" },
              { name: "10-Min Focus", duration: "10:00", effect: "Mental Clarity", icon: "🎯" },
              { name: "15-Min Sleep Prep", duration: "15:00", effect: "Better Sleep", icon: "😴" }
            ].map((session, index) => (
              <button
                key={index}
                onClick={() => {
                  const quickTrack = {
                    id: `quick-${index}`,
                    title: session.name,
                    artist: "Therapy Sessions",
                    duration: session.duration,
                    moodEffect: session.effect
                  };
                  playTrack(quickTrack, { name: "Quick Relief" });
                }}
                className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-all text-center"
              >
                <div className="text-3xl mb-2">{session.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{session.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{session.effect}</p>
                <div className="text-sm text-blue-600 font-medium">{session.duration}</div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MusicPlayer;