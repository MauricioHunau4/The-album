import "./app.css"
import * as React from 'react';
import Title from "./Components/Title";
import Papers from "./Components/Papers"
import Box from '@mui/material/Box';


function App() {
  return (
    <Box sx={{
      backgroundColor: "hsla(15,15%,75%,1)",
      width: "100%"
    }}>
        <Title />
        
        <Papers />
    </Box>
  );
}

export default App;
