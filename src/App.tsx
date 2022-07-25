import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
import MainInput from './Components/MainInput'



const App = () => {
  return (
      <Routes>
        <Route path="/" element={<MainInput />} />
        {/* <Route path="" element={} /> */}
      </Routes>
  )


}

export default App;
