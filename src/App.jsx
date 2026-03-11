import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'
import './index.css'

export default function App() {
  const [view, setView] = useState('login')

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', padding: 16 }}>
        {/* <button onClick={() => setView('login')} style={{ padding: 8 }}>Login</button> */}
        {/* <button onClick={() => setView('register')} style={{ padding: 8 }}>Register</button> */}        
      </div>
      
      {view === 'login' ? <Login onSwitch={setView} /> : <Register onSwitch={setView} />}
    </div>
  )
}
