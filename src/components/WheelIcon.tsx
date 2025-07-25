interface WheelIconProps {
  size?: number
  className?: string
  color?: string
}

export function WheelIcon({ size = 24, className = "", color = "#4F46E5" }: WheelIconProps) {
  const colors = [
    "#EF4444", // Red
    "#F97316", // Orange  
    "#EAB308", // Yellow
    "#22C55E", // Green
    "#3B82F6", // Blue
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#06B6D4"  // Cyan
  ]
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Colored segments */}
      {colors.map((segmentColor, index) => {
        const angle = (index * 45) * (Math.PI / 180)
        const nextAngle = ((index + 1) * 45) * (Math.PI / 180)
        
        const x1 = 50 + 25 * Math.cos(angle)
        const y1 = 50 + 25 * Math.sin(angle)
        const x2 = 50 + 45 * Math.cos(angle)
        const y2 = 50 + 45 * Math.sin(angle)
        const x3 = 50 + 45 * Math.cos(nextAngle)
        const y3 = 50 + 45 * Math.sin(nextAngle)
        const x4 = 50 + 25 * Math.cos(nextAngle)
        const y4 = 50 + 25 * Math.sin(nextAngle)
        
        const largeArcFlag = 0
        
        return (
          <path
            key={index}
            d={`M 50 50 L ${x1} ${y1} A 25 25 0 ${largeArcFlag} 1 ${x4} ${y4} Z M 50 50 L ${x2} ${y2} A 45 45 0 ${largeArcFlag} 1 ${x3} ${y3} Z`}
            fill={segmentColor}
            opacity="0.8"
          />
        )
      })}
      
      {/* Outer ring */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#1F2937"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Spokes */}
      <g stroke="#1F2937" strokeWidth="2">
        {Array.from({ length: 8 }, (_, index) => {
          const angle = index * 45 * (Math.PI / 180)
          const x1 = 50 + 25 * Math.cos(angle)
          const y1 = 50 + 25 * Math.sin(angle)
          const x2 = 50 + 45 * Math.cos(angle)
          const y2 = 50 + 45 * Math.sin(angle)
          
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />
          )
        })}
      </g>
      
      {/* Center hub */}
      <circle
        cx="50"
        cy="50"
        r="12"
        fill="#FBBF24"
        stroke="#1F2937"
        strokeWidth="2"
      />
      
      {/* Inner ring */}
      <circle
        cx="50"
        cy="50"
        r="25"
        stroke="#1F2937"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Center highlight */}
      <circle
        cx="50"
        cy="50"
        r="6"
        fill="#FEF3C7"
      />
    </svg>
  )
} 