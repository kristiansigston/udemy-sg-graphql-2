import React from 'react'
import Header from '../header'

const App = ({ children }) => {
  return (
    <div className="container">
      <Header title="Welcome" />
      {children}
    </div>
  )
}

export default App
