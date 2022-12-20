import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { AnimalList } from './components/AnimalList'

function App() {

  return (
    <div className="App mx-auto max-w-6xl text-center my-8">
      <h1 className="font-semibold text-2xl">React - The Road To Enterprise</h1>
      <AnimalList />
    </div>
  )
}

export default App
