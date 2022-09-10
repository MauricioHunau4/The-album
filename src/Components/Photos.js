import { Paper, Typography, Modal, Box } from '@mui/material'
import React, { useState } from 'react'

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ExposureIcon from '@mui/icons-material/Exposure';
import IsoIcon from '@mui/icons-material/Iso';
import CameraIcon from '@mui/icons-material/Camera';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

const style = {
    position: 'relative',
    top: `45%`,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 500,
    border: "none",
    padding: 0,
    boxShadow: "none"
}
function Photos(props) {
    const [open, setOpen] = useState(false);
    const handleOpenClose = () => setOpen(!open);

    const exif = () => {
        if (props.Data.exif !== undefined) {
            if (props.Data.exif.model !== null) {
                return <Box className="box-information-camera" sx={{display:"block", position: "absolute", top: "12%", left: 20}} ><Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", border: "1px solid black",borderRadius:"5px", padding: "80px 60px", bgcolor: "hsla(15,15%,75%,1)" }}>
                    <Typography> {props.Data.exif.make}</Typography>
                    <PhotoCameraIcon sx={{ fontSize: "30 px" }} /><Typography sx={{ padding:" 0 0 5px 0" }}> Model: {props.Data.exif.model}</Typography>
                    <ExposureIcon sx={{ fontSize: "30 px" }} /><Typography sx={{ padding:" 0 0 5px 0" }}> Exposure time: {props.Data.exif.exposure_time}</Typography>
                    <IsoIcon sx={{ fontSize: "30 px" }} /><Typography sx={{ padding:" 0 0 5px 0" }}> ISO: {props.Data.exif.iso}</Typography>
                    <CameraIcon sx={{ fontSize: "30 px" }} /><Typography sx={{padding:" 0 0 5px 0" }}> Aperture: {props.Data.exif.aperture}</Typography>
                    <CenterFocusStrongIcon sx={{ fontSize: "30 px" }} /><Typography sx={{ padding:" 0 0 5px 0" }}>Focal Lenght {props.Data.exif.focal_length}</Typography>
                </Box></Box>
            }
        }
    }

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
                    {exif()}
                    <Box sx={style}>
                        <Typography variant="h6" sx={{
                            color: "white",
                            textAlign: "center"
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
                        <img src={props.Data.urls.full} alt={props.Data.user.username} className="photo" />
                    </Box></>
            </Modal>
        </>
    )
}

export default Photos

