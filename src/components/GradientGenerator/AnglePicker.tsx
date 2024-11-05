import { useState, useRef, useEffect } from 'react'

export default function AnglePicker({defaultValue, onAngleChange} : {defaultValue: number, onAngleChange: (value: number) => void}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const isDragging = useRef(false)

  const radius = 100
  const centerX = radius + 10
  const centerY = radius + 10

  const snapToGrid = (angle: number) => Math.round(angle / 5) * 5

  const calculateAngle = (clientX: number, clientY: number) => {
    if (!svgRef.current) return 0

    const svgRect = svgRef.current.getBoundingClientRect()
    const centerX = svgRect.left + svgRect.width / 2
    const centerY = svgRect.top + svgRect.height / 2

    const dx = clientX - centerX
    const dy = clientY - centerY
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
    if (angle < 0) angle += 360

    return snapToGrid(angle)
  }

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging.current) return
    const newAngle = calculateAngle(event.clientX, event.clientY)
    onAngleChange(newAngle)
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const newAngle = calculateAngle(event.clientX, event.clientY)
    onAngleChange(newAngle)
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180)

  const lineEndX = centerX + radius * Math.cos(degreesToRadians(defaultValue - 90))
  const lineEndY = centerY + radius * Math.sin(degreesToRadians(defaultValue - 90))

 
  const createDots = () => {
    const dots = []
    const numCircles = 4
    const dotsPerCircle = 24

    for (let i = 1; i <= numCircles; i++) {
      const circleRadius = (i / numCircles - 1) * radius
      for (let j = 0; j < dotsPerCircle; j++) {
        const angle = (j / dotsPerCircle) * 360
        const x = centerX + circleRadius * Math.cos(degreesToRadians(angle - 90))
        const y = centerY + circleRadius * Math.sin(degreesToRadians(angle - 90))
        dots.push(
          <circle
            key={`dot-${i}-${j}`}
            cx={x}
            cy={y}
            r={1.5}
            fill="currentColor"
            className="opacity-30"
          />
        )
      }
    }
    return dots
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <svg 
        ref={svgRef}
        width={(radius + 10) * 2} 
        height={(radius + 10) * 2}
        className="touch-none"
        onMouseDown={handleClick}
      >
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="opacity-30 "
        />
        <line
          x1={centerX - radius}
          y1={centerY}
          x2={centerX + radius}
          y2={centerY}
          stroke="currentColor"
          strokeWidth="1"
          className="opacity-30"
        />
        <line
          x1={centerX}
          y1={centerY - radius}
          x2={centerX}
          y2={centerY + radius}
          stroke="currentColor"
          strokeWidth="1"
          className="opacity-30"
        />
        {createDots()}
        <line
          x1={centerX}
          y1={centerY}
          x2={lineEndX}
          y2={lineEndY}
          stroke="currentColor"
          strokeWidth="4"
          className="cursor-grab active:cursor-grabbing "
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        />
      </svg>
    </div>
  )
}