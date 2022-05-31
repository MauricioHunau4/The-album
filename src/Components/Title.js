import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import 'animate.css'

export default function Title() {
    return (
            <Box
                sx={{
                    width: "100%",
                    padding: "200px"
                }}>
                <Box sx={{
                    textAlign: "center",
                    margin: 0}}>
                    <Typography variant="h2" component="h2">
                        The album
                    </Typography>
                </Box>
            </Box> 
    )
}
