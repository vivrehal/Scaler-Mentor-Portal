import React, { useState, useEffect } from 'react';
import styles from './Home.module.css'
import Card from '../../Components/MentorCard/Card'
import { getMentors } from '../../api';
import { useDispatch, useSelector} from 'react-redux';
import { setLoading } from '../../Store/loadingSlice';

const Home = () => {

    const [mentors, setMentors] = useState([]);
    
    const dispatch = useDispatch();
    let loading = useSelector((state)=> state.loadingSlice.loading);

    useEffect(() => {
        const allMentors=async()=>{
            dispatch(setLoading(true))
            const { data } = await getMentors();
            // console.log(data)
            setMentors(data);
            dispatch(setLoading(false))
        }
    
        allMentors();
      }, []);

  return (
        <>
            {
            loading ? <div className={styles.loader}>
                <img src="https://c.tenor.com/FIzWAbQcjpYAAAAC/tenor.gif" alt="Loading" />
            </div>:
            <div className={styles.hero}>
                <div className={styles.wrapper}>
                    {
                        mentors.map(mentor => <Card key={mentor._id} mentor={mentor} />)
                    }
                </div>
            </div>
            }
        </>
  )
}

export default Home
