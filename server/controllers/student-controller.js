import studentUtil from '../utils/student-util.js';


    const createStudent=async(req, res)=>{

        const { studentId, studentName, cgpa, email } = req.body;

        if(!studentId || !studentName || !email){
            res.status(404).send("All mandatory fields are required");
        }

        let student;

        try{
            student = await studentUtil.findStudent({studentId})
            if(!student){
                student = await studentUtil.createStudent({studentId, studentName, cgpa, email});
            }
        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }

        res.status(200).send(student);
    }

    const updateMarks=async(req, res)=>{

        // console.log(req.body);
        let student;
        try{
            student = await studentUtil.update({ ...req.body }); 
            // console.log(student);

        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }

        res.status(200).send(student)
    }

    const getStudents=async(req, res)=>{
        let students;

        try{
            students = await studentUtil.students();
        }catch(err){
            console.log(err);
            res.status(500).send("DB Error");
        }

        res.status(200).send(students);
    }

    const setAllStudentsStatus=async(req, res)=>{
        const { status } = req.body;
        // console.log(status)
        let students;
        try{
            students = await studentUtil.setSubmitStatus(status);
        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }
        res.status(200).send(students);
    }


export { createStudent, updateMarks, getStudents, setAllStudentsStatus}