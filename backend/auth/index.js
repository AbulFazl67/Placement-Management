const connection=require('../db.js')
const app = require('../express.js')


app.post('/api/login' , (req , res)=>{
    const {username , password} = req.body
    const sql ="select * from users where email=? and password =?"
    connection.execute(sql , [username , password] , (err , result)=>{
        if(!err){
            res.status(200).send({result:result})
        }else{
            res.status(500).send({error:err})
        }
    })
})


app.post('/api/signup' , (req, res)=>{
    const {name , email , password , role}=req.body
    const sql ="insert into users(name , email ,password , role) values(?,?,?,?)"
    connection.execute(sql,[name , email ,password , role] , (err , result)=>{
        if(!err){
            res.status(200).send({result:`User ${name} successfully for the role = > ${role}`})
        }else[
            res.status(500).send({error:err})
        ]
    })
})