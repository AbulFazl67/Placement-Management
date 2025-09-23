import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Auth/Login'
import Register from './Auth/Register'
import OfficerDashboard from './P-Dept/OfficerDashboard'
import PostJob from './P-Dept/PostJob'
import ViewAppliedStatus from './P-Dept/ViewAppliedStatus'
import ViewStudents from './P-Dept/ViewStudents'
import UpdateStatus from './P-Dept/UpdateStatus'

const App = () => {
  return (
    <> 
    <BrowserRouter>
    <Routes>
      <Route path="*" element={<h1>Page Not Found</h1>} />
      <Route path='/' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='OfficerDashboard' element={<OfficerDashboard/>}/>
      <Route path='PostJob' element={<PostJob/>}/> 
      <Route path= 'ViewAppliedStatus' element={<ViewAppliedStatus/>}/>
      <Route path='ViewStudents' element={<ViewStudents/>}/>
      <Route path='UpdateStatus' element={<UpdateStatus/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App