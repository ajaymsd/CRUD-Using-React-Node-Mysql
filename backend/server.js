const express=require("express");
const app=express();
const mysql=require("mysql");
const bodyParser=require('body-parser');
const cors=require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"samplewebdb"
})
app.get("/api/getUser",(req,res)=>{
    const sqlGet="select * from user";
    db.query(sqlGet,(err,result)=>{
        //response will come on json format
        return res.json(result);
        
    })
})
app.post("/api/addUser",(req,res)=>{
    const {uname,email,contact}=req.body;
    const sqlInsert="INSERT INTO user (uname,email,contact) VALUES (?,?,?)";
    db.query(sqlInsert,[uname,email,contact],(error,result)=>{
        if (error){
            console.log(error);
        }
        return res.status(200).json({msg:"ok"});
    })
})
app.delete("/api/deleteUser/:id",(req,res)=>{
    const {id}=req.params;
    const sqlDelete=`delete from user where id= ?`;
    db.query(sqlDelete,id,(error,result)=>{
        if (error){
            console.log(error);
        }
        return res.status(200).json({msg:"ok"});
    })
})
app.put("/api/updateUser/:id",(req,res)=>{
    const {id}=req.params;
    const values=[
        req.body.uname,
        req.body.email,
        req.body.contact,
    ]
    
    const sqlUpdate="update user set `uname`= ?,`email`= ?,`contact`= ? where id = ? ";
    db.query(sqlUpdate,[...values,id],(error,result)=>{
        if (error){
            console.log(error);
        }
        return res.status(200).json({msg:"ok"});
    })
})

app.listen(8081,(req,res)=>{
    console.log("Port Connected on 8081");
})