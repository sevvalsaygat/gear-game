'use client'

import { useEffect, useState } from 'react'

interface GameEndModalProps {
  players: string[]
  scores: number[]
  isVisible: boolean
  onNewGame: () => void
}

export function GameEndModal({ players, scores, isVisible, onNewGame }: GameEndModalProps) {
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowCelebration(true)
      const timer = setTimeout(() => setShowCelebration(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!isVisible) return null

  // Get winner and final standings
  const finalStandings = players.map((name, index) => ({
    name,
    score: scores[index] || 0,
    index
  })).sort((a, b) => b.score - a.score)

  const winner = finalStandings[0]
  const hasWinner = winner.score > finalStandings[1]?.score

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Celebration Effects */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${1 + Math.random() * 2}rem`
              }}
            >
              {['🎉', '🏆', '🎊', '⭐', '🎯'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Winner Modal */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden transform animate-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <div className="text-6xl mb-2 animate-bounce">
              🏆
            </div>
            <h2 className="text-3xl font-bold drop-shadow-lg mb-2">
              GAME COMPLETED!
            </h2>
            {hasWinner ? (
              <p className="text-xl opacity-90">
                🎉 {winner.name} Wins! 🎉
              </p>
                         ) : (
               <p className="text-xl opacity-90">
                 It&apos;s a Tie!
               </p>
             )}
          </div>
        </div>

        {/* Final Standings */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Final Standings</h3>
          
          <div className="space-y-3 mb-8">
            {finalStandings.map((player, position) => (
              <div
                key={player.index}
                className={`flex items-center justify-between p-4 rounded-2xl ${
                  position === 0 
                    ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400' 
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Position */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                    position === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black' :
                    position === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-black' :
                    position === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-black' :
                    'bg-gray-300 text-gray-700'
                  }`}>
                    {position + 1}
                  </div>
                  
                  {/* Player Name */}
                  <div className={`text-xl font-bold ${
                    position === 0 ? 'text-yellow-800' : 'text-gray-800'
                  }`}>
                    {player.name}
                    {position === 0 && hasWinner && (
                      <span className="ml-2 text-base">👑</span>
                    )}
                  </div>
                </div>

                {/* Score */}
                <div className={`text-2xl font-bold ${
                  player.score > 0 ? 'text-green-600' :
                  player.score < 0 ? 'text-red-600' :
                  'text-gray-500'
                }`}>
                  {player.score > 0 ? '+' : ''}{player.score}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onNewGame}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              🎮 New Game
            </button>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Wheel of Fortune Results',
                    text: `Game completed! Winner: ${winner.name} with ${winner.score} points!`,
                  }).catch(() => {
                    // Fallback: copy to clipboard
                    const results = finalStandings.map((p, i) => `${i + 1}. ${p.name}: ${p.score}`).join('\n')
                    navigator.clipboard?.writeText(`Wheel of Fortune Results:\n${results}`)
                  })
                }
              }}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              📤 Share Results
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 