import { useState } from 'react'
import './App.css'
import Button from '../components/Button'

function App() {


  return (
    <div className='text-center text-2xl'>
      <h1 className='text-4xl font-bold underline text-blue-600' onClick={(e)=>{
        e.preventDefault()
        console.log("Klikano");
        
      }}>HELLO </h1>
      <Button/>
    </div>
  )
}

export default App
