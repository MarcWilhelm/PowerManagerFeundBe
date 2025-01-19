import React from 'react';
import "./PowerCard.css"
import {Dialog, IconButton} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import {Edit} from "@mui/icons-material";
import AddDialog from "../AddDialog/AddDialog";

const PowerCard = ({device}) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

function deleteRequest(id){
    fetch("http://localhost:3000/users/delete/" + id, {
        method: 'DELETE'
    }).then(response => response.json())
        .then(data => window.location.reload(false))
        .catch(error => console.error('Error:', error));


}
    return (
        <>
        <div className="displayCard d-flex flex-column justify-content-between align-items-start w-25">
            <div className="displayCardHeader d-flex flex-column">
                <p className="title-label">Current Device</p>
                <p className="title">{device.label}</p>
            </div>
            <div className="lowandHighestContainer d-flex flex-row">
                <p>Max: {device.HighesValue ? device.HighesValue : 0}W</p>
                <p>LOW: {device.lowestValue ? device.HighesValue : 0}W</p>
            </div>
            <div>
                <IconButton aria-label="edit" color="primary" onClick={()=>{handleClickOpen()}}>
                    <Edit/>
                </IconButton>
                <IconButton aria-label="delete" color="primary" onClick={()=>{deleteRequest(device.id)}}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        const label = event.target[0].value;
                        const highesValue = event.target[1].value;
                        const lowestValue = event.target[2].value;
                        fetch("http://localhost:3000/users/update/" + device.id, {
                            method: 'PUT',
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify({
                                "label": label,
                                "HighesValue": highesValue,
                                "lowestValue": lowestValue
                            })
                        }).then(response => response.json())
                            .then(data => console.log("success"))
                            .catch(error => console.error('Error:', error));
                    }
                }}>
                < AddDialog handleClose={handleClose} device={device}/>
            </Dialog>
        </>
    );
};

export default PowerCard;