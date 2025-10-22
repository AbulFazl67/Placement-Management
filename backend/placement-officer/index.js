const connection=require('../db.js')
const app = require('../express.js')
const query = 'select * from users'
connection.execute(query,(error,result)=>{
    if(error){
        console.log('cannot fetch data')
        console.log(error)
    }else{
        console.log(result)
    }
})


app.post("/api/postJobs"  , (req , res)=>{
    const {officer_id , title , description , criteria , apply_link} = req.body
    const sql = "insert into job_posts(officer_id ,title , description ,criteria ,apply_link) values(?,?,?,?,?)"
    connection.execute(sql , [officer_id , title , description , criteria , apply_link] , (error , result)=>{
        if(error){
            console.warn(error)
            console.log("cannot post job")
            res.status(500).send({message : "cannot post job"})
        }else{
            console.log("job posted successfully")
            res.status(200).send({result : "job posted successfully"})
        }})
})


app.post("/api/UpdateJobStatus"  , (req , res)=>{
    const {job_id , status} = req.body
    const sql = "update job_posts set status = ? where job_id = ?"
    connection.execute(sql , [status , job_id] , (error , result)=>{
        if(error){
            console.warn(error)
            console.log("cannot update job status")
            res.status(500).send({message : "cannot update job status"})
        }else{
            console.log("job status updated successfully")
            res.status(200).send({result : "job status updated successfully"})
        }})
})


app.put("/api/updateJob", (req, res) => {
    const {job_id , title, description, criteria, apply_link, status } = req.body;
    console.warn(req.body);
   

    const sql = `
        UPDATE job_posts 
        SET title = ?, description = ?, criteria = ?, apply_link = ?, status = ?
        WHERE job_id = ?
    `;

    connection.execute(
        sql,
        [title, description, criteria, apply_link, status, job_id],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send({ message: "Cannot update job" });
            } else {
                console.log("Job updated successfully");
                return res.status(200).send({ result: "Job updated successfully" });
            }
        }
    );
});



app.delete("/api/deleteJob/:job_id", (req, res) => {
    const { job_id } = req.params;
    console.warn(req.params);
    const sql = "DELETE FROM job_posts WHERE job_id = ?";

    connection.execute(sql, [job_id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ message: "Cannot delete job" });
        }   else {
            console.log("Job deleted successfully");
            return res.status(200).send({ result: "Job deleted successfully" });
        }
    });
});

app.get("/api/getAllJobs", (req, res) => {
    const sql = "SELECT * FROM job_posts";
    connection.execute(sql, (error, result) => {
        if (error) {
            console.error(error);   
            return res.status(500).send({ message: "Cannot fetch jobs" });
        } else {    
            console.log("Jobs fetched successfully");
            return res.status(200).send({ jobs: result });
        }   
    });
});

app.put("/api/updateSelectionStatus", (req, res) => {
    const { application_id, status } = req.body;
    console.warn(req.body);
    const sql = "UPDATE applications SET status = ? WHERE application_id = ?";

    connection.execute(sql, [status, application_id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ message: "Cannot update selection status" });
        }
            else {
            console.log("Selection status updated successfully");
            return res.status(200).send({ result: "Selection status updated successfully" });
        }
    });
});

app.post("/api/getStudentApplications", (req, res) => {
    const { student_id } = req.body;
    console.warn(req.body); 
    const sql = "SELECT * FROM applications WHERE student_id = ?";

    connection.execute(sql, [student_id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ message: "Cannot fetch student applications" });
        }   else {
            console.log("Student applications fetched successfully");
            return res.status(200).send({ applications: result });
        }
    });
});


app.post("/api/UpdateStudentApplicationStatus", (req, res) => {
    const { application_id, status } = req.body;
    console.warn(req.body);
    const sql = "UPDATE applications SET status = ? WHERE application_id = ?";
    connection.execute(sql, [status, application_id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ message: "Cannot update application status" });
        } else {
            console.log("Application status updated successfully");
            return res.status(200).send({ result: "Application status updated successfully" });
        }
    });
});


app.get("/api/getStudents" , (req, res) => {
    const sql = "select * from users where role = 'student'"
    connection.execute(sql , (error , result)=>{
        if(error){
            console.error(error);
            return res.status(500).send({ message: "Cannot fetch students" });
        }
        else{
            console.log("Students fetched successfully");
            return res.status(200).send({ students: result });
        }
    })
})

app.get("/api/getStudentsApplications/:student_id" , (req ,res)=>{
    const {student_id} = req.params
    console.log("Student ID:", student_id);
    const sql =`select st.* ,
     sp.student_id ,
     j.title as job_title ,
     a.status as application_status
     from users st join student_profiles sp on sp.user_id=st.user_id 
     join applications a on a.student_id=sp.student_id 
     join job_posts j on j.job_id=a.job_id
     where st.user_id=?`

    connection.execute(sql ,[student_id] , (error , result)=>{
        if(error){
            console.error(error);
            res.status(500).json({error})
        }else{
            res.status(200).json({data:result})
        }
    })
})


// fazal creaated joblist api

// Post a job
// app.post("/api/postJobs", (req, res) => {
//   const { officer_id, title, description, criteria, apply_link } = req.body;
//   connection.execute(
//     "INSERT INTO jobs (officer_id, title, description, criteria, apply_link) VALUES (?, ?, ?, ?, ?)",
//     [officer_id, title, description, criteria, apply_link],
//     (err, result) => {
//       if (err) return res.status(500).json({ message: "DB Error" });
//       res.json({ message: "Job posted successfully", jobId: result.insertId });
//     }
//   );
// });

// Get jobs for an officer
// app.get("/api/officerJobs/:officerId", (req, res) => {
//   const officerId = req.params.officerId;
//   connection.execute(
//     "SELECT * FROM jobs WHERE officer_id = ?",
//     [officerId],
//     (err, result) => {
//       if (err) return res.status(500).json({ message: "DB Error" });
//       res.json({ jobs: result });
//     }
//   );
// });

// Delete a job
// app.delete("/api/deleteJob/:jobId", (req, res) => {
//   const jobId = req.params.jobId;
//   connection.execute("DELETE FROM jobs WHERE id = ?", [jobId], (err, result) => {
//     if (err) return res.status(500).json({ message: "DB Error" });
//     res.json({ message: "Job deleted successfully" });
//   });
// });

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});

app.get("/api/officerJobs/:officerId", (req, res) => {
  const officerId = req.params.officerId;
  const sql = "SELECT * FROM job_posts WHERE officer_id = ?";

  connection.execute(sql, [officerId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB Error" });
    }
    res.status(200).json({ jobs: result });
  });
});
