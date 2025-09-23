// import React from 'react'
// import {BrowserRouter,Routes,Route} from "react-router-dom"
// import Login from './Auth/Login'
// import Register from './Auth/Register'
// import OfficerDashboard from './P-Dept/OfficerDashboard'
// import PostJob from './P-Dept/PostJob'
// import ViewAppliedStatus from './P-Dept/ViewAppliedStatus'
// import ViewStudents from './P-Dept/ViewStudents'
// import UpdateStatus from './P-Dept/UpdateStatus'
// import OfficerLayout from './P-Dept/OfficerLayout'

// const App = () => {
//   return (
//     <> 
//     <BrowserRouter>
//     <Routes>
//       <Route path="*" element={<h1>Page Not Found</h1>} />
//       <Route path='/' element={<Login/>}/>
//       <Route path='register' element={<Register/>}/>
//       <Route path='OfficerLayout' element={<OfficerLayout/>}/>
//       <Route path='OfficerDashboard' element={<OfficerDashboard/>}/>
//       <Route path='PostJob' element={<PostJob/>}/> 
//       <Route path= 'ViewAppliedStatus' element={<ViewAppliedStatus/>}/>
//       <Route path='ViewStudents' element={<ViewStudents/>}/>
//       <Route path='UpdateStatus' element={<UpdateStatus/>}/>
//     </Routes>
//     </BrowserRouter>
//     </>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Auth/Login';
import Register from './Auth/Register';

import OfficerLayout from './P-Dept/OfficerLayout';
import OfficerDashboard from './P-Dept/OfficerDashboard';
import PostJob from './P-Dept/PostJob';
import ViewAppliedStatus from './P-Dept/ViewAppliedStatus';
import ViewStudents from './P-Dept/ViewStudents';
import UpdateStatus from './P-Dept/UpdateStatus';

const App = () => {
  return (
    <> 
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<h1>Page Not Found</h1>} />
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Officer Routes */}
          <Route path="officer" element={<OfficerLayout />}>
            <Route path="dashboard" element={<OfficerDashboard />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="view-applied-status" element={<ViewAppliedStatus />} />
            <Route path="view-students" element={<ViewStudents />} />
            <Route path="update-status" element={<UpdateStatus />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
