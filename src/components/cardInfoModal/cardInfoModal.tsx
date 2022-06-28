import { Box, Button, Modal, SxProps, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";

type TProps = {
    isOpen: boolean
    close: () => void
    title: string
    description: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    setDescr: React.Dispatch<React.SetStateAction<string>>
    saveChanges: (title: string, description: string) => void
    deleteCard: () => void
}

// const style: SxProps = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     // border: '2px solid #000',
//     boxShadow: 24,
//     p: 3,
//     borderRadius: '10px',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px'
// };

const style: SxProps = {
    display: 'flex',
    alignSelf: 'center',
    width: 400,
    flexDirection: 'column',
    bgcolor: 'background.paper',
    p: 3,
    borderRadius: '10px',
    position: 'relative',
    gap: '10px',
    boxShadow: 24,
};

export const CardInfoModal:React.FC<TProps> = React.memo((props) => {
    const [deleteQuestModalOpen, setDeleteQuestModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');

    useEffect(() => {
        setTitle(props.title);
        setDescr(props.description);
    }, [props])

    function onSaveChanges() {
        // props.setTitle(title);
        // props.setDescr(descr);
        props.saveChanges(title, descr)
    }

    function openQuestModal() {
        setDeleteQuestModalOpen(true);
    }

    function closeQuestModal() {
        setDeleteQuestModalOpen(false);
    }

    function onDelete() {
        closeQuestModal();
        props.deleteCard();
    }

    return <div className="card-info-modal">
        <Modal
            open={props.isOpen}
            onClose={() => props.close()}
            sx={{display:'flex', alignItems: 'center', justifyContent: 'center'}}
        >
            <Box sx={style}>
                <Button 
                    color="error"
                    variant="contained"
                    sx={{marginLeft: 'auto'}}
                    size={'small'}
                    onClick={() => openQuestModal()}
                >
                    Delete card
                </Button>
                <TextField 
                    label='Title'
                    value={title}
                    size={'small'}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField 
                    label='Description'
                    value={descr}
                    size={'small'}
                    onChange={e => setDescr(e.target.value)}
                />
                <Box sx={{marginLeft:'auto'}}>
                    <Button
                        color="warning"
                        variant="text"
                        // sx={{marginLeft: 'auto'}}
                        size={'small'}
                        onClick={() => props.close()}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        variant="text"
                        // sx={{marginLeft: 'auto'}}
                        size={'small'}
                        onClick={() => onSaveChanges()}
                    >
                        Save changes
                    </Button>
                </Box>                
            </Box>
        </Modal>
        <Modal
            open={deleteQuestModalOpen}
            onClose={() => closeQuestModal()}
            sx={{display:'flex', alignItems: 'center', justifyContent: 'center'}}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
                    Do you want to remove this card?
                </Typography>
                <Box sx={{marginLeft: 'auto'}}>
                    <Button
                        color="success"
                        variant="text"
                        // sx={{marginLeft: 'auto'}}
                        size={'small'}
                        onClick={() => closeQuestModal()}
                    >
                        No
                    </Button>
                    <Button
                        color="error"
                        variant="text"
                        // sx={{marginLeft: 'auto'}}
                        size={'small'}
                        onClick={() => onDelete()}
                    >
                        Yes
                    </Button>
                </Box>        
            </Box>
        </Modal>
    </div>
})