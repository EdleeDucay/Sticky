import React from 'react'
import { Snackbar, Alert } from '@mui/material'

export default function SuccessSnackbar({open, setOpen}) {
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Snackbar
                anchorOrigin={{ vertical: 'top',horizontal: 'center' }}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message="Saving successful"
                key={'top' + 'center'}
            >
                <Alert severity='success'>
                    Sticky has been saved
                </Alert>
            </Snackbar>
    )
}
