'use client'

import { useEffect, useState } from 'react'
import { type Punishment } from '@/lib/punishments'

interface PunishmentResultProps {
  punishment: Punishment | null
  onPunishmentAction: (action: 'completed' | 'ignored') => void
  isVisible: boolean
  currentPlayerName?: string
  currentPlayerSpins?: number
  spinsPerPlayer?: number
}

export function PunishmentResult({ punishment, onPunishmentAction, isVisible, currentPlayerName, currentPlayerSpins = 0, spinsPerPlayer = 1 }: PunishmentResultProps) {
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (isVisible && punishment) {
      setShowCelebration(true)
      const timer = setTimeout(() => setShowCelebration(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, punishment])

  if (!isVisible || !punishment) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Celebration Effects */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${1 + Math.random() * 2}rem`
              }}
            >
              🎉
            </div>
          ))}
        </div>
      )}

      {/* Result Card */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden transform animate-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div 
          className="px-8 py-6 text-center text-white relative overflow-hidden"
          style={{ backgroundColor: punishment.color }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <div className="text-6xl mb-2 animate-bounce">
              {punishment.emoji}
            </div>
            <h2 className="text-2xl font-bold drop-shadow-lg">
              {currentPlayerName ? `${currentPlayerName}'s PUNISHMENT!` : 'YOUR PUNISHMENT!'}
            </h2>
            {currentPlayerName && spinsPerPlayer > 1 && (
              <div className="text-sm opacity-90 mt-1">
                Spin {(currentPlayerSpins || 0) + 1} of {spinsPerPlayer}
              </div>
            )}
          </div>
        </div>

        {/* Punishment Text */}
        <div className="p-8 text-center">
          <p className="text-lg text-gray-800 leading-relaxed mb-8">
            {punishment.text}
          </p>

                    {/* Punishment Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => onPunishmentAction('completed')}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
              >
                ✅ Completed<br/>
                <span className="text-sm opacity-90">+1 Point</span>
              </button>
              
              <button
                onClick={() => onPunishmentAction('ignored')}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
              >
                ❌ Ignored<br/>
                <span className="text-sm opacity-90">-1 Point</span>
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-3">
                Did {currentPlayerName || 'you'} complete the punishment?
              </p>
              <p className="text-xs text-gray-500">
                {(currentPlayerSpins !== undefined && spinsPerPlayer !== undefined && (currentPlayerSpins + 1) >= spinsPerPlayer) 
                  ? '➡️ Next player after choosing' 
                  : '🎲 Same player continues after choosing'}
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => {
                  navigator.share?.({
                    title: 'Wheel of Fortune Result',
                    text: `${currentPlayerName || 'Player'} got: ${punishment.text}`,
                  }).catch(() => {
                    // Fallback: copy to clipboard
                    navigator.clipboard?.writeText(`${currentPlayerName || 'Player'} got: ${punishment.text}`)
                  })
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
              >
                📤 Share
              </button>
            </div>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="h-2 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-red-400 to-pink-400 animate-pulse"
            style={{ width: '100%' }}
          ></div>
        </div>
      </div>
    </div>
  )
} 