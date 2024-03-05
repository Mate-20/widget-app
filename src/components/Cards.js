import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    card:({theme})=>({
        border : '1px solid black',
        backgroundColor: 'rgb(233, 233, 233)',
        width: 350,
        borderRadius: 15,
        cursor: 'pointer',
        '&:hover': {
            transitionDuration: '.2s',
            filter: 'drop-shadow(1px 1px 5px rgb(245, 245, 245))',
        },
    }),
    content: {
        padding: 20,
    },
    tag: {
        backgroundColor: 'rgb(253, 219, 109)',
        borderRadius: 30,
        width: 'fit-content',
        padding: '5px 20px',
        fontWeight: 'bold',
        color: 'rgb(39, 39, 39)',
        fontSize: 20,
    },
    img: {
        '& img': {
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
        }
    },
    date: {
        marginTop: 20,
        color: 'rgb(39, 39, 39)',
        fontSize: 20,
    },
    eventName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'rgb(96, 63, 240)',
    },
    location: {
        fontSize: 20,
        marginTop: 60,
        display: 'flex',
        '& div': {
            marginRight: 10,
        },
    },
    btn: {
        marginTop: 10,
        display: 'flex',
        border: '2px solid rgb(96, 63, 240)',
        borderRadius: 20,
        width: 'fit-content',
        padding: '5px 20px',
        alignItems: 'center',
        '& div': {
            color: 'rgb(96, 63, 240)',
            marginRight: 10,
        },
        '&:hover': {
            transitionDuration: '.3s',
            backgroundColor: 'rgb(96, 63, 240)',
        },
        '&:hover div': {
            transitionDuration: '.3s',
            color: 'white',
        },
    },
});
const Cards = (props, theme) => {
    const classes = useStyles({theme});

    const handleModal = () => {
        props.handleModal(true);
    };

    return (
        <div className={classes.card} onClick={handleModal}>
            <div className={classes.img}>
                <img src={props.image} width={350} height={200} alt="author" />
            </div>
            <div className={classes.content}>
                <div className={classes.tag}>Events</div>
                <div className={classes.date}>{props.date}</div>
                <div className={classes.eventName}>{props.eventName}</div>
                <div className={classes.location}>
                    <div><IoLocationOutline /></div>
                    <div>{props.location}</div>
                </div>
                <div className={classes.btn}>
                    <div>Register</div>
                    <div><FaArrowRightLong /></div>
                </div>
            </div>
        </div>
    );
};

export default Cards