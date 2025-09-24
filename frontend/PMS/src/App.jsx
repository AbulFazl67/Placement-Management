// import React from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from './Auth/Login';
// import Register from './Auth/Register';

// import OfficerLayout from './P-Dept/OfficerLayout';
// import OfficerDashboard from './P-Dept/OfficerDashboard';
// import PostJob from './P-Dept/PostJob';
// import ViewAppliedStatus from './P-Dept/ViewAppliedStatus';
// import ViewStudents from './P-Dept/ViewStudents';
// import UpdateStatus from './P-Dept/UpdateStatus';

// import StudentLayout from "./Student/StudentLayout";
// import StudentDashboard from "./Student/StudentDashboard";
// import ViewJobs from "./Student/ViewJobs";
// import Apply from "./Student/Apply";
// import ViewApplicationStatus from "./Student/ViewApplicationStatus";

// const App = () => {
//   return (
//     <> 
//       <BrowserRouter>
//         <Routes>
//           <Route path="*" element={<h1>Page Not Found</h1>} />
//           <Route path="/" element={<Login />} />
//           <Route path="register" element={<Register />} />
//           <Route path="officer" element={<OfficerLayout />}>
//             <Route path="dashboard" element={<OfficerDashboard />} />
//             <Route path="post-job" element={<PostJob />} />
//             <Route path="view-applied-status" element={<ViewAppliedStatus />} />
//             <Route path="view-students" element={<ViewStudents />} />
//             <Route path="update-status" element={<UpdateStatus />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// };

// export default App;

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

          {/* Student Routes */}
          <Route path="student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="view-jobs" element={<ViewJobs />} />
            <Route path="apply" element={<Apply />} />
            <Route path="view-application-status" element={<ViewApplicationStatus />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
