import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    age:{type:Number,required:true, true:true},
    fees:{type:Number,required:true, true:true, Validate:(v)=>v>= 5000.5 }
})

const StudentModel = mongoose.model("student",StudentSchema);

export default StudentModel;