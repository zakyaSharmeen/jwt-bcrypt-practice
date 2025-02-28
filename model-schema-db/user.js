// db
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/practice-jwt-bcrypt")
.then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });




// schema
const userSchema = mongoose.Schema({
    username: String,
    email:String,
    password: String,
    age: Number
})

// MODEL
module.exports= mongoose.model("users", userSchema)


