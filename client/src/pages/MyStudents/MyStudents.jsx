import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyStudents, submit } from '../../api';
import Card from '../../Components/MyStudentsCard/MyStudentsCard';
import styles from './MyStudents.module.css';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from '../Pdf/Pdf';
import { setLoading } from '../../Store/loadingSlice';


const MyStudents = () => {

    // Get Students
    const [students, setStudents] = useState([]);
    let id, removed; 
    let submitted=false;

    // Get state values
    id = useSelector((state)=> state.mentorSlice.mentor?._id)
    submitted = useSelector((state)=> state.mentorSlice.mentor?.submit)
    removed = useSelector((state)=> state.mentorSlice?.removed);
    let loading = useSelector((state)=> state.loadingSlice.loading);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        const myStudents=async()=>{
            dispatch(setLoading(true))
            if(!id){
                alert('Please login first');
                return;
            }
            const { data } = await getMyStudents({id})
            setStudents(data);
            dispatch(setLoading(false))
        }

        myStudents();
      }, [removed]);

    const submitClicked=async()=>{

        dispatch(setLoading(true))
        try{
            const { data } = await submit({mentorId: id});
            // console.log(data);
            navigate('/');
        }
        catch(err){
            console.log(err.response.data);
            alert(err.response.data)
        }
        dispatch(setLoading(false))
    }

    return (
        <>{loading ? <div className={styles.loader}><img src='https://c.tenor.com/FIzWAbQcjpYAAAAC/tenor.gif' alt='Loading...'></img></div>:(
            <div>
                {
                !submitted && students.length>0 ? <div className={styles.myButton}>
                    <button className={styles.submit} onClick={submitClicked}>Submit</button>
                </div>:
                <div className={styles.myButton}>
                    {submitted  && <h2 className={styles.submitted}>Submitted</h2>}
                    {!submitted && students.length===0 && <h2 className={styles.submitted}>Please Add Mentees</h2>}
                    {submitted && <PDFDownloadLink document={<Pdf mentor={{studentList :students}} />} fileName="Student_Details.pdf">
                                    {   ({loading}) => (loading ? 'Loading document...'
                                    : 
                                    <button className={styles.submit}>Print </button>)}
                                </PDFDownloadLink>}
                </div>
                }

            
                <div className={styles.hero}>
                    {students.length>0?<div className={styles.wrapper}>
                        {
                            students.map(student => <Card key={student._id} student={student} />)
                        }
                    </div>:<h2 className={styles.noStudents}>No Students</h2>}
                    
                </div>
            </div>)
            }
        </>
    )
}

export default MyStudents