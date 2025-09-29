// const connection=require('../db.js')
// const app = require('../express.js')


// app.post('/api/login' , (req , res)=>{
//     const {username , password} = req.body
//     const sql ="select * from users where email=? and password =?"
//     connection.execute(sql , [username , password] , (err , result)=>{
//         if(!err){
//             res.status(200).send({result:result})
//         }else{
//             res.status(500).send({error:err})
//         }
//     })
// })


// app.post('/api/signup' , (req, res)=>{
//     const {name , email , password , role , skills, job_preference ,placed}=req.body
//     const sql ="insert into users(name , email ,password , role) values(?,?,?,?)"
//     connection.execute(sql,[name , email ,password , role] , (err , result)=>{
//         if(!err){
//             if(role==="student"){
//                 const studentQuery = "insert into student_profile (student_id, skills, job_preference, placed) values (?, ?, ? , ?)";
//                 connection.execute(studentQuery, [result.user_id, skills, job_preference , placed], (studentErr, studentResult) => {
//                     if(studentErr){
//                         console.error("Error inserting into students table:", studentErr);
//                     }else{
//                         console.log("Student record created successfully:", studentResult);
//                     }
//                 })
//             }else{
//                 res.status(200).send({result:`User ${name} successfully for the role = > ${role}`})
//             }

            
//         }else[
//             res.status(500).send({error:err})
//         ]
//     })
// })



const connection = require('../db.js');
const app = require('../express.js');

// ----------------- LOGIN API -----------------
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT user_id, name, email, role FROM users WHERE email=? AND password=?";
    connection.execute(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(500).send({ error: err });
        }

        if (result.length === 0) {
            return res.status(401).send({ error: "Invalid email or password" });
        }

        // send user data including role
        res.status(200).send({ user: result[0] });
    });
});

// ----------------- SIGNUP API -----------------
app.post('/api/signup', (req, res) => {
    const { name, email, password, role, skills, job_preference, placed } = req.body;
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    
    connection.execute(sql, [name, email, password, role], (err, result) => {
        if (!err) {
            if (role === "student") {
                // yaha table name correct kiya aur student_id ko insertId se liya
                const studentQuery = "INSERT INTO student_profiles (user_id, skills, job_preference, placed) VALUES (?, ?, ?, ?)";
                connection.execute(studentQuery, [result.insertId, skills, job_preference, placed], (studentErr, studentResult) => {
                    if (studentErr) {
                        console.error("Error inserting into student_profiles table:", studentErr);
                        res.status(500).send({ error: studentErr });
                    } else {
                        console.log("Student record created successfully:", studentResult);
                        res.status(200).send({ result: `Student ${name} registered successfully!` });
                    }
                });
            } else {
                res.status(200).send({ result: `User ${name} successfully registered for the role => ${role}` });
            }
        } else {
            res.status(500).send({ error: err });
        }
    });
});
