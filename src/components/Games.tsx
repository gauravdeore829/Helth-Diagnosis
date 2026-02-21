import React, { useState } from 'react';
import { 
  Gamepad2, 
  Play, 
  Pause, 
  RotateCcw, 
  Timer, 
  Star, 
  Trophy,
  Smile,
  Zap
} from 'lucide-react';
import Navigation from './Navigation';
import { User } from '../types/User';

interface GamesProps {
  user: User;
  onLogout: () => void;
}

const Games = ({ user, onLogout }: GamesProps) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [breathingSession, setBreathingSession] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [moodPoints, setMoodPoints] = useState(1247);

  const games = [
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      description: 'Guided breathing to reduce stress and anxiety',
      icon: '🫁',
      difficulty: 'Beginner',
      duration: '5 min',
      points: 50,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'meditation',
      title: 'Mindful Meditation',
      description: 'Calm your mind with guided meditation',
      icon: '🧘‍♂️',
      difficulty: 'Beginner',
      duration: '10 min',
      points: 100,
      color: 'from-green-400 to-teal-500'
    },
    {
      id: 'puzzles',
      title: 'Mind Puzzles',
      description: 'Engaging puzzles to distract from worries',
      icon: '🧩',
      difficulty: 'Medium',
      duration: '15 min',
      points: 75,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'coloring',
      title: 'Digital Coloring',
      description: 'Therapeutic coloring for relaxation',
      icon: '🎨',
      difficulty: 'Easy',
      duration: '20 min',
      points: 80,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'nature',
      title: 'Nature Sounds',
      description: 'Immerse yourself in calming nature sounds',
      icon: '🌿',
      difficulty: 'Easy',
      duration: '30 min',
      points: 60,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'journal',
      title: 'Gratitude Journal',
      description: 'Write down things you\'re grateful for',
      icon: '📝',
      difficulty: 'Easy',
      duration: '10 min',
      points: 90,
      color: 'from-indigo-400 to-purple-500'
    }
  ];

  const playGame = (gameId: string) => {
    setSelectedGame(gameId);
    if (gameId === 'breathing') {
      setBreathingSession(true);
      // Simple breathing cycle simulation
      let phase = 0;
      const phases = ['inhale', 'hold', 'exhale'] as const;
      const interval = setInterval(() => {
        setBreathingPhase(phases[phase % 3]);
        phase++;
        if (phase > 12) { // 4 complete cycles
          clearInterval(interval);
          setBreathingSession(false);
          setMoodPoints(prev => prev + 50);
          setSelectedGame(null);
        }
      }, 4000);
    } else {
      // Simulate completing other games
      setTimeout(() => {
        const game = games.find(g => g.id === gameId);
        if (game) {
          setMoodPoints(prev => prev + game.points);
        }
        setSelectedGame(null);
      }, 3000);
    }
  };

  if (selectedGame === 'breathing' && breathingSession) {
    return (
      <div className="flex">
        <Navigation user={user} onLogout={onLogout} />
        <main className="flex-1 ml-64 p-8">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className={`w-64 h-64 mx-auto mb-8 rounded-full border-4 ${
                breathingPhase === 'inhale' ? 'border-blue-400 bg-blue-100 scale-125' :
                breathingPhase === 'hold' ? 'border-purple-400 bg-purple-100 scale-125' :
                'border-green-400 bg-green-100 scale-100'
              } transition-all duration-4000 flex items-center justify-center`}>
                <span className="text-6xl">🫁</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 capitalize">{breathingPhase}</h2>
              <p className="text-gray-600 text-lg">
                {breathingPhase === 'inhale' ? 'Breathe in slowly...' :
                 breathingPhase === 'hold' ? 'Hold your breath...' :
                 'Breathe out gently...'}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (selectedGame && selectedGame !== 'breathing') {
    return (
      <div className="flex">
        <Navigation user={user} onLogout={onLogout} />
        <main className="flex-1 ml-64 p-8">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center animate-spin">
                <Gamepad2 className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Playing {games.find(g => g.id === selectedGame)?.title}...</h2>
              <p className="text-gray-600">Enjoy your stress relief session!</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stress Relief Games</h1>
          <p className="text-gray-600">Interactive activities designed to help you relax and reduce stress</p>
          
          {/* Mood Points Display */}
          <div className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 text-white inline-block">
            <div className="flex items-center">
              <Star className="h-6 w-6 mr-2" />
              <span className="font-bold text-lg">{moodPoints} Mood Points</span>
            </div>
          </div>
        </div>

        {/* Featured Game */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Daily Wellness Challenge</h2>
              <p className="text-lg opacity-90 mb-4">Complete today's breathing exercise for bonus points!</p>
              <button
                onClick={() => playGame('breathing')}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Challenge (+50 points)
              </button>
            </div>
            <div className="text-8xl opacity-20">🏆</div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
              <div className={`bg-gradient-to-br ${game.color} h-32 flex items-center justify-center text-4xl`}>
                {game.icon}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{game.title}</h3>
                <p className="text-gray-600 mb-4">{game.description}</p>
                
                <div className="flex justify-between items-center mb-4 text-sm">
                  <div className="flex items-center text-blue-600">
                    <Timer className="h-4 w-4 mr-1" />
                    <span>{game.duration}</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Zap className="h-4 w-4 mr-1" />
                    <span>{game.points} pts</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    game.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {game.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => playGame(game.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Mood Boosters */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Mood Boosters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Take 5 Deep Breaths", icon: "💨", points: 10 },
              { title: "Smile for 30 Seconds", icon: "😊", points: 15 },
              { title: "Stretch Your Arms", icon: "🙆‍♂️", points: 20 },
              { title: "Think of Something Good", icon: "💭", points: 25 }
            ].map((booster, index) => (
              <button
                key={index}
                onClick={() => setMoodPoints(prev => prev + booster.points)}
                className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-all text-center"
              >
                <div className="text-3xl mb-2">{booster.icon}</div>
                <h3 className="font-medium text-gray-900 mb-1">{booster.title}</h3>
                <div className="text-sm text-green-600">+{booster.points} points</div>
              </button>
            ))}
          </div>
        </div>

        {/* Achievement Section */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                Recent Achievements
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Smile className="h-4 w-4 text-green-500 mr-2" />
                  <span>Completed 7-day wellness streak!</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                  <span>Earned 1000+ mood points this week</span>
                </div>
              </div>
            </div>
            <div className="text-4xl opacity-50">🏅</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Games;