'use client'

interface ScoreTableProps {
  players: string[]
  scores: number[]
  currentPlayerIndex: number
}

export function ScoreTable({ players, scores, currentPlayerIndex }: ScoreTableProps) {
  // Create sorted leaderboard
  const leaderboard = players.map((name, index) => ({
    name,
    score: scores[index] || 0,
    index,
    isCurrent: index === currentPlayerIndex
  })).sort((a, b) => b.score - a.score)

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
      <h3 className="text-lg font-bold text-white mb-4 text-center">🏆 Leaderboard</h3>
      
      <div className="space-y-2">
        {leaderboard.map((player, position) => (
          <div
            key={player.index}
            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
              player.isCurrent
                ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center space-x-3">
              {/* Position Badge */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                position === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black' :
                position === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-black' :
                position === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-black' :
                'bg-white/20 text-white'
              }`}>
                {position + 1}
              </div>
              
              {/* Player Name */}
              <div className="text-white font-medium">
                {player.name}
                {player.isCurrent && (
                  <span className="ml-2 text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
                    Current
                  </span>
                )}
              </div>
            </div>

            {/* Score */}
            <div className={`text-lg font-bold ${
              player.score > 0 ? 'text-green-400' :
              player.score < 0 ? 'text-red-400' :
              'text-gray-400'
            }`}>
              {player.score > 0 ? '+' : ''}{player.score}
            </div>
          </div>
        ))}
      </div>

      {/* Score Legend */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="flex justify-center space-x-6 text-xs text-white/60">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>+1 Completed</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span>-1 Ignored</span>
          </div>
        </div>
      </div>
    </div>
  )
} 