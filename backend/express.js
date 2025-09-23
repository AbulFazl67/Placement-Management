const express=require('express')
const cors=require('cors')
const app=express()
app.use(express.json());
app.use(cors())

app.listen(3000 , ()=>{
    console.warn('Api listening to 3000')
})

module.exports=app