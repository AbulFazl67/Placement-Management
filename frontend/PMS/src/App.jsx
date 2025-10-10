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

import StudentLayout from "./Student/StudentLayout";
import StudentDashboard from "./Student/StudentDashboard";
import ViewJobs from "./Student/ViewJobs";
import Apply from "./Student/Apply";
import ViewApplicationStatus from "./Student/ViewApplicationStatus";

import AdminLayout from './Admin/AdminLayout';
import AdminDashboard from './Admin/AdminDashboard';
import AdminViewJobs from './Admin/AdminViewJobs';
import AdminViewStatus from './Admin/AdminViewStatus';
import StudentDetails from './P-Dept/StudentDetails';

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
            <Route path="student-details/:id" element={<StudentDetails />} />

          </Route>

          {/* Student Routes */}
          <Route path="student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="view-jobs" element={<ViewJobs />} />
            <Route path="apply" element={<Apply />} />
            <Route path="view-application-status" element={<ViewApplicationStatus />} />
          </Route>

           {/* Admin Routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="view-jobs" element={<AdminViewJobs />} />
            <Route path="view-status" element={<AdminViewStatus />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
