import { Paper, IconButton, Grid, Box, TextField } from '@mui/material'
import React , {useEffect, useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

export default function StickyNote({note, index, handleDeleteNote, handleSaveNote, handleChange}) {
    return (
        <Paper elevation={6} key={note.id}>
            <textarea className='note' placeholder='Take a note...' 
                defaultValue={note.body}
                onChange={(e) => {handleChange(e, note.id)}}>
                    
            </textarea>
            <Grid container sx={{borderTop: '2px solid #3b517a'}}>
                <Grid item>
                    <IconButton  variant='contained' color='primary' onClick={() => handleSaveNote(note.id)}>
                        <SaveIcon/>
                        </IconButton>
                </Grid>
                <Box sx={{ flexGrow: 1 }} />

                <Grid item >
                    <IconButton  variant='contained' color='error' onClick={() => handleDeleteNote(note.id)}>
                        <DeleteIcon/>
                    </IconButton>

                </Grid>
            </Grid>
        
        
        </Paper>

    )
}
