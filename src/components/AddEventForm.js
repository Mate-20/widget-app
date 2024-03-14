import React, { useState, useEffect } from 'react'
import styles from './addeventform.style.module.css'
import RangePicker from './RangePicker';
import LocationIcon from '../icons/location.svg'
import DateIcon from '../icons/calendar.svg'
import DescIcon from '../icons/page.svg'
import usePosterGenerator from '../service/posterGenerator';
import Placeholder from '../assets/placeholder.png'

const AddEventForm = (props) => {
  // Defining the States
  const { isLoading, imageUrl, generatePrompt } = usePosterGenerator();
  const [id, setId] = useState('');
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState({
    placeHolder: Placeholder,
    file: null
  });
  // We need to make a re render, else it wont show the changes in the form
  useEffect(() => {
    setEventName(props.selectedEvent?.name || '');
    setLocation(props.selectedEvent?.location || '')
    setDescription(props.selectedEvent?.description || '')
    setStartDate(props.selectedEvent?.startDate || '')
    setEndDate(props.selectedEvent?.endDate || '')
  }, [props.selectedEvent]);

  useEffect(() => {
    // As soon as location changes, we want to trigger the poster generation. We cant put this in above useEffect, as setState is async, if will pass the location and description just after setting it, it will be passed empty
    if (location) {
      generatePrompt(location, description)
    }
  }, [description, location])

  useEffect(() => {
    // Update the image state when generatedImage change
    if (imageUrl) {
      setImage({ placeHolder: imageUrl, file: null });
    }
  }, [imageUrl]);

  const handlePoster = () => {
    generatePrompt(location, description)
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
      toast.error("Wrong Image Type");
      image.file = null;
    }
  };

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

    toast.success("Event Listed");

    // Storing data in local storage
    localStorage.setItem('newEvent', JSON.stringify(updatedData));

    // Setting all the fields to empty values
    setId("");
    setEventName("");
    setEndDate("")
    setStartDate("");
    setLocation("");
    setImage({
      placeHolder: defaultImage,
      file: null
    })
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} >
        <div className={styles.leftform}>
          <div className="">
            <input type="text" className={styles.eventname} value={eventName} onChange={(e) => setEventName(e.target.value)} required placeholder='Event Name' disabled={props.formDisabled} />
          </div>
          <div className={styles.dateContainer}>
            <div className={styles.dateIconContainer}>
              <img src={DateIcon} alt='SearchIcon' />
              <span className={styles.heading}>Add Date</span>
            </div>
            <div className={styles.input}><RangePicker startDate={startDate} endDate={endDate} /></div>
          </div>
          <div className={styles.locationContainer}>
            <img src={LocationIcon} alt='LocationIcon' />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required placeholder='Location' disabled={props.formDisabled} />
          </div>
          <div className={styles.descContainer}>
            <img src={DescIcon} alt='DescIcon' />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required placeholder='Description' disabled={props.formDisabled} />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={props.formDisabled}>ADD EVENT</button>
        </div>
        <div className={styles.imageContainer}>
          <label className={styles.imagetext}>Upload / Generate Poster</label>
          {/* <input className={styles.promptInput} value={prompt} placeholder='Enter The Prompt' onChange={(e) => setPrompt(e.target.value)} /> */}
          <div className={styles.btns}>
            <button type='button' onClick={handlePoster} disabled={props.formDisabled}>Generate Poster</button>
            <input type="file" onChange={handleImageChange} disabled={props.formDisabled} />
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
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}


export default AddEventForm