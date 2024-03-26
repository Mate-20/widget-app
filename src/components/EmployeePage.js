import React from 'react'
import styles from './employeepage.styles.module.css'
import eventData from '../eventdata/demoEvent.json'
import YourEventCard from './YourEventCard.js'
import CalendarIcon from '../icons/calendar.svg'

const EmployeePage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div className={styles.heading}>
                    <img src={CalendarIcon}/>
                    <div>Upcoming Events</div>
                </div>
                <div className={styles.btns}>
                    
                </div>
            </div>
            {eventData.map((item, index) => {
                return (
                    <YourEventCard key={index} eventName={item.name} eventLocation={item.location} eventImage={item.imageUrl} />
                );
            })}
        </div>
    )
}


export default EmployeePage