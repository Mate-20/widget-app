import React, {useState} from 'react'
import styles from './popupwidget.style.module.css'

const PopupWidget = () => {
    const [isVisible, setIsVisible] = useState(true);
  
    const handleClose = () => {
      setIsVisible(false);
    };
  
    return (
      <>
        {isVisible && (
          <div className={styles.popupModal}>
            <div className={styles.popupContent}>
              <h2>Popup Content</h2>
              <p>This is the content of the popup.</p>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        )}
      </>
    );
  };
  

export default PopupWidget