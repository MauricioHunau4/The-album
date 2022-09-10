//import react
import React, { useState, useEffect } from 'react';

//Import MUI
import { InputLabel, MenuItem, Select } from '@mui/material/';
import { FormControl, Button } from '@mui/material';
import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import RefreshIcon from '@mui/icons-material/Refresh';
import Photos from './Photos';


function Papers() {
  const [item, setItem] = useState([]);
  const [collection, setCollection] = useState([]);
  const [collect, setCollect] = useState("");

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
      ;
    }
  }, [collect])

  const handleChange = (event) => {
    setCollect(event.target.value);
  };

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ marginBottom: "40px", justifyContent: "center", marginRight: "20px" }}>
        <Button size="large" onClick={() => { refreshPhotoWhenButtonClicked() }} sx={{color: "black", borderRadius:"5px" ,"&:hover": { border:"1px solid black"} }}>
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
            >{collection && collection.map(collection => {
              return <MenuItem key={collection.id} value={collection.id}>{collection.title}</MenuItem>
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
        {item.map((data, index) => {
          return <Photos Data={data} key={index} />
        })}
      </Box>
    </Box>
  );
}


export default Papers;


/* return <GridItem
                key={item.id}
                img={item.urls.small}
                imgfull={item.urls.full}
                id={key}
                link={item.user.links.html}
                username={item.user.first_name}
                height={item.height} />
                */