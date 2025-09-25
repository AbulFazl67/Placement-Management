const connection=require('../db.js')
const app = require('../express.js')
const query = 'select * from users'
connection.execute(query,(error,result)=>{
    if(error){
        console.log('cannot fetch data')
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


