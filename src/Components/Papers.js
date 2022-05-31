//import react
import React, { useState, useEffect } from 'react';

//Import MUI
import { InputLabel, MenuItem, Select } from '@mui/material/';
import { FormControl } from '@mui/material';
import { Grid, IconButton, Stack } from '@mui/material';
import GridItem from "./GridItem";
import { Box } from '@mui/system';
import RefreshIcon from '@mui/icons-material/Refresh';

//import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

function Papers() {
  const [item, setItem] = useState([]);
  const [collection, setCollection] = useState([]);
  const [collect, setCollect] = useState("");

  //Fetch the 28 first photos
  const fetching = async () => {
    await fetch(`https://api.unsplash.com/photos/?per_page=28&client_id=${process.env.REACT_APP_USER_KEY}`)
      .then(res => res.json())
      .then(data => setItem(data));
  };

  //Fetch when the refresh button is clicked
  const refreshPhoto = async () => {
    await fetch(`https://api.unsplash.com/photos/random?count=28&client_id=${process.env.REACT_APP_USER_KEY}`)
      .then(res => res.json())
      .then(data => setItem(data));
  }

  //Fetch for the list of collections
  const fetchCollection = async () => {
    await fetch(`https://api.unsplash.com/collections?per_page=15&client_id=${process.env.REACT_APP_USER_KEY}`)
      .then(res => res.json())
      .then(data => setCollection(data));
  }

  //useEffect for initiation 
  useEffect(() => {
    fetching();
    fetchCollection();
  }, []);

  //useEffect whenever you want a collection
  useEffect(()=>{
    const fetchPhotosCollection = async ()=>{
      await fetch(`https://api.unsplash.com/collections/${collect}/photos?per_page=28&client_id=${process.env.REACT_APP_USER_KEY}`)
         .then(res => res.json())
         .then(data => setItem(data));
    }
    if(collect !== ""){
      fetchPhotosCollection();
    ;}
  }, [collect])

  //For the array of photos
  const number = Math.ceil(item.length / 4)
  const newArray = []
  let numberForX = 3
  let arrayForPhotos = []
  let numb = 0

  //For set the color of background
  let numberForPair1Color = [15, 75]
  let numberForPair2Color = [15, 75]

  //For changing the colors
  const colors = () => {
    numberForPair1Color[0] = numberForPair2Color[0]
    numberForPair1Color[1] = numberForPair2Color[1]
    numberForPair2Color[0] += 10
    numberForPair2Color[1] -= 10
  }

  //Loop for the cuantity of grids container
  for (let i = 1; i <= number; i++) {
    newArray.push(i)
  }

  //One array passing info to another for display
  const infoPass = () => {
    arrayForPhotos = []
    let numbercito = 0
    for (let x = numb; x <= numberForX; x++) {
      if (item[numb] !== item.length + 1) {
        if (item[numb] !== undefined) {
          arrayForPhotos[numbercito] = item[numb]
          numbercito++
          numb++
        }
      } else {
        break;
      }
    }
    numberForX += 4
  }

  //For set the collection you whant
  const handleChange = (event) => {
    setCollect(event.target.value);
  };


  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ marginBottom: "40px", justifyContent: "center", marginRight: "20px" }}>
        <IconButton aria-label="delete" size="large" onClick={() => { refreshPhoto() }}>
          <RefreshIcon onClick={()=>{setCollect("")}} />
        </IconButton>
        <Box sx={{ minWidth: 120 }}>
          {/* <FilterListOutlinedIcon /> */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Collection</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Collection"
              value={collect}
              autoWidth
              onChange={handleChange}
            >{collection !== [] ? collection.map(collection => {
              return <MenuItem key={collection.id} value={collection.id}>{collection.title}</MenuItem>
            }): null}
            </Select>
          </FormControl>
        </Box>

      </Stack>
      <Box>
        {newArray.map(key => {
          infoPass();
          colors();
          return <Grid key={key} container spacing={5} sx={{
            paddingBottom: "40px",
            background: `linear-gradient(to bottom, hsla(15,${numberForPair1Color[0]}%,
           ${numberForPair1Color[1]}%,1), hsla(15,  ${numberForPair2Color[0]}%,  ${numberForPair2Color[1]}%, 1))`
          }}>
            {arrayForPhotos.map((item) => {
              return <GridItem
                key={item.id}
                img={item.urls.small}
                imgfull={item.urls.full}
                id={key}
                link={item.user.links.html}
                username={item.user.first_name}
                height={item.height} />
            })}
          </Grid>
        })}
      </Box>
    </Box>
  );
}


export default Papers;
