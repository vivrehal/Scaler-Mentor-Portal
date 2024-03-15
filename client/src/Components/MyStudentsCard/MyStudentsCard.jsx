import React, { useEffect, useState } from 'react';
import styles from './MyStudentsCard.module.css';
import { updateMarks, removeStudent } from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { setRemoved } from '../../Store/mentorSlice';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../Store/loadingSlice';



const MyStudentsCard = ({ student }) => {

  const studentId = student._id;
  let submitted = false;

  // State Values
  const mentorId = useSelector((state)=> state.mentorSlice.mentor._id);
  let noOfStudents = useSelector((state)=> state.mentorSlice.mentor.studentIds);
  submitted = useSelector((state)=> state.mentorSlice.mentor.submit);

  // React States
  // const [ideation, setIdeation] = useState(student.marks.Ideation);
  // const [viva, setViva] = useState(student.marks.Viva);
  // const [execution, setExecution] = useState(student.marks.Execution);
  // const [presentation, setPresentation] = useState(student.marks.Presentation);
  // const [remarks, setRemarks] = useState(student.marks?.Remarks);
  // console.log(student.marks);
  const[marks, setMarks] = useState(student.marks);

  const handleChange=(e)=>{
    if(e.target.name!='Remarks' && Number.isInteger(parseInt(e.target.value)) ){
        if(e.target.value<0 || e.target.value>10){
          return
        }
        else{
          setError("")
        }
    }
    setMarks({...marks, [e.target.name]: e.target.value });
    // console.log(marks);
  }
  
  const dispatch = useDispatch();

  const[updating, setUpdating] = useState(false);

  const update=async()=>{
    if(error){
      alert("Please fill all the Marks")
      return
    }
    setUpdating(true);
    const { data } = await updateMarks({ studentId, ...marks  })
    console.log(data);
    setUpdating(false);
  }

  let removed = useSelector((state)=> state.mentorSlice.removed);

  const remove=async()=>{
    dispatch(setLoading(true))
    const { data } = await removeStudent({ studentId, mentorId });
    removed=!removed;
    dispatch(setRemoved(removed));
    console.log(data);
    dispatch(setLoading(false))
  }

  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  
  useEffect(()=>{
  const calculateTotal=()=>{  
    const marksArr=[parseInt(marks.Ideation), parseInt(marks.Viva), parseInt(marks.Execution), parseInt(marks.Presentation)]
    if(marksArr.some((mark)=> Number.isNaN(mark))){
      setTotal(0);
      setError("Please fill all the marks");
      return false;
    }
      setError("");
      setTotal(parseInt(marks.Ideation) + parseInt(marks.Viva) + parseInt(marks.Execution) + parseInt(marks.Presentation));
      // console.log(total)
      return true;
    }
    calculateTotal();
  }, [marks]);
  

  return (
    <div className={styles.cardWrapper}>
        <div className={styles.card}>
            <div className={styles.avatar}>
                <div className={styles.mentorVector}>
                  {student?.studentName.split(' ')[0][0] + student?.studentName.split(' ')[1] }
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.infoWrap}>
                    <div className={styles.name}>
                      <h2 className={styles.header_id}>{student.studentId}</h2>
                      <h2 className={styles.header_title}>{student.studentName}</h2>
                    </div>
                    <h2 className={styles.text}>cgpa : {(total/40)*10}</h2>
                    <div className={styles.form}>
                      <div className={styles.data}>
                        <div className={styles.inp_pair}>
                          <h3 className={styles.text}>Ideation :</h3>
                          <input className={styles.input} type='number' readOnly={submitted} value={marks.Ideation} name='Ideation' onChange={(e)=> {handleChange(e)}} />
                        </div>
                        <div className={styles.inp_pair}>
                          <h3 className={styles.text}>Viva :</h3>
                          <input className={styles.input} type='number' readOnly={submitted} value={marks.Viva} name='Viva' onChange={(e)=> {handleChange(e)}} />
                        </div>
                      </div>
                      <div className={styles.data}>
                      <div className={styles.inp_pair}>
                        <h3 className={styles.text}>Execution :</h3>
                        <input className={styles.input} type='number' readOnly={submitted} value={marks.Execution} name='Execution' onChange={(e)=> {handleChange(e)}} />
                      </div>
                      <div className={styles.inp_pair}>
                        <h3 className={styles.text}>Presentation :</h3>
                        <input className={styles.input} type='number' readOnly={submitted} value={marks.Presentation} name='Presentation' onChange={(e)=> {handleChange(e)}} />
                      </div>
                      </div>
                      <div className={styles.data}>
                      <div className={styles.inp_pair}>
                        <h3 className={styles.text}>Remarks :</h3>
                        <input className={styles.inputRemarks} type='text' name='Remarks' value={marks.Remarks} onChange={(e)=>{handleChange(e)}} />
                      </div>
                      </div>
                    </div>
                    <h2 className={styles.text}>Total : { total }</h2>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.buttons_wrapper}>
                    { 
                      !submitted && (<button className={styles.update} onClick={()=>{!updating && update()}}> {updating? `Updating...`:`Update`} </button>)
                    }
                    { 
                       !submitted && <button className={styles.update} onClick={remove}> Remove </button> 
                    }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyStudentsCard