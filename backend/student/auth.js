const app=require('../express.js')
const db=require('../db.js')


app.post('/api/student-login' , (req , res)=>{
    const {email , password} = {...req.body}
    console.warn(req.body.email)
    console.warn(email , password)
    const query="select * from users where email=? and password=? and role='Student'"
    db.execute(query , [email , password] , (err , results)=>{
        if(err){
            res.status(500).json({error:err})
        }else{
            if(results.length>0){
                res.status(200).json({data:results[0]})
            }else{
                res.status(404).json({error:"No Such Student Found"})
            }
        }
    })
})