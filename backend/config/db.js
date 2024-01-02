const mongoose=require("mongoose");
require('dotenv').config();

//MONGOURL="mongodb+srv://immdz1996:qwerty12345@clusterevaluation.fygmmve.mongodb.net/dummyOlx?retryWrites=true&w=majority"

const connection=mongoose.connect(`${process.env.DATABASE_URL}`).then((res)=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err);
})

module.exports={connection};