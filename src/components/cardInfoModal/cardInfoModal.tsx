import { Box, Button, Modal, SxProps, TextField } from "@mui/material";
import React, { useState } from "react";

type TProps = {
    isOpen: boolean
    close: () => void
    title: string
    description: string
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
    gap: '10px'
};

export const CardInfoModal:React.FC<TProps> = React.memo((props) => {
    const [deleteQuestModalOpen, setDeleteQuestModalOpen] = useState(false);

    function closeQuestModal() {

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
                >
                    Delete card
                </Button>
                <TextField 
                    label='Title'
                    value={props.title}
                />
                <TextField 
                    label='Description'
                    value={props.description}
                />
                <Button
                    color="success"
                    variant="text"
                    sx={{marginLeft: 'auto'}}
                >
                    Save changes
                </Button>
            </Box>
        </Modal>
        <Modal
            open={deleteQuestModalOpen}
            onClose={() => closeQuestModal()}
        >
            <Box></Box>
        </Modal>
    </div>
})