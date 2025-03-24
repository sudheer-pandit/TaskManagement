const mongoose = require("mongoose")
require("dotenv").config();
const conn = async()=>{
    try {
        const response = await mongoose.connect(`${process.env.MONGO_URI}`
            
        );
            if(response){
                console.log("Connected to DB");
            }
        
    } catch (error) {
        console.log("Error from Connection",error)
    }
}
conn();

