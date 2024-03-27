import React from 'react'
import styles from './youreventcard.style.module.css'
import locationIcon from '../../icons/location.svg'
import speakerIcon from '../../icons/speaker.svg'
import rightArrowIcon from '../../icons/rightbigarrow.svg'
import calendarIcon from '../../icons/calendar.svg'

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};

const YourEventCard = ({ eventName, eventLocation, eventImage, eventDate }) => {

  const formattedDate = formatDate(eventDate);
  return (
    <div className={styles.card}>
      <div className={styles.cardDetails}>
        <div className={styles.eventName}>{eventName}</div>
        <div className={styles.locationAndDateContainer}>
          <div className={styles.eventLocation}>
            <img src={locationIcon} width={24} height={24} />
            <div>{eventLocation}</div>
          </div>
          <div className={styles.eventDate}>
            <img src={calendarIcon} width={14} height={14} />
            <div>{formattedDate}</div>
          </div>
        </div>
        <div className={styles.eventSpeakers}>
          <div className={styles.heading}>Speakers :</div>
          <div className={styles.speakerContainer}>
            <img src={speakerIcon} width={24} height={24} />
            <div>Speaker 1, Speaker 2</div>
          </div>
        </div>
        <div className={styles.eventDetails}>
          <div className={styles.detailContainer}>
            <div>View Details</div>
            <img src={rightArrowIcon} width={50} height={24}/>
          </div>
        </div>
      </div>
      <div className={styles.cardImg}>
        <img src={eventImage} width={300} height={240} />
      </div>
    </div>
  )
}

export default YourEventCard