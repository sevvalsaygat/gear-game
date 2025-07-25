'use client'

import { useState, useRef } from 'react'
import { punishments, type Punishment } from '@/lib/punishments'
import { WheelIcon } from './WheelIcon'

interface WheelOfFortuneProps {
  onSpinComplete: (punishment: Punishment) => void
}

export function WheelOfFortune({ onSpinComplete }: WheelOfFortuneProps) {
  const wheelRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)

  const segmentAngle = 360 / punishments.length
  
  const spin = () => {
    if (isSpinning) return

    setIsSpinning(true)

    // Generate random spins between 5-10 full rotations plus random angle
    const spins = 5 + Math.random() * 5
    const randomAngle = Math.random() * 360
    const totalRotation = rotation + (spins * 360) + randomAngle
    
    setRotation(totalRotation)

    // Calculate which punishment was selected
    const finalAngle = totalRotation % 360
    const adjustedAngle = (360 - finalAngle + 90) % 360 // Adjust for pointer position
    const segmentIndex = Math.floor(adjustedAngle / segmentAngle)
    const selectedPunishment = punishments[segmentIndex]

    // Call onSpinComplete after animation
    setTimeout(() => {
      setIsSpinning(false)
      onSpinComplete(selectedPunishment)
    }, 3000)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Wheel Container */}
      <div className="relative w-full aspect-square max-w-2xl mx-auto">
        <div
          ref={wheelRef}
          className={`relative w-full h-full rounded-full border-8 border-yellow-400 shadow-2xl transition-transform duration-[3000ms] ease-out ${
            isSpinning ? 'animate-pulse' : ''
          }`}
          style={{
            transform: `rotate(${rotation}deg)`,
            background: 'conic-gradient(from 0deg, ' + 
              punishments.map((punishment, index) => 
                `${punishment.color} ${index * segmentAngle}deg ${(index + 1) * segmentAngle}deg`
              ).join(', ') + ')'
          }}
        >
                  {/* Punishment Segments */}
        {punishments.map((punishment, index) => {
          const angle = index * segmentAngle
          const emojiRotation = angle + (segmentAngle / 2)
          
          return (
            <div
              key={punishment.id}
              className="absolute w-full h-full pointer-events-none"
            >
              <div 
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${emojiRotation}deg) translateY(-80px)`,
                  fontSize: '32px',
                  textAlign: 'center',
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
                }}
              >
                {punishment.emoji}
              </div>
            </div>
          )
        })}

          {/* Center Circle */}
          <div className="absolute inset-1/2 w-20 h-20 md:w-24 md:h-24 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border-4 md:border-6 border-yellow-400 flex items-center justify-center shadow-lg">
            <WheelIcon size={32} color="#FCD34D" className="md:w-10 md:h-10" />
          </div>
        </div>

        {/* Pointer - Fixed Position */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
          <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-t-[60px] md:border-l-[35px] md:border-r-[35px] md:border-t-[70px] border-l-transparent border-r-transparent border-t-red-700 drop-shadow-lg"></div>
        </div>
      </div>

      {/* Spin Button - Now outside and below the wheel */}
      <div className="flex justify-center mt-8">
        <button
          onClick={spin}
          disabled={isSpinning}
          className={`px-10 py-4 rounded-full font-bold text-white text-xl shadow-lg transition-all duration-200 ${
            isSpinning 
              ? 'bg-gray-400 cursor-not-allowed scale-95' 
              : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 hover:scale-105 active:scale-95'
          }`}
        >
          {isSpinning ? 'SPINNING...' : 'SPIN THE WHEEL!'}
        </button>
      </div>
    </div>
  )
} 