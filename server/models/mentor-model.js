import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const mentorSchema = new Schema({
    mentorId : { type: String, reuqired: true },
    mentorName: { type: String, required: true },
    studentIds: { type: Array, required: false },
    submit: { type:Boolean, required: false, default: false }
}, {
    timestamps: true
})

const mentorModel = mongoose.model('Mentor', mentorSchema);
export default mentorModel;