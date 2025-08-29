const mysql = require('mysql2');
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database:'placement_management',
    password:''
})
 connection.connect((error)=>{
    if(error){
        console.log('Database Not Connected')
        console.log(error)
    }else{
        console.log('database connected')
    }
 })

 module.exports=connection