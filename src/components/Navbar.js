import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import React from 'react'

export default function Navbar() {
    return (
        <AppBar position='sticky'>
            <Toolbar>
                <Typography variant='h4' sx={{pl: 5}}>Sticky</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{pr: 5}}>
                    <Button href='/login' color='secondary' variant='contained'><Typography>Logout</Typography></Button>
                </Box>

            </Toolbar>
        </AppBar>
    )
}
