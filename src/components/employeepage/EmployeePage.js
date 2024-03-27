import React, { useEffect } from 'react'
import styles from './employeepage.styles.module.css'
import eventData from '../../eventdata/demoEvent.json'
import YourEventCard from './YourEventCard.js'
import CalendarIcon from '../../icons/calendar.svg'
import TimelineItem from './TimelineItem.js'
import Filter from './Filter.js'

const EmployeePage = () => {
    let prevDate = null;
    const convertToDateObject = (dateString) => {
        const [month, day, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    // Sort eventData based on startDate
    const sortedEventData = eventData.slice().sort((a, b) => {
        const dateA = convertToDateObject(a.startDate);
        const dateB = convertToDateObject(b.startDate);
        return dateA - dateB; // Sort in ascending order (earliest date first)
    });

    return (
        <div className={styles.body}>
            <div className={styles.navbar}>
                <div className={styles.heading}>
                    <img src={CalendarIcon} />
                    <div>Upcoming Events</div>
                </div>
                <div className={styles.btns}>

                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.timelineContainer}>
                    {sortedEventData.map((item, index) => {
                        // Check if current event's date is different from previous event's date
                        const showDate = item.startDate !== prevDate;
                        // Update previous date
                        prevDate = item.startDate;
                        return (
                            <div key={index} className={styles.timeline}>
                                <TimelineItem eventDate={showDate ? item.startDate : null} />
                                <YourEventCard
                                    eventName={item.name}
                                    eventLocation={item.location}
                                    eventImage={item.imageUrl}
                                    eventDate={item.startDate}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className={styles.filterContainer}>
                    <Filter/>
                </div>
            </div>
        </div>
    )
}


export default EmployeePage