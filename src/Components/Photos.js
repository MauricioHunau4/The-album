import { Paper,  Box } from '@mui/material'
import React from 'react'



function Photos({Data, handleOpenClose}) {
    
    return (
        <>
            <Paper className="active fade-bottom" elevation={6} sx={{
                width: `${Data}`,
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
                <img src={Data.urls.small} alt="img" onClick={()=> handleOpenClose(Data)} />
            </Paper>
           
        </>
    )
}

export default Photos

