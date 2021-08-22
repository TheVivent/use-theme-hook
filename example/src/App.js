import React from 'react'

import { useMyHook } from 'use-theme'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
