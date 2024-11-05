'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function EasingPicker() {
  const [startPoint, setStartPoint] = useState({ x: 0, y: 100 })
  const [endPoint, setEndPoint] = useState({ x: 100, y: 0 })
  const [controlPoint1, setControlPoint1] = useState({ x: 25, y: 100 })
  const [controlPoint2, setControlPoint2] = useState({ x: 75, y: 0 })
  const [draggingPoint, setDraggingPoint] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const handleMouseDown = (point: string) => (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault()
    setDraggingPoint(point)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!draggingPoint || !svgRef.current) return

    const svgRect = svgRef.current.getBoundingClientRect()
    const scaleX = 100 / svgRect.width
    const scaleY = 100 / svgRect.height

    const x = Math.max(0, Math.min(100, (event.clientX - svgRect.left) * scaleX))
    const y = Math.max(0, Math.min(100, (event.clientY - svgRect.top) * scaleY))

    switch (draggingPoint) {
      case 'control1':
        setControlPoint1({ x, y })
        break
      case 'control2':
        setControlPoint2({ x, y })
        break
    }
  }

  const handleTouchMove = (event: TouchEvent) => {
    if (!draggingPoint || !svgRef.current) return

    const touch = event.touches[0]
    const svgRect = svgRef.current.getBoundingClientRect()
    const scaleX = 100 / svgRect.width
    const scaleY = 100 / svgRect.height

    const x = Math.max(0, Math.min(100, (touch.clientX - svgRect.left) * scaleX))
    const y = Math.max(0, Math.min(100, (touch.clientY - svgRect.top) * scaleY))

    switch (draggingPoint) {
      case 'control1':
        setControlPoint1({ x, y })
        break
      case 'control2':
        setControlPoint2({ x, y })
        break
    }
  }

  const handleMouseUp = () => {
    setDraggingPoint(null)
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [draggingPoint])

  const curveCommand = `M ${startPoint.x},${startPoint.y} C ${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${endPoint.x},${endPoint.y}`

  return (
    <div className="flex flex-col items-center space-y-4 my-2">
      <svg
        ref={svgRef}
        width="200"
        height="200"
        viewBox="0 0 100 100"
        className="border-2 border-neutral-600 rounded touch-none"
      >
        <path
          d={curveCommand}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1={startPoint.x}
          y1={startPoint.y}
          x2={controlPoint1.x}
          y2={controlPoint1.y}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="1,3"
          className="opacity-50"
        />
        <line
          x1={endPoint.x}
          y1={endPoint.y}
          x2={controlPoint2.x}
          y2={controlPoint2.y}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="1,3"
          className="opacity-50"
        />
        <circle
          cx={controlPoint1.x}
          cy={controlPoint1.y}
          r="4"
          fill="currentColor"
          className="cursor-move z-50"
          onMouseDown={handleMouseDown('control1')}
          onTouchStart={handleMouseDown('control1')}
        />
        <circle
          cx={controlPoint2.x}
          cy={controlPoint2.y}
          r="4"
          fill="currentColor"
          className="cursor-move z-50"
          onMouseDown={handleMouseDown('control2')}
          onTouchStart={handleMouseDown('control2')}
        />

      </svg>
    </div>
  )
}