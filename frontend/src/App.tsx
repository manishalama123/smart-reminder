import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">
        Smart Reminder App
      </h1>
      <Button>Click me</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Delete</Button>
    </div>
    </>
  )
}

export default App
