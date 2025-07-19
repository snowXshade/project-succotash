import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import StudentDashboard from './pages/studentDashBoard'
import WeightTracker from './pages/WeightTracker'
import Navbar from './compo/Nav'
import Footer from './compo/Footer'
import Todo from './pages/Todo'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/students' element={<StudentDashboard />}/>
        <Route path='/wgt' element={<WeightTracker/>}/>
        <Route path='/todo' element ={<Todo />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App



