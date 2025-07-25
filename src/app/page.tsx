'use client'

import { useState } from 'react'
import { WheelOfFortune } from '@/components/WheelOfFortune'
import { PunishmentResult } from '@/components/PunishmentResult'
import { PlayerSetup } from '@/components/PlayerSetup'
import { PlayerDisplay } from '@/components/PlayerDisplay'
import { ScoreTable } from '@/components/ScoreTable'
import { GameEndModal } from '@/components/GameEndModal'
import { WheelIcon } from '@/components/WheelIcon'
import { type Punishment } from '@/lib/punishments'

export default function Home() {
  const [gameSetup, setGameSetup] = useState(false)
  const [players, setPlayers] = useState<string[]>([])
  const [playerScores, setPlayerScores] = useState<number[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [spinsPerPlayer, setSpinsPerPlayer] = useState(1)
  const [currentPlayerSpins, setCurrentPlayerSpins] = useState(0)
  const [selectedPunishment, setSelectedPunishment] = useState<Punishment | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [totalSpins, setTotalSpins] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [totalRounds, setTotalRounds] = useState(1)

  const handleStartGame = (playerCount: number, playerNames: string[], spinsPerPlayer: number, totalRounds: number) => {
    setPlayers(playerNames)
    setPlayerScores(new Array(playerNames.length).fill(0))
    setSpinsPerPlayer(spinsPerPlayer)
    setTotalRounds(totalRounds)
    setGameSetup(true)
    setCurrentPlayerIndex(0)
    setCurrentPlayerSpins(0)
    setTotalSpins(0)
    setGameCompleted(false)
  }

  const handleSpinComplete = (punishment: Punishment) => {
    setSelectedPunishment(punishment)
    setShowResult(true)
    setTotalSpins(prev => prev + 1)
  }

  const handlePunishmentAction = (action: 'completed' | 'ignored') => {
    // Update player score
    setPlayerScores(prev => {
      const newScores = [...prev]
      newScores[currentPlayerIndex] += action === 'completed' ? 1 : -1
      return newScores
    })

    setShowResult(false)
    setSelectedPunishment(null)
    
    // Check if current player has used all their spins
    if (currentPlayerSpins + 1 >= spinsPerPlayer) {
      // Move to next player and reset spin count
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length
      
      // Check if we've completed all rounds
      const completedFullRounds = Math.floor((totalSpins + 1) / (players.length * spinsPerPlayer))
      if (completedFullRounds >= totalRounds && nextPlayerIndex === 0) {
        setGameCompleted(true)
        return
      }
      
      setCurrentPlayerIndex(nextPlayerIndex)
      setCurrentPlayerSpins(0)
    } else {
      // Same player, increment their spin count
      setCurrentPlayerSpins(prev => prev + 1)
    }
  }

  const handleResetGame = () => {
    setGameSetup(false)
    setPlayers([])
    setPlayerScores([])
    setCurrentPlayerIndex(0)
    setSpinsPerPlayer(1)
    setCurrentPlayerSpins(0)
    setTotalSpins(0)
    setShowResult(false)
    setSelectedPunishment(null)
    setGameCompleted(false)
    setTotalRounds(1)
  }

  const getWinner = () => {
    if (playerScores.length === 0) return null
    const maxScore = Math.max(...playerScores)
    const winnerIndex = playerScores.indexOf(maxScore)
    return {
      name: players[winnerIndex],
      score: maxScore,
      index: winnerIndex
    }
  }

  // Show setup screen if game hasn't been set up
  if (!gameSetup) {
    return <PlayerSetup onStartGame={handleStartGame} />
  }

  // Show game end modal if game is completed
  if (gameCompleted) {
    return (
      <GameEndModal
        players={players}
        scores={playerScores}
        isVisible={gameCompleted}
        onNewGame={handleResetGame}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

             {/* Header */}
       <header className="relative z-10 text-center py-4 md:py-6 px-4">
         <div className="flex justify-between items-center mb-4">
           <button
             onClick={handleResetGame}
             className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm transition-all duration-200 hover:scale-105"
           >
             ← New Game
           </button>
           <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl flex items-center justify-center gap-4">
             <WheelIcon size={48} color="#ffffff" className="md:w-14 md:h-14" />
             WHEEL OF FORTUNE
             <WheelIcon size={48} color="#ffffff" className="md:w-14 md:h-14" />
           </h1>
           <div className="w-20"></div> {/* Spacer for centering */}
         </div>
         
         {/* Player Display */}
         <PlayerDisplay 
           players={players}
           currentPlayerIndex={currentPlayerIndex}
           totalSpins={totalSpins}
           spinsPerPlayer={spinsPerPlayer}
           currentPlayerSpins={currentPlayerSpins}
         />
       </header>

             {/* Main Game Area */}
       <main className="relative z-10 flex flex-col items-center justify-center px-4 pb-8 min-h-[60vh]">
         <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 md:p-8 shadow-2xl border border-white/20 w-full max-w-4xl">
           <WheelOfFortune 
             onSpinComplete={handleSpinComplete}
           />
                  </div>
       </main>

       {/* Game Instructions & Stats */}
       <section className="relative z-10 px-4 pb-8">
         {/* Game Instructions */}
         <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 max-w-3xl mx-auto border border-white/20 mb-6">
           <h3 className="text-lg md:text-xl font-bold text-white mb-4 text-center">🎮 How to Play</h3>
           <div className="grid md:grid-cols-3 gap-4 text-white/90 text-sm">
             <div className="text-center">
               <div className="text-xl md:text-2xl mb-2">1️⃣</div>
               <p>Click &ldquo;SPIN THE WHEEL!&rdquo; to start</p>
             </div>
             <div className="text-center">
               <div className="text-xl md:text-2xl mb-2">2️⃣</div>
               <p>Wait for the wheel to stop spinning</p>
             </div>
             <div className="text-center">
               <div className="text-xl md:text-2xl mb-2">3️⃣</div>
               <p>Complete your funny punishment!</p>
             </div>
           </div>
         </div>

         {/* Score Table */}
         <div className="max-w-2xl mx-auto">
           <ScoreTable
             players={players}
             scores={playerScores}
             currentPlayerIndex={currentPlayerIndex}
           />
         </div>
       </section>

             {/* Punishment Result Modal */}
       <PunishmentResult
         punishment={selectedPunishment}
         onPunishmentAction={handlePunishmentAction}
         isVisible={showResult}
         currentPlayerName={players[currentPlayerIndex]}
         currentPlayerSpins={currentPlayerSpins}
         spinsPerPlayer={spinsPerPlayer}
       />

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 px-4">
        <p className="text-white/60 text-sm">
          Made for fun with friends! 🎊 Enjoy responsibly.
        </p>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
