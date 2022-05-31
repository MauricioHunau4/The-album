import React, { useState } from 'react';

import { Grid, Paper, Typography, Modal, Box } from '@mui/material';

import { styled } from '@mui/material/styles';


function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}
window.addEventListener("scroll", reveal);

// the style for the modal box
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 500,
    border: "none",
    padding: 0,
    boxShadow: "none",
};

//style for the component Item
const Item = styled(Paper)((props) => ({
    backgroundImage: `url(${props.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "center",
    cursor: "pointer",
    height: "200px",
    padding: "80px 0",
    margin: "15px",
    '&:hover': {
        transform: "rotate(2deg)",
        opacity: "0.5",
        '.text': {
            display: "block",
        }
    }
}));


function GridItem(props) {
    //Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const handleClose = () => setOpen(!open);

    let backIn = ""
    
    // function for the animations
    const backinfunc = () => {
         if (props.id === 1) {
                    backIn = "animate__animated animate__backInLeft";
                } else if (props.id === 2) {
                    backIn = "animate__animated animate__backInRight";
                } else if (props.id === 3) {
                    backIn = "fade-down"
                } else if (props.id === 4) {
                    backIn = "animation-infinite"
                } else if (props.id === 5) {
                    backIn = "fade-bottom"
                } else if (props.id === 6) {
                    backIn = "fade-right"
                } else if (props.id === 7) {
                    backIn = "fade-left"
                } 
       
    }


    return (<>
        {backinfunc()}
        <Grid item xs={3}
            className={`reveal ${backIn}`}>
            <Item elevation={10} img={props.img} onClick={handleOpen} >
                <Typography className="text" variant="h4" sx={{
                    color: "rgb(204, 204, 204)",
                    textAlign: "center",
                    display: "none"
                }}>
                    {props.title}
                </Typography>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        <img src={props.imgfull} alt={props.user} className="photo" />
                        <Typography variant="h6" sx={{
                            color: "white",
                            textAlign: "center"
                        }}> Photo by <a
                            href={`${props.link}/?utm_source=the_album&utm_medium=referral`}
                            target="_blank"
                            rel="noreferrer"
                            className='link'>{props.username}</a> on
                            <a href='https://unsplash.com/es/?utm_source=the_album&utm_medium=referral'
                                target="_blank"
                                rel="noreferrer"
                                className='link'> Unplash </a></Typography>
                    </Box>
                </Modal>
            </Item>
        </Grid>
    </>
    )
}

export default GridItem;