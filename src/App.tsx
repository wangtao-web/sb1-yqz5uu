import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import CourseHoursManagement from './components/CourseHoursManagement'
import CourseHoursRecord from './components/CourseHoursRecord'
import PersonnelDetails from './components/PersonnelDetails'
import InactiveStudents from './components/InactiveStudents'

function App() {
  return (
    <Router>
      <div className="App bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course-hours" element={<CourseHoursManagement />} />
          <Route path="/course-hours-record" element={<CourseHoursRecord />} />
          <Route path="/personnel-details" element={<PersonnelDetails key={Date.now()} />} />
          <Route path="/inactive-students" element={<InactiveStudents />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App