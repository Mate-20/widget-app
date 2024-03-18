import React, { useState, useEffect } from 'react'
import styles from './addeventform.style.module.css'
import RangePicker from './RangePicker';
import LocationIcon from '../icons/location.svg'
import DateIcon from '../icons/calendar.svg'
import DescIcon from '../icons/page.svg'
import usePosterGenerator from '../service/posterGenerator';
import Placeholder from '../assets/placeholder.png'
import DescriptionModal from './DescriptionModal';

const AddEventForm = (props) => {
  // Defining the States
  const { isLoading, imageUrl, generatePrompt } = usePosterGenerator();
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState({
    placeHolder: Placeholder,
    file: null
  });
  const [logoUrl, setLogoUrl] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // We need to make a re render, else it wont show the changes in the form
  useEffect(() => {
    setEventName(props.selectedEvent?.name || '');
    setLocation(props.selectedEvent?.location || '')
    setDescription(props.selectedEvent?.description || '')
    setStartDate(props.selectedEvent?.startDate || '')
    setEndDate(props.selectedEvent?.endDate || '')
    setLogoUrl(props.selectedEvent?.logo || "")
  }, [props.selectedEvent]);

  useEffect(() => {
    // As soon as location changes, we want to trigger the poster generation. We cant put this in above useEffect, as setState is async, if will pass the location and description just after setting it, it will be passed empty
    if (location && description) {
      generatePrompt(location, description)
    }
  }, [description, location])

  useEffect(() => {
    // Update the image state when generatedImage change
    if (imageUrl) {
      setImage({ placeHolder: imageUrl, file: null });
    }
  }, [imageUrl]);

  const handleDescription = (value) => {
    setDescription(value)
  }

  const handlePoster = () => {
    if (!props.formDisabled) {
      generatePrompt(location, description)
    }

  }


  const handleImageChange = (e) => {
    // Handle image upload and set state for image preview
    if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/jpeg') {

      // Showing Pewiew of Image
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage({
          placeHolder: event.target.result,
          file: e.target.files[0]
        })
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      // toast.error("Wrong Image Type");
      image.file = null;
    }
  };

  const handleModal = () => {
    if (!props.formDisabled) {
      setIsModalOpen(!isModalOpen)
    }
  }

  const handleSubmit = (e) => {
    // Calling 12 hr format time method
    e.preventDefault();

    // Fetching existing data from local storage
    const existingData = JSON.parse(localStorage.getItem('newEvent')) || [];
    // Creating new object with entered fields
    const newEvent = {
      id: existingData.length + 1,
      eventName,
      startDate,
      endDate,
      location,
      image
    };

    // Updated data with new field
    const updatedData = [...existingData, newEvent]

    // toast.success("Event Listed");

    // Storing data in local storage
    localStorage.setItem('newEvent', JSON.stringify(updatedData));

    // Setting all the fields to empty values
    setEventName("");
    setEndDate("")
    setStartDate("");
    setLocation("");
    setImage({
      placeHolder: Placeholder,
      file: null
    })
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} >
        <div className={styles.imageContainer}>
          {/* <input className={styles.promptInput} value={prompt} placeholder='Enter The Prompt' onChange={(e) => setPrompt(e.target.value)} /> */}
          <div className={styles.btns}>
            <label onClick={handlePoster} className={props.formDisabled ? styles.disabled : ""}>AI Generate</label>
            <label htmlFor='fileUpload' className={props.formDisabled ? styles.disabled : ""}>Upload Image</label>
            <input id='fileUpload' type="file" onChange={handleImageChange} disabled={props.formDisabled} />
          </div>
          <div className={styles.imageHolder}>
            {isLoading ? (
              <div className={styles.loader}>
                <div></div>
              </div>
            ) : (
              <div>
                <img src={image.placeHolder} alt="" />
                <div className={styles.imageLocation}>{location}</div>
                <img src={logoUrl} alt='logo' className={styles.logo}></img>
              </div>
            )}
          </div>
        </div>
        <div className={styles.leftform}>
          <input type="text" className={styles.eventname} value={eventName} onChange={(e) => setEventName(e.target.value)} required placeholder='Event Name' disabled={props.formDisabled} />
          <div className={styles.dateContainer}>
            <div className={styles.dateIconContainer}>
              <img src={DateIcon} alt='SearchIcon' />
              <span className={`${styles.heading} ${props.formDisabled ? styles.disabled : ""}`}>Dates</span>
            </div>
            <div className={styles.input}><RangePicker startDate={startDate} endDate={endDate} disabled = {props.formDisabled} /></div>
          </div>
          <div className={styles.locationContainer}>
            <img src={LocationIcon} alt='LocationIcon' />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required placeholder='Location' disabled={props.formDisabled} />
          </div>
          <div className={styles.descContainer} onClick={handleModal}>
            <img src={DescIcon} alt='DescIcon' />
            <div className={styles.headingContainer}>
              <div className={`${styles.descHeading} ${props.formDisabled ? styles.disabled : ""}`} >Description</div>
              {description.length > 0 && <input className={styles.descPara} disabled={true} value={description} />}
            </div>

          </div>
          <button type="submit" className={styles.submitBtn} disabled={props.formDisabled}>Add Event</button>
        </div>
      </form>
      <div className={`${styles.modal} ${isModalOpen ? styles.modalOpen : ""} `}>
        <DescriptionModal handleModal={handleModal} handleDescription={handleDescription} />
      </div>
    </div>
  )
}


export default AddEventForm