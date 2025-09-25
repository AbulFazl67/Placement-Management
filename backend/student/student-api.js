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