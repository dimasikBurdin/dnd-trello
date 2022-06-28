import { Box, Button, ButtonGroup, Container, Modal, SxProps, TextField, Typography } from "@mui/material";
import { CSSProperties } from "@mui/material/styles/createTypography";
import React, { useState } from "react";
import './createModal.css';

type TProps = {
    isOpen: boolean
    close: () => void
    onCreateCard: () => void
    onCancelCreate: () => void
}

const style: SxProps = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  };

export const CreateModal:React.FC<TProps> = React.memo((props) => {     
    return <div className="create-modal">
        <Modal
            open={props.isOpen}
            onClose={() => props.close()}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
                    Create card
                </Typography>
                <TextField id="modal-input-title" label='Title' variant="filled" size="small"></TextField>
                <TextField id="modal-input-description" label='Description' variant="filled" size="small"></TextField>
                <Box sx={{marginLeft:'auto'}}>
                    <Button size="small" color="warning" onClick={() => props.onCancelCreate()}>Cancel</Button>
                    <Button size="small" color="success" onClick={() => props.onCreateCard()}>Create Card</Button>
                </Box>                    
            </Box>
        </Modal>
    </div>
})