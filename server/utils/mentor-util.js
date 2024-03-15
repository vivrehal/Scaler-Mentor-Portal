import Mentor from "../models/mentor-model.js";
import studentUtil from "./student-util.js";


const createMentor=async(data)=>{
    const mentor = await Mentor.create(data);
    return mentor;
}

const addStudent=async(data)=>{
    
    const mentor = await Mentor.findOne({ _id: data.mentorId });
    const numberOfStudents = mentor.studentIds.length;
    if(numberOfStudents >= 4){
        return { message: "Can't add more than 4 students" };
    }
    try{
        await Mentor.updateOne({ _id: mentor._id }, {
            $push: { studentIds: data.studentId }
        })
    }catch(err){
        console.log(err);
        return mentor;
    }
    const status = true;
    const id = data.studentId;

    studentUtil.setStatus({ id, status });
    return mentor;
}

const removeStudent=async(data)=>{
    
    const mentor = await Mentor.findOne({ _id: data.mentorId });
    try{
        // console.log(mentor);
        await Mentor.updateOne({ _id: mentor._id }, {
            $pull: { studentIds: data.studentId }
        })
    }catch(err){
        console.log(err);
        return mentor;
    }
    const status = false;
    const id = data.studentId;

    studentUtil.setStatus({ id, status});
    return mentor;
}



const submit=async(id)=>{
    
    const mentor = await Mentor.findOne({_id: id});
    const students = mentor.studentIds;
    if(students.length < 3){
        return { message: "Can't submit with less than 3 students" };
    }
    await Mentor.updateOne({ _id: id }, {
        submit : true
    });
    let updatedStudents;
    try{
        // update students
        updatedStudents = studentUtil.submit(students);
        if(updatedStudents?.success==false){
            return { message: "Can't send emails to students"};
        }
    }catch(err){
        console.log(err);
    }
    return updatedStudents;
}


const mentors=async()=>{
    const mentors = await Mentor.find();
    return mentors;
}


const getMyStudents=async(id)=>{
    const mentor = await Mentor.findOne({ _id:id });
    const ids = mentor?.studentIds;
    const allStudents = studentUtil.getStudents(ids);
    return allStudents;
}


const mentorUtil = {
    createMentor,
    addStudent,
    removeStudent,
    submit,
    mentors,
    getMyStudents
}

export default mentorUtil;