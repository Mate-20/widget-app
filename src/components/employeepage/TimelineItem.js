import React from 'react'
import styles from './timelineitem.style.module.css'

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
};
const TimelineItem = ({ eventDate }) => {

    let formattedDate = "";
    
    // If eventdate is null we dont want to format it
    if (eventDate !== null) {
        formattedDate = formatDate(eventDate);
    }

    // We will not show the circle if date is empty
    const showCircle = formattedDate !== "";

    return (
        <div className={`${styles.timelineItem} ${showCircle ? styles.showCircle : ""}`}>
            {formattedDate}
        </div>
    );
};


export default TimelineItem