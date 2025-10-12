const mysql = require('mysql2');
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database:'placement_management',
    password:'root'
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

// db.js ya jahan bhi connection hai
// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "",       // blank password
//     database: "placement_management",
//     port: 3306
// });

// connection.connect((err) => {
//     if (err) {
//         console.error("Database connection failed: " + err.stack);
//         return;
//     }
//     console.log("Connected to MySQL database!");
// });

// module.exports = connection;
