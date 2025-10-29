import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] 
                      dark:bg-[radial-gradient(60%_120%_at_50%_50%,rgba(30,30,30,0)_0,rgba(50,50,50,0.5)_100%)] 
                      transition-colors duration-300 min-h-screen">
        <Manager />
      </div>
      <Footer />
    </div>
  )
}

export default App
