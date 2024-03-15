import React, {useState, useEffect} from 'react';
import styles from './NavBar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from '../../pages/Pdf/Pdf';


const NavBar = () => {

  const navigate = useNavigate();

  const id=useSelector((state)=> state.mentorSlice.mentor?._id)
  
  const [mentorId, setMentorId] = useState(null);
  
  useEffect(() => {
      if(!id){
        alert('Please login first');
        navigate('/')
      }
      setMentorId(id)
  },[id]) ;

  return (
    <div className={styles.navbar}>
        <div className={styles.logo}>
            <h1 className={styles.text}>MENTOR-<span className={styles.title_span}>P</span></h1>
        </div>
        <div className={styles.links}>
            <Link className={styles.link} to='/'>Mentors</Link>
            {mentorId && <Link className={styles.link} to='/students'>Students</Link>}
            {mentorId && <Link className={styles.link} to='/mystudents'>My Students</Link>}
        </div>
    </div>
  )
}

export default NavBar;