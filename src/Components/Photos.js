import { Paper, Typography, Modal, Box } from '@mui/material'
import React, { useState } from 'react'

const style = {
    display: "flex",
    flexDirection: "column",
    position: 'absolute',
    top: "50%",
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    height: "auto",
    border: "none",
    padding: 0,
    boxShadow: "none"
}

function Photos(props) {
    const [open, setOpen] = useState(false);
    const handleOpenClose = () => setOpen(!open);

    return (
        <>
            <Paper className="active fade-bottom" elevation={6} sx={{
                width: `${props.Data}`,
                height: "200px",
                cursor: "pointer",
                '&:hover': {
                    transform: "rotate(2deg)",
                    opacity: "0.5",
                    '.text': {
                        display: "block",
                    }
                }
            }}>
                <img src={props.Data.urls.small} alt="img" onClick={() => { handleOpenClose() }} />
            </Paper>
            <Modal
                open={open}
                onClose={handleOpenClose}
            ><>
                    <Box sx={style}>
                        <Box sx={{ display: "flex" }}>
                            <Box sx={{ height: `700px` }} onClick={handleOpenClose}>
                                <img src={props.Data.urls.full} alt={props.Data.user.username} className="photo" />
                            </Box>
                        </Box>
                        <Typography variant="h6" sx={{
                            color: "white",
                            textAlign: "center",
                        }}> Photo by <a
                            href={`${props.Data.user.links.html}/?utm_source=the_album&utm_medium=referral`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='link'>{props.Data.user.username}</a> on
                            <a href='https://unsplash.com/es/?utm_source=the_album&utm_medium=referral'
                                target="_blank"
                                rel="noopener noreferrer"
                                className='link'> Unplash</a>
                        </Typography>

                    </Box>
                </>
            </Modal>
        </>
    )
}

export default Photos

