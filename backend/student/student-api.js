const app=require('../express.js')
const db=require('../db.js')


app.post('/api/student-register' , (req , res)=>{
    const {name , email , password } = {...req.body}
    console.warn(req.body.email)
    console.warn(email , password)
     const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.execute(query, [name, email, password, "Student"], (err, results) => {
        if(err){
            res.status(500).json({error:err})
        }else{
             res.status(200).json({data:"Student Registered Successfully"})
        }
    })
    
})

app.post('/api/applyJobs' , (req , res)=>{
    const {student_id , job_id} = {...req.body}
    console.warn(req.body)
     const query = "INSERT INTO applications (student_id, job_id, status) VALUES (?, ?, ?)";
    db.execute(query, [student_id , job_id , "Applied"], (err, results) => {
        if(err){
            console.warn(err)
            res.status(500).json({error:err})
        }else{
             res.status(200).json({data:"Job Applied Successfully"})
        }
    })
})

app.get('/api/appliedJobs/:student_id', (req, res) => {
  const { student_id } = req.params;
  console.log("Student ID:", student_id);

  const sql = `
    SELECT 
      st.*,
      sp.student_id,
      a.status AS application_status
    FROM users st
    JOIN student_profiles sp ON sp.user_id = st.user_id
    JOIN applications a ON a.student_id = sp.student_id
    WHERE sp.student_id = ?
  `;

  db.execute(sql, [student_id], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: result });
    }
  });
});

app.get('/api/getUserid/:student_id', (req, res) => {
  const { student_id } = req.params;
  console.log("Student ID:", student_id);

  const sql = `
    SELECT 
      st.*,
      sp.student_id,
      a.status AS application_status,
      jp.title as job_title
    FROM users st
    JOIN student_profiles sp ON sp.user_id = st.user_id
    JOIN applications a ON a.student_id = sp.student_id
    JOIN job_posts jp ON jp.job_id = a.job_id
    WHERE st.user_id = ?
  `;

  db.execute(sql, [student_id], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: result });
    }
  });
});


/* app.post("/api/applyJob", (req, res) => {
    const { student_id, job_id } = req.body;
    console.warn(req.body);
    const sql = "INSERT INTO applications (student_id, job_id, status) VALUES (?, ?, ?)";
    db.execute(sql, [student_id, job_id, "Applied"], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ message: "Cannot apply for job" });
        } else {
            console.log("Job applied successfully");
            return res.status(200).send({ result: "Job applied successfully" });
        }
    });
}); */