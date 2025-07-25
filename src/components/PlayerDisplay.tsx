'use client'

interface PlayerDisplayProps {
  players: string[]
  currentPlayerIndex: number
  totalSpins: number
  spinsPerPlayer: number
  currentPlayerSpins: number
}

export function PlayerDisplay({ players, currentPlayerIndex, totalSpins, spinsPerPlayer, currentPlayerSpins }: PlayerDisplayProps) {
  const currentPlayer = players[currentPlayerIndex]
  const previousPlayerIndex = (currentPlayerIndex - 1 + players.length) % players.length
  const previousPlayer = players[previousPlayerIndex]
  
  // Determine next player based on remaining spins
  const hasMoreSpins = (currentPlayerSpins + 1) < spinsPerPlayer
  const nextPlayerIndex = hasMoreSpins ? currentPlayerIndex : (currentPlayerIndex + 1) % players.length
  const nextPlayer = players[nextPlayerIndex]
  const isNextPlayerSame = nextPlayerIndex === currentPlayerIndex

  return (
    <div className="text-center space-y-4">
      {/* Current Player - Highlighted */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-2xl shadow-lg">
        <div className="text-sm font-medium">Current Player</div>
        <div className="text-xl font-bold">{currentPlayer}</div>
        <div className="text-sm font-medium mt-1">
          Spin {currentPlayerSpins + 1} of {spinsPerPlayer}
        </div>
      </div>

      {/* Navigation Info */}
      <div className="grid grid-cols-2 gap-4 text-white/80">
        {/* Previous Player */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
          <div className="text-xs font-medium mb-1">Previous</div>
          <div className="text-sm font-bold">{previousPlayer}</div>
        </div>

        {/* Next Player */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
          <div className="text-xs font-medium mb-1">
            {isNextPlayerSame ? 'Same Player' : 'Next'}
          </div>
          <div className="text-sm font-bold">{nextPlayer}</div>
          {isNextPlayerSame && (
            <div className="text-xs text-white/60 mt-1">
              Spin {currentPlayerSpins + 2} of {spinsPerPlayer}
            </div>
          )}
        </div>
      </div>

      {/* Spin Progress Bar */}
      <div className="bg-white/10 rounded-full p-1 border border-white/20">
        <div 
          className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentPlayerSpins + 1) / spinsPerPlayer) * 100}%` }}
        ></div>
      </div>

      {/* Game Stats */}
      <div className="flex justify-center space-x-4 text-white/70 text-xs">
        <div>
          <span className="font-medium">Round:</span> {Math.floor(totalSpins / (players.length * spinsPerPlayer)) + 1}
        </div>
        <div>
          <span className="font-medium">Total Spins:</span> {totalSpins}
        </div>
        <div>
          <span className="font-medium">Players:</span> {players.length}
        </div>
        <div>
          <span className="font-medium">Spins/Player:</span> {spinsPerPlayer}
        </div>
      </div>
    </div>
  )
} 