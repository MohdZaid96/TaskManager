const mongoose=require("mongoose");
//MONGOURL="mongodb+srv://immdz1996:qwerty12345@clusterevaluation.fygmmve.mongodb.net/dummyOlx?retryWrites=true&w=majority"

const connection=mongoose.connect("mongodb+srv://taskmanager:pass12345@taskmanager.nnnlpg4.mongodb.net/TaskManager?retryWrites=true&w=majority").then((res)=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err);
})

module.exports={connection};