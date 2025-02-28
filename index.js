const express = require("express")
const app = express()
const userModel = require("./model-schema-db/user")
const path = require("path")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))


// app.get("/", (req, res)=>{
//     res.send("hii ")

// })

// for form route
app.get("/", (req, res)=>{
    console.log("Form route accessed");

    res.render("form")
    
})
// for login route
app.get("/login", (req, res) =>{
    res.render("login")

})


// for register -form
app.post("/create", (req, res) =>{



    let{username,email, password, age} = req.body

    // actual syntax
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    //         // Store hash in your password DB.
    //     });
    // });

    bcrypt.genSalt(10,  function(err, salt) {
        console.log("salt here",salt);
        
        bcrypt.hash(password, salt,async function(err, hash) {
            let createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age,
            })


            // generate jwt token
            // let token = jwt.sign({ email }, "shhhhhhhhhhh");
            // res.cookie("token", token)




            res.send(createdUser)

        });
    });


    // for login





   
})

// for login
app.post("/login", async (req, res)=>{
    let user = await userModel.findOne({email: req.body.email})
    if(!user) return res.send("something is wrong")

        // console.log(user.password, req.body.password);
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            // result == true
            if(result) {  
                let token = jwt.sign({email: user.email }, "shhhhhhhhhhh");
            res.cookie("token", token)


                res.send("u can log inn")}
                else res.send("no u cant")
        });
        
})


app.listen(3000, ()=>{
    console.log("port started at 3000");
    
})