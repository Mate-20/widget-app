import React, { useEffect, useState } from 'react'
import { Button, Calendar, CalendarCell, CalendarGrid, Heading } from 'react-aria-components';
import styles from './modal.style.module.css'
import { BiWorld } from "react-icons/bi";
import RegisterForm from './RegisterForm';


const Modal = (props) => {

    const timeData = ["10:00 am", "11:00 am", "2:00 pm"]

    const [IsTimeSelected, SetIsTimeSelected] = useState(null)
    const [Time, SetTime] = useState("")
    const [IsFormOpen, SetIsFormOpen] = useState(false);

    useEffect(()=>{
        const date = new Date()
        const time = date.toLocaleTimeString();
        SetTime(time)
    },[])

    const handleTime = (time) => {
        SetIsTimeSelected(time)
    }

    // For closing the Calendar modal
    const handleModal = () => {
        props.handleModal(false)
    }

    // For opening and closing the Form Modal
    const handleFormModal = (value)=>{
        SetIsFormOpen(value)
    }

    return (
        <div>
            {!IsFormOpen && (<div className={styles.container}>
                <div className={styles.calendar}>
                    <Calendar aria-label="Appointment date" className={styles.ariaCalendar}>
                        <header>
                            <Button slot="previous" className={styles.ariaBtn}>◀</Button>
                            <Heading className={styles.ariaHeading} />
                            <Button slot="next" className={styles.ariaBtn}>▶</Button>
                        </header>
                        <CalendarGrid className={styles.ariaGrid}>
                            {(date) => <CalendarCell date={date} className={styles.ariaCell} />}
                        </CalendarGrid>
                    </Calendar>
                    <div className={styles.timeZone}>
                        <div style={{fontWeight:600}}>Time Zone</div>
                        <div className={styles.ist}>
                            <div style={{marginTop:2, marginRight:5}}><BiWorld /></div>
                            <div>{`Indian Standard Time (${Time})`} </div>
                        </div>
                    </div>
                </div>
                <div className={styles.timeSlots}>
                    <h1>Time Slots</h1>
                    {timeData.map((item, key) => (
                        <div key={key}
                            className={`${styles.time} ${IsTimeSelected === item ? styles.selectedTime : ''}`}
                            onClick={() => handleTime(item)}
                        >{item}</div>
                    ))}
                    <div className={styles.btns}>
                        <button className={styles.nextBtn} onClick={()=>handleFormModal(true)}>Next</button>
                        <button className={styles.cancelBtn} onClick={handleModal}>x</button>
                    </div>
                </div>
            </div>)}
            {IsFormOpen && (<div className={styles.container}>
                {/* Sending the form modal function so that it can be closed */}
                <RegisterForm handleFormModal = {handleFormModal} dataNumber={props.dataNumber}/>
            </div>)}
        </div>
    )
}

export default Modal