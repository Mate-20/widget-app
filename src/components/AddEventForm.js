import React, { useState } from 'react'
import styles from './addeventform.style.module.css'
import RangePicker from './RangePicker';
import LocationIcon from '../icons/location.svg'
import DateIcon from '../icons/calendar.svg'
import DescIcon from '../icons/page.svg'
import Placeholder from '../assets/placeholder.png'

const AddEventForm = () => {
  // Defining the States
  const [id, setId] = useState('');
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState({
    placeHolder: Placeholder,
    file: null
  });
  const [prompt, setPrompt] = useState("")

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

  const generatePoster = () => {
    const apiKey = process.env.REACT_APP_RUNPOD_API_KEY;
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: apiKey
      },
      body: JSON.stringify({
        input: {
          prompt,
          num_inference_steps: 25,
          refiner_inference_steps: 50,
          width: 400,
          height: 400,
          guidance_scale: 7.5,
          strength: 0.3,
          seed: null,
          num_images: 1
        }
      })
    };

    fetch('https://api.runpod.ai/v2/sdxl/runsync', options)
      .then(response => response.json())
      .then(response => setImage({placeHolder : response.output.image_url, file:null}))
      .catch(err => console.error(err));
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.leftform}>
          <div className="">
            <input type="text" className={styles.eventname} value={eventName} onChange={(e) => setEventName(e.target.value)} required placeholder='Event Name' />
          </div>
          <div className={styles.dateContainer}>
            <div className={styles.dateIconContainer}>
              <img src={DateIcon} alt='SearchIcon' />
              <span className={styles.heading}>Add Date</span>
            </div>
            <div className={styles.input}><RangePicker /></div>
          </div>
          <div className={styles.locationContainer}>
            <img src={LocationIcon} alt='LocationIcon' />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required placeholder='Location' />
          </div>
          <div className={styles.descContainer}>
            <img src={DescIcon} alt='DescIcon' />
            <span className={styles.heading}>Description</span>
          </div>
          <button type="submit" className={styles.submitBtn}>ADD EVENT</button>
        </div>
        <div className={styles.imageContainer}>
          <label className={styles.imagetext}>Upload / Generate Poster</label>
          {/* <input type="file" onChange={handleImageChange} required /> */}
          <input placeholder='Enter The Prompt' onChange={(e) => setPrompt(e.target.value)} />
          <button type='button' onClick={generatePoster}>Generate Poster</button>
          <img src={image.placeHolder} alt="" />
        </div>
      </form>
    </div>
  )
}


export default AddEventForm