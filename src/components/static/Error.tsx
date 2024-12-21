import { useState, useCallback, useMemo } from 'react'
import {
  ConfettiCanvas,
  Environment,
  SpriteCanvas,
  useConfettiCannon,
} from 'confetti-cannon'

const cookie = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 16C2 25.29 8.27 30 16 30C23.73 30 30 25.26 30 16C30 6.57 23.73 2 16 2C8.27 2 2 6.43 2 16Z"
        fill="#F3AD61"
      />
      <path
        d="M19.89 8.32001L20.51 8.36001C21.08 8.40001 21.56 7.92001 21.52 7.35001L21.48 6.74001C21.47 6.50001 21.39 6.25001 21.26 6.03001C20.87 5.41001 20.08 5.16001 19.41 5.44001C18.61 5.78001 18.27 6.72001 18.65 7.49001C18.88 7.99001 19.37 8.28001 19.89 8.32001Z"
        fill="#6D4534"
      />
      <path
        d="M26.92 14.61L26.96 13.99C27 13.42 26.52 12.94 25.95 12.98L25.34 13.02C25.1 13.03 24.85 13.11 24.63 13.24C24.01 13.63 23.76 14.42 24.04 15.09C24.38 15.89 25.32 16.23 26.09 15.85C26.59 15.62 26.88 15.13 26.92 14.61Z"
        fill="#6D4534"
      />
      <path
        d="M10.62 24.52L10.67 23.75C10.71 23.11 11.08 22.51 11.7 22.2C12.65 21.72 13.82 22.14 14.24 23.14C14.59 23.98 14.28 24.96 13.51 25.44C13.23 25.61 12.93 25.7 12.63 25.72L11.87 25.77C11.16 25.82 10.57 25.23 10.62 24.52Z"
        fill="#6D4534"
      />
      <path
        d="M20.4 15.19L20.43 14.73C20.53 13.22 19.28 11.97 17.76 12.06L17.31 12.09C16.86 12.11 16.41 12.24 15.99 12.49C14.75 13.22 14.22 14.78 14.77 16.11C15.42 17.7 17.27 18.37 18.78 17.62C19.76 17.15 20.34 16.2 20.4 15.19Z"
        fill="#6D4534"
      />
      <path
        d="M7.65 8.99994L7.68 9.41994C7.74 10.3299 8.27 11.1899 9.15 11.6299C10.52 12.3099 12.2 11.6999 12.79 10.2599C13.28 9.04994 12.81 7.62994 11.68 6.96994C11.3 6.74994 10.89 6.62994 10.48 6.60994L10.07 6.57994C8.7 6.48994 7.57 7.62994 7.65 8.99994Z"
        fill="#6D4534"
      />
      <path
        d="M24.26 22.82L24.28 23.18C24.36 24.35 23.38 25.33 22.21 25.25L21.86 25.23C21.51 25.21 21.16 25.11 20.83 24.92C19.86 24.35 19.46 23.14 19.88 22.11C20.39 20.88 21.82 20.35 23 20.94C23.76 21.3 24.21 22.03 24.26 22.82Z"
        fill="#6D4534"
      />
      <path
        d="M5.87001 16.92L5.91001 17.54C5.94001 18.06 6.24001 18.55 6.74001 18.78C7.51001 19.16 8.45001 18.82 8.79001 18.02C9.07001 17.35 8.82001 16.56 8.20001 16.17C7.98001 16.04 7.73001 15.96 7.49001 15.95L6.88001 15.91C6.31001 15.87 5.83001 16.35 5.87001 16.92Z"
        fill="#6D4534"
      />
    </svg>
  )
}

const SPRITES = [cookie()]
const SIZE = 40
const COLORS = ['#FF73FA', '#FFC0FF']

export default function Error() {
  const [cookies, setCookies] = useState(0)
  const [confettiCanvas, setConfettiCanvas] = useState(null)
  const [spriteCanvas, setSpriteCanvas] = useState(null)
  const environment = useMemo(() => new Environment(), [])
  const cannon = useConfettiCannon(confettiCanvas, spriteCanvas)

  const addConfetti = useCallback(
    (x: number, y: number) => {
      cannon.createConfetti({
        position: {
          type: 'static',
          value: { x, y },
        },
        size: {
          type: 'static',
          value: SIZE,
        },
      })
    },
    [cannon],
  )

  const handleClick = () => {
    addConfetti(window.innerWidth / 2, window.innerHeight / 2)
    setCookies(cookies + 1)
  }
  return (
    <div className="h-dvh font-geist w-full flex flex-col justify-center items-center pt-56 text-neutral-800 dark:text-neutral-200">
      <div className="flex items-center flex-1">
        <span className="text-3xl font-semibold tracking-tight">404</span>
        <div className="w-px h-16 bg-neutral-200 dark:bg-neutral-800 mx-6" />
        <span className="text-sm font-normal tracking-tight">
          I'm not sure how you got here, considering there's only five pages to
          this site but here's a cookie since you're here. If you expected to
          see something here, please let me know.
        </span>
      </div>
      <button
        onClick={handleClick}
        className="mt-8 px-4 py-2 font-medium bg-neutral-800 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-800 rounded-md focus:outline-none"
      >
        Take a cookie 🍪
      </button>
      <span className="mt-4 inline-block">Cookies taken: {cookies}</span>

      {/* <SpriteCanvas
        ref={setSpriteCanvas}
        sprites={SPRITES}
        colors={COLORS}
        spriteHeight={SIZE}
        spriteWidth={SIZE}
      />
      <ConfettiCanvas
        ref={setConfettiCanvas}
        onClick={handleClick}
        environment={environment}
      /> */}
    </div>
  )
}
