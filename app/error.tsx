'use client'

import { FC, useEffect, useState } from 'react'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

const Error: FC<Props> = ({ error, reset }) => {
  const [message, setMessage] = useState('Sorry it looks like something went wrong!')

  useEffect(() => {
    if (error.message === 'Failed to fetch') {
      setMessage('It looks like there is a problems with Internet connection.')
    }
  }, [error])

  return (
    <>
      <div>{message}</div>
      <button data-testid={'try-again-button'} onClick={() => reset()}>
        Try Again
      </button>
    </>
  )
}

export default Error
