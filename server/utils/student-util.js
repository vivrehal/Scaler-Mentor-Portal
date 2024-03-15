import Student from "../models/student-model.js";
import marksheet from "../templates/marksheet.js";
import sendEmail from './email-util.js';

const createStudent=async(data)=>{
    const student = await Student.create(data);
    return student;
}

const setStatus=async(data)=>{
    try{
        await Student.updateOne({ _id: data.id }, { assigned: data.status });
    }catch(err){
        console.log(err);
    }
}

const setSubmitStatus=async(status)=>{
    const students = await Student.find();
    for(let i=0; i<students.length; i++){
        try{
            await Student.updateOne({ _id: students[i]._id }, { Submitted: status });
            const student = await Student.findOne( { _id: students[i]._id })
        }catch(err){
            console.log(err);
        }
    }
}

const submit=async(data)=>{
    const students = data;
    let updatedStudents = [];
    for(let i=0; i<students.length; i++){
        try{
            await Student.updateOne({ _id: students[i] }, { Submitted: true });
            const student = await Student.findOne( { _id: students[i] })
            updatedStudents.push(student);
            let total = 0;
            total = student.marks.Viva + student.marks.Ideation + student.marks.Execution + student.marks.Presentation;
            // console.log(total);
            // email the student
            const response=await sendEmail({
                from: 'dhimanvivek777@gmail.com',
                sendername: "Vivek",
                to: student.email,
                subject: "Total Marks",
                html: marksheet(student, total)
            })
            if(!response){
                return ({message: "Email not sent", success: false});
            }
            console.log(response);
            
            console.log("success");
        }catch(err){
            console.log(err);
        }
    }
    return updatedStudents;
}

const update=async(data)=>{
    const id = data.studentId;
    const Ideation = data.Ideation;
    const Execution = data.Execution;
    const Viva = data.Viva;
    const Presentation = data.Presentation;
    const Remarks = data.Remarks;

    let student;
    try{
        await Student.updateOne({_id: id}, {
            
                "marks.Ideation": Ideation,
                "marks.Execution": Execution,
                "marks.Viva": Viva,
                "marks.Presentation": Presentation,
                "marks.Remarks": Remarks
        })
       
        student = await Student.findOne({_id: id});
    }catch(err){
        console.log(err);
    }
    return student;
}

const students=async()=>{
    const students = await Student.find();
    return students;
}

const getStudents=async(ids)=>{
    let allStudents = [];
    for(let i=0; i<ids.length; i++){
        const student = await Student.findOne({ _id: ids[i] });
        allStudents.push(student);
    }
    return allStudents;
}

const studentUtil = { createStudent, setStatus, submit, update, students, getStudents, setSubmitStatus}

export default studentUtil;