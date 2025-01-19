import './App.css';
import React from "react";

import PowerOverview from "./component/powerOverview/PowerOverview";
import PowerCard from "./component/powerCard/PowerCard";
import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import AddDialog from "./component/AddDialog/AddDialog";

function App() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [allDevices, setAlldevices] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/users/read", {
            method: 'GET'
        }).then(response => response.json())
            .then(data => setAlldevices(data))
            .catch(error => console.error('Error:', error));

    }, []);

    return (
        <div className="App">
            <h1>Power Manager</h1>
            <PowerOverview allDevices={allDevices}/>
            <div className="savedDevices d-flex justify-content-between align-items-center align-content-center w-100">
                <p>Saved Devices</p>
                <Button className="addButton" variant={"outlined"} onClick={handleClickOpen}>ADD Device</Button>
            </div>
            <div className="savedDevicesContainer m-2 d-flex flex-wrap align-content-around justify-content-evenly ">
                {allDevices.map((device) =>
                    <PowerCard device={device}/>
                )}
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
                        fetch("http://localhost:3000/users/post", {
                            method: 'POST',
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
                < AddDialog handleClose={handleClose}/>
            </Dialog>

        </div>
    );
}

export default App;
