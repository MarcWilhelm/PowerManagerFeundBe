import React from 'react';
import "./PowerCard.css"
import {IconButton} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import {Edit} from "@mui/icons-material";

const PowerCard = ({device}) => {
function deleteRequest(id){
    fetch("http://localhost:3000/users/delete/" + id, {
        method: 'DELETE'
    }).then(response => response.json())
        .then(data => window.location.reload(false))
        .catch(error => console.error('Error:', error));


}
    return (

        <div className="displayCard d-flex flex-column justify-content-between align-items-start w-25">
            <div className="displayCardHeader d-flex flex-column">
                <p className="title-label">Current Device</p>
                <p className="title">{device.label}</p>
            </div>
            <div className="lowandHighestContainer d-flex flex-row">
                <p>Max: {device.HighesValue && 0}W</p>
                <p>LOW: {device.lowestValue && 0}W</p>
            </div>
            <div>
                <IconButton aria-label="edit" color="primary" onClick={()=>{}}>
                    <Edit/>
                </IconButton>
                <IconButton aria-label="delete" color="primary" onClick={()=>{deleteRequest(device.id)}}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    );
};

export default PowerCard;