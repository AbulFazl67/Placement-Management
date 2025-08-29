const connection=require('../db.js')
const query = 'select * from users'
connection.execute(query,(error,result)=>{
    if(error){
        console.log('cannot fetch data')
    }else{
        console.log(result)
    }
})

