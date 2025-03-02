//import react
import React, { useState, useEffect } from 'react';

//Import MUI
import { InputLabel, MenuItem, Select, Typography, Modal } from '@mui/material/';
import { FormControl, Button } from '@mui/material';
import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import RefreshIcon from '@mui/icons-material/Refresh';
import Photos from './Photos';

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

const styleInfoBox = {
  position: 'absolute',
  display: 'flex',
  gap: '0.5rem',
  flexDirection: 'column',
  right: '-200px',
  backgroundColor: '#C9BAB6',
  borderRadius: '0.5rem',
  padding: '1rem'
}

function Papers() {
  const [item, setItem] = useState([]);
  const [collection, setCollection] = useState([]);
  const [collect, setCollect] = useState("");
  const [photoSelected, setPhotoSelected] = useState()
  const [open, setOpen] = useState(false);

  const fetchingTheFirst28Photos = async () => {
    await fetch(`https://api.unsplash.com/photos/?per_page=28&client_id=${process.env.REACT_APP_USER_KEY}`)
      .then(res => res.json())
      .then(data => setItem(data));
  };

  const refreshPhotoWhenButtonClicked = async () => {
    await fetch(`https://api.unsplash.com/photos/random?count=28&client_id=${process.env.REACT_APP_USER_KEY}`)
      .then(res => res.json())
      .then(data => setItem(data)
      );
  }

  //Fetch for the list of collections
  const fetchListOfCollection = async () => {
    await fetch(`https://api.unsplash.com/collections?per_page=15&client_id=${process.env.REACT_APP_USER_KEY}`)
      .then(res => res.json())
      .then(data => setCollection(data));
  }

  //useEffect for initiation 
  useEffect(() => {
    fetchingTheFirst28Photos();
    fetchListOfCollection();
  }, []);

  useEffect(() => {
    const fetchPhotosCollection = async () => {
      await fetch(`https://api.unsplash.com/collections/${collect}/photos?per_page=28&client_id=${process.env.REACT_APP_USER_KEY}`)
        .then(res => res.json())
        .then(data => setItem(data));
    }
    if (collect !== "") {
      fetchPhotosCollection();
    }
  }, [collect])

  const handleChange = (event) => {
    setCollect(event.target.value);
  };

  const handleOpenClose = (photo) => {
    console.log(photo)
    setPhotoSelected(photo)
    setOpen(!open)
  };


  const renderPhotoInfo = (photo) => {
    const { make, model, exposure_time, aperture, focal_length, iso } = photo.exif
    return (
      <Box sx={styleInfoBox}>
      Camera info
      {make && <Typography>Brand: <strong>{make}</strong></Typography>}
      {model && <Typography>Model: <strong>{model}</strong></Typography>}
      {exposure_time && <Typography>Exposure time: <strong>{exposure_time}</strong></Typography>}
      {aperture && <Typography>Aperture: <strong>{aperture}</strong></Typography>}
      {focal_length && <Typography>Focal length: <strong>{focal_length}</strong></Typography>}
      {iso && <Typography>ISO: <strong>{iso}</strong></Typography>}
      </Box>
    );
  };

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ marginBottom: "40px", justifyContent: "center", marginRight: "20px" }}>
        <Button size="large" onClick={() => { refreshPhotoWhenButtonClicked() }} sx={{ color: "black", borderRadius: "5px", "&:hover": { border: "1px solid black" } }}>
          <RefreshIcon onClick={() => { setCollect("") }} />
        </Button>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Collection</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Collection"
              value={collect}
              autoWidth
              onChange={handleChange}
            >{collection && collection.map((collection, index) => {
              return <MenuItem key={index + 'collection'} value={collection.id}>{collection.title}</MenuItem>
            })}
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Box sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "30px",
        justifyContent: "center"
      }}>
        {item.length > 0 ? item.map((data, index) => {
          return <Photos Data={data} key={index} handleOpenClose={handleOpenClose} />
        }) : <Typography>
          No hay fotos por el momento</Typography>}
      </Box>
      <Modal
        sx={{ width: '100%' }}
        open={open}
        onClose={handleOpenClose}
      >
        <>
          <Box sx={style}>
            <Box sx={{ display: "flex", justifyContent: 'center' }}>
              <Box sx={{ height: `700px`, position: 'relative' }} onClick={handleOpenClose}>
                {photoSelected && photoSelected.exif && renderPhotoInfo(photoSelected)}
                {photoSelected && <img src={photoSelected?.urls?.full} alt={photoSelected?.user?.username} className="photo" />}
              </Box>
            </Box>
            <Typography variant="h6" sx={{
              color: "white",
              textAlign: "center",
            }}> Photo by <a
              href={`${photoSelected?.user?.links?.html}/?utm_source=the_album&utm_medium=referral`}
              target="_blank"
              rel="noopener noreferrer"
              className='link'>{photoSelected?.user?.username}</a> on&nbsp;
              <a href='https://unsplash.com/es/?utm_source=the_album&utm_medium=referral'
                target="_blank"
                rel="noopener noreferrer"
                className='link'>Unplash</a>
            </Typography>
          </Box>
        </>
      </Modal>
    </>
  );
}


export default Papers;