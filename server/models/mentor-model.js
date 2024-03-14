import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const mentorSchema = new Schema({
    // phone: { type:String, required: true},
    // activated: { type:false, required:false, default:true }
    mentorId : { type: String, reuqired: true },
    mentorName: { type: String, required: true },
    studentIds: { type: Array, required: false },
    submit: { type:Boolean, required: false, default: false }
}, {
    timestamps: true
})

const mentorModel = mongoose.model('Mentor', mentorSchema);
export default mentorModel;