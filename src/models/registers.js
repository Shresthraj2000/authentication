const mongoose = require("mongoose");
 
const employeeSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    number:{
        type: Number,
        required: true,
    },
    pass:{
        type: String,
        required: true,
    },
    cnfpass:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    }
})

const Register = new mongoose.model("Register",employeeSchema);

module.exports = Register;