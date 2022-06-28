import { Box, Button, ButtonGroup, Container, FormControl, Input, Modal, SxProps, TextField, Typography } from "@mui/material";
import { CSSProperties } from "@mui/material/styles/createTypography";
import React, { useState } from "react";
import './createModal.css';

type TProps = {
    isOpen: boolean
    close: () => void
    onCreateCard: () => void
    onCancelCreate: () => void
    titleValue: string
    descrValue: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    setDescr: React.Dispatch<React.SetStateAction<string>>
}

const style: SxProps = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
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
            <form id="form-create-card" onSubmit={() => props.onCreateCard()}>
                <Container sx={style}  >
                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
                        Create card
                    </Typography>
                    <TextField 
                        id="modal-input-title" 
                        label='Title' 
                        variant="filled" 
                        size="small" 
                        onChange={(e) => props.setTitle(e.target.value)}
                        required
                        value={props.titleValue}
                        // placeholder='Title'
                    />                        
                    <TextField 
                        id="modal-input-description" 
                        label='Description' 
                        variant="filled" 
                        // placeholder="Description"
                        size="small"
                        onChange={(e) => props.setDescr(e.target.value)}                        
                        value={props.descrValue}
                    />
                    <Box sx={{marginLeft:'auto'}}>
                        <Button size="small" color="warning" onClick={() => props.onCancelCreate()}>Cancel</Button>
                        <Button 
                            type="submit" 
                            size="small" 
                            color="success" 
                            // onClick={() => props.onCreateCard()}
                        >
                            Create Card
                        </Button>
                    </Box>                    
                </Container>
            </form>
        </Modal>
    </div>
})