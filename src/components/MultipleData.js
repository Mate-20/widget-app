import React, { useState } from 'react'
import styles from './multipledata.style.module.css'
import Cards from "./Cards"
import Modal from "./Modal"
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
    body: ({ theme }) => ({
        background: theme === 'dark' ? 'var(--dark-gradient)' : theme === "light"?'var(--light-gradient)':"none"
    }),
    navContainer: {
        height: 'fit-content',
        width: '100%',
        overflowX: 'scroll',
    },
    cardNavStyle: {
        columnGap: 30,
        display: 'flex',
        margin: 30,
    },
    sideContainer: {
        width: 'fit-content',
        height: '100vh',
        overflowY: 'scroll',
    },
    cardSideStyle: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 20,
        margin: 30,
    },
    gridContainer: {
        padding: 50,
    },
    cardGridStyle: {
        marginTop: 30,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        justifyItems: 'center',
        rowGap: 30,
    },
    heading:({theme})=>({
        fontSize: 35,
        color: theme === "dark" ? "white":theme==="light"?"#121211":"" ,
        fontWeight: 900,
    }),
    modal: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate("-50%", "-50%")"
    },
    blur: {
        overflow: "hidden",
        filter: blur(3),
    },
});
const MultipleData = ({ cardData, layout, theme }) => {
    const classes = useStyles({ theme });
    const [IsModalOpen, SetIsModalOpen] = useState(false)

    const handleModal = (IsOpen) => {
        SetIsModalOpen(IsOpen)
    }

    return (
        <div className={classes.body}>
          <div className={`${layout === "navbar" ? classes.navContainer : layout === "sidebar" ? classes.sideContainer : classes.gridContainer} ${IsModalOpen ? classes.blur : ""}`}>
            <div className={classes.heading}>Your Events</div>
            <div className={`${layout === "navbar" ? classes.cardNavStyle : layout === "sidebar" ? classes.cardSideStyle : classes.cardGridStyle}`}>
              {cardData.map((item, key) => (
                <Cards theme={theme} key={key} image={item.image} date={item.date} eventName={item.eventName} location={item.location} handleModal={handleModal} />
              ))}
            </div>
          </div>
          {IsModalOpen && (
            <div className={classes.modal}>
              <Modal handleModal={handleModal} dataNumber={3} />
            </div>
          )}
        </div>

    )
}

export default MultipleData