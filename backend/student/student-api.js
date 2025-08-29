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