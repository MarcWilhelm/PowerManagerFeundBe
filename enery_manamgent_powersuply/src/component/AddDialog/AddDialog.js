import React from 'react';
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

const AddDialog = ({handleClose}) => {



    return (
        <>
            <DialogTitle>ADD Device</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    TO Add a New Device Write The Max and Low Value as well as an Max Value
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="deviceName"
                    label="Device Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <div className={"d-flex justify-content-between"}
                >
                    <TextField
                        required
                        margin="dense"
                        id="max"
                        name="maxValue"
                        label="Max Value"
                        type="number"

                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="max"
                        name="lowValue"
                        label="Lowest Value"
                        type="number"

                        variant="standard"
                    />
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type={"submit"}  variant="contained">ADD</Button>
            </DialogActions>
        </>
    );
};

export default AddDialog;