const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 3000;


require("./db/conn");
const Register = require("./models/registers");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// const st=path.join(__dirname,"../public");
const stview=path.join(__dirname,"../templates/views");
const stpar=path.join(__dirname,"../templates/partials");

// app.use(express.static(st));
app.set("view engine","hbs");
app.set("views",stview);
hbs.registerPartials(stpar);

// app.get("/",(req,res)=>{
//     res.send("Hello is here shresth")
// });


app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/register", async(req,res)=>{
    try {
        const pass = req.body.pass;
        const cnfpass = req.body.cnfpass;
        if(pass===cnfpass)
        {
            const registeremp = new Register({
                email: req.body.email,
                number: req.body.number,
                pass: req.body.pass,
                cnfpass: req.body.cnfpass,
                gender: req.body.gender
            })
            console.log(req.body.email,req.body.number,req.body.gender);
            const rg=await registeremp.save();
            res.status(201).render("index");
        }
        else{
            res.send("Not matching");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",async(req,res)=>{
    try {
        const email=req.body.email;
        const pass=req.body.pass;

        const useremail= await Register.findOne({email: email});
        if(useremail.pass===pass)
        {
            res.status(201).render("welcome",{
                email: email
            });
        }
        else{
            res.send("Invalid email or password")
        }
    } catch (error) {
        res.status(400).send("Envalid username or password");
    }
})

app.listen(port,()=>{
    console.log("Listening to 3000");
});