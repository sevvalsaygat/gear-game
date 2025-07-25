'use client'

import { useState } from 'react'
import { WheelIcon } from './WheelIcon'

interface PlayerSetupProps {
  onStartGame: (playerCount: number, playerNames: string[], spinsPerPlayer: number, totalRounds: number) => void
}

export function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const [playerCount, setPlayerCount] = useState(2)
  const [playerNames, setPlayerNames] = useState<string[]>(['Player 1', 'Player 2'])
  const [spinsPerPlayer, setSpinsPerPlayer] = useState(1)
  const [totalRounds, setTotalRounds] = useState(2)
  const [step, setStep] = useState<'count' | 'names' | 'spins' | 'rounds'>('count')

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count)
    const newNames = Array.from({ length: count }, (_, i) => 
      playerNames[i] || `Player ${i + 1}`
    )
    setPlayerNames(newNames)
  }

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames]
    newNames[index] = name || `Player ${index + 1}`
    setPlayerNames(newNames)
  }

  const handleNext = () => {
    if (step === 'count') {
      setStep('names')
    } else if (step === 'names') {
      setStep('spins')
    } else if (step === 'spins') {
      setStep('rounds')
    } else {
      onStartGame(playerCount, playerNames, spinsPerPlayer, totalRounds)
    }
  }

  const handleBack = () => {
    if (step === 'rounds') {
      setStep('spins')
    } else if (step === 'spins') {
      setStep('names')
    } else if (step === 'names') {
      setStep('count')
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 'count': return 'How many players?'
      case 'names': return 'Enter player names'
      case 'spins': return 'Spins per player'
      case 'rounds': return 'Game rounds'
      default: return ''
    }
  }

  const getButtonText = () => {
    switch (step) {
      case 'count': return 'Next'
      case 'names': return 'Next'
      case 'spins': return 'Next'
      case 'rounds': return 'Start Game!'
      default: return 'Next'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-2xl w-full mx-4 border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl flex items-center justify-center gap-4">
            <WheelIcon size={48} color="#ffffff" className="md:w-14 md:h-14" />
            WHEEL OF FORTUNE
            <WheelIcon size={48} color="#ffffff" className="md:w-14 md:h-14" />
          </h1>
          <p className="text-lg text-white/90 drop-shadow-lg">
            {getStepTitle()}
          </p>
        </div>

        {/* Step Content */}
        {step === 'count' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[2, 3, 4, 5, 6, 7, 8, 10].map((count) => (
                <button
                  key={count}
                  onClick={() => handlePlayerCountChange(count)}
                  className={`p-4 rounded-2xl font-bold text-xl transition-all duration-200 ${
                    playerCount === count
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-105 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => handlePlayerCountChange(Math.max(2, playerCount - 1))}
                className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <div className="px-6 py-3 bg-white/20 rounded-2xl text-white text-xl font-bold min-w-20 text-center">
                {playerCount}
              </div>
              
              <button
                onClick={() => handlePlayerCountChange(Math.min(20, playerCount + 1))}
                className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {step === 'names' && (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {playerNames.map((name, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  placeholder={`Player ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}

        {step === 'spins' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-white/80 mb-4">How many spins should each player get per turn?</p>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((spins) => (
                <button
                  key={spins}
                  onClick={() => setSpinsPerPlayer(spins)}
                  className={`p-4 rounded-2xl font-bold text-xl transition-all duration-200 ${
                    spinsPerPlayer === spins
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-105 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                  }`}
                >
                  {spins}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setSpinsPerPlayer(Math.max(1, spinsPerPlayer - 1))}
                className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 hover:scale-105"
                disabled={spinsPerPlayer <= 1}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <div className="px-6 py-3 bg-white/20 rounded-2xl text-white text-xl font-bold min-w-20 text-center">
                {spinsPerPlayer} {spinsPerPlayer === 1 ? 'spin' : 'spins'}
              </div>
              
              <button
                onClick={() => setSpinsPerPlayer(Math.min(10, spinsPerPlayer + 1))}
                className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 hover:scale-105"
                disabled={spinsPerPlayer >= 10}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
              <p className="text-white/80 text-sm text-center">
                Each player will get <span className="font-bold text-white">{spinsPerPlayer}</span> consecutive {spinsPerPlayer === 1 ? 'spin' : 'spins'} before the turn passes to the next player.
              </p>
            </div>
          </div>
        )}

        {step === 'rounds' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-white/80 mb-4">How many rounds should the game last?</p>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 10].map((rounds) => (
                <button
                  key={rounds}
                  onClick={() => setTotalRounds(rounds)}
                  className={`p-4 rounded-2xl font-bold text-xl transition-all duration-200 ${
                    totalRounds === rounds
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white scale-105 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                  }`}
                >
                  {rounds}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setTotalRounds(Math.max(1, totalRounds - 1))}
                className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 hover:scale-105"
                disabled={totalRounds <= 1}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <div className="px-6 py-3 bg-white/20 rounded-2xl text-white text-xl font-bold min-w-20 text-center">
                {totalRounds} {totalRounds === 1 ? 'round' : 'rounds'}
              </div>
              
              <button
                onClick={() => setTotalRounds(Math.min(20, totalRounds + 1))}
                className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 hover:scale-105"
                disabled={totalRounds >= 20}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
              <p className="text-white/80 text-sm text-center">
                The game will last for <span className="font-bold text-white">{totalRounds}</span> complete {totalRounds === 1 ? 'round' : 'rounds'}. Each round = all players completing their spins.
              </p>
              <p className="text-white/60 text-xs text-center mt-2">
                Total spins: {playerCount} players × {spinsPerPlayer} spins × {totalRounds} rounds = <span className="font-bold">{playerCount * spinsPerPlayer * totalRounds}</span> spins
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          {step !== 'count' && (
            <button
              onClick={handleBack}
              className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-full transition-all duration-200 hover:scale-105"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {getButtonText()}
          </button>
        </div>
      </div>

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