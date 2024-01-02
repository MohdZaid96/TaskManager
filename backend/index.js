const express=require("express");
const { connection } = require("./config/db");
const {UserModel}=require("./models/user.model");
const {TaskModel}=require("./models/task.model");
const cors=require("cors")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require('dotenv').config();



const app=express();

app.use(express.json());
app.use(
    cors({
        origin:"*"
    })
);

app.get("/",(req,res)=>{
    res.send("Base API");
})
const authentication=(req,res,next)=>{
    const {token}=req.header.authorization?.split(" ")[1];
    if(!token){
        res.send({msg:"Token=> NOT FOUND"})
    }else{
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if(err){
                res.send("Invalid Token");
            }else{
                req.user=decoded.user;
                next();
            }
          });
    }

}
const authorization=(permittedRole)=>{
    return async (req,res,next)=>{
    const userId=req.user._id;
      const user=await UserModel.findOne({_id:userId});
      const userRole=user.role;
      if(permittedRole.include(userRole)){
            next();
      }else{
        res.send("Unauthorized Access");
      }
    }

}


app.post("/signup",async (req,res)=>{
    const {email,password,name}=req.body;

    await bcrypt.hash(password, 2, async function(err, hash) {
        if(err){
            res.send("Bcrypt error")
        }
        const user=new UserModel({
            email,
            password:hash,
            name
        })
       try {
        await user.save();
       
        console.log("SignUp sucess")
        res.send({msg:"SignUp sucess"})
       } catch (error) {
            console.log(error);
            res.send(error)
       } 
    })
}); 

app.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});
    if(user){
        const hashed=user.password;
        bcrypt.compare(password, hashed, function(err, result) {
            if(err){
                res.send("Login Failed")
            }else{
                const token = jwt.sign({user}, process.env.SECRET_KEY)
                res.send({msg:"Login Succesful",token,name:user.name})

            }
        })
    }else{
        res.send({msg:"User Not Found!!! Register"});
    }
});

app.post("/create",authentication,authorization(["user"]),async(req,res) => {
        const {name,email,task}=req.body;
        try {
            const newTask=new TaskModel({
                name,
                email,
                task
            })

            await newTask.save();
            console.log("task saved")
            res.send({msg:"Created"})
            
        } catch (error) {
            
        }

})
app.get("/tasks",authentication,authorization(["user","admin","manager"]),async(req,res) => {
    const user=req.user;
    if(user.role == "student"){
        try {
            const tasks=await TaskModel.find({email : user.email});
            console.log("Tasks fetched for student");
            res.send({msg:"Data fetched",data:tasks})
            
        } catch (error) {
            console.log(error);
            res.send({msg:"Error fetching tasks"})
        }
        

    }else{
        try {
            const tasks=await TaskModel.find();
            console.log("Tasks all fetched ");
            res.send({msg:"Data fetched",data:tasks});
        } catch (error) {
            console.log(error);
            res.send({msg:"Error fetching tasks"})
        }
    } 
})

app.put("/updateTask/:_id",authentication,authorization(["user","admin"]),async(req,res) => {
    try {
        await TaskModel.findOneAndUpdate({_id},
            req.body
        );
        console.log("Task Updated")
        res.send({msg:"Task Updated"})
    } catch (error) {
        console.log("Task Update Failed")
    }
   

})

app.put("/updateRole/:_id",authentication,authorization(["admin"]),async(req,res) => {
    try {
        await UserModel.findOneAndUpdate({_id},
            req.body
        );
        console.log("Task Updated")
        res.send({msg:"Task Updated"})
    } catch (error) {
        console.log("Task Update Failed")
    }
   

})


app.listen(8080,async()=>{
    try {
        await connection;
        console.log("Server live on 8080")
    } catch (error) {
        console.log(error);
    } 

})

