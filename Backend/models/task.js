const mongoose = require("mongoose")
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
       
    },
    desc:{
        type:String,
        required:true,
      

    },
    important:{
        type:Boolean,
        default:false,
    },
    complete:{
        type:Boolean,
        default:false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
module.exports = mongoose.model("Task", taskSchema);    