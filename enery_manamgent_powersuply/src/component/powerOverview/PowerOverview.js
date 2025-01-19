import React, {useEffect, useState} from 'react';
import "./PowerOverview.css"
import {forEach} from "react-bootstrap/ElementChildren";
import {Button} from "@mui/material";

const PowerOverview = ({allDevices, handleClickOpen}) => {
    const [currentPower, setCurrentPower] = useState(0)
    const [currentDevices, setCurrentDevice] = useState([])


    useEffect(() => {
        fetch("http://localhost:3000/webhook/latest", {
            method: 'GET'
        }).then(response => response.json())
            .then(data => setCurrentPower(data))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        allDevices.map((device) => {
            if (device.HighesValue >= currentPower.payload && device.lowestValue <= currentPower.payload) {
                setCurrentDevice(device);
            }
            else setCurrentDevice(null);
        })
    }, [currentPower, allDevices]);

    return (
        <div className="d-flex flex-nowrap justify-content-center align-items-center w-100">
            <div className="currenPowerContainer d-flex flex-column align-items-center justify-content-center w-25">
                <div className="circle d-flex align-items-center justify-content-center">
                    <p className="currenPower">{currentPower.payload}W</p>
                </div>
                <p className="currenPowerLabel">Current Power</p>
            </div>
            {currentDevices !== null ?
                <div className="displayCard d-flex flex-column w-75">
                    <div className="displayCardHeader d-flex flex-column m-0">
                        <p className="title-label">Current Device</p>
                        <p className="title">{currentDevices.label}</p>
                    </div>
                    <div className="lowandHighestContainer d-flex flex-row">
                        <p>Max: {currentDevices.HighesValue}W</p>
                        <p>LOW: {currentDevices.LowestValue}W</p>
                    </div>
                </div>
                :
                <div className="displayCard d-flex flex-column align-items-center justify-content-center w-75">
                    <p className="noDeviceDetected"> We could not detect the Device</p>
                    <Button className="addButton" variant={"outlined"} onClick={handleClickOpen}>ADD Device</Button>
                </div>
            }
        </div>
    );
};

export default PowerOverview;