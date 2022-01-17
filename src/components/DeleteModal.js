import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({open, setOpen, handleDeleteNote}) {
//   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h4" component="h2">
              WARNING
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 3 }}>
              This action can not be undone. Are you sure?
            </Typography>
            <Grid container alignItems={'center'} sx={{ mt: 3 }}>
            <Button variant='contained' color='primary' onClick={handleClose}>Cancel</Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant='contained' color='error' onClick={handleDeleteNote}>Delete</Button>
            </Grid>

            

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}