import { useEffect, useState } from 'react'

type CountdownState = {
  isCounting: boolean
  secondsRemaining: number
}

const useCountdown = (initialSecondsRemaining: number) => {
  const [countdownState, setCountdownState] = useState<CountdownState>({
    isCounting: false,
    secondsRemaining: initialSecondsRemaining,
  })

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined

    if (initialSecondsRemaining) {
      setCountdownState({
        isCounting: true,
        secondsRemaining: initialSecondsRemaining,
      })

      const willExpireAt = Date.now() + initialSecondsRemaining * 1000

      timer = setInterval(() => {
        const newSecondsRemaining = Math.floor((willExpireAt - Date.now()) / 1000)

        setCountdownState({
          isCounting: newSecondsRemaining > 0,
          secondsRemaining: newSecondsRemaining,
        })

        if (newSecondsRemaining <= 0) clearInterval(timer)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [initialSecondsRemaining])

  return countdownState
}

export { useCountdown }
