import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentId: { type:String, required:true },
    studentName: { type:String, required:true },
    marks: {
        Ideation: { type:Number, required:false, default:0 },
        Execution: { type:Number, required:false, default:0 },
        Viva: { type:Number, required:false, default:0 },
        Presentation: { type:Number, required:false, default:0 },
        Remarks: { type:String, required:false, default:"No remarks" }
    },
    assigned: { type:Boolean, required:false, default:false  },
    email: { type:String, required:true, default:"" },
    phone: { type:String,  required:false, default:""},
    Submitted: { type:Boolean, required:false, default:false }
})

const studentModel= mongoose.model('Student', studentSchema);
export default studentModel;