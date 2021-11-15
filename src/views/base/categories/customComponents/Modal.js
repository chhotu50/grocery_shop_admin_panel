import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        top: "40%",
        left: "40%",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
const DeleteModal = (props) => {
    const classes = useStyles();
    console.log(props);
    return (
        <Modal
            open={props.open}
            onClose={props.Close}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={classes.paper}>
                <h2 style={{ color: "red", textAlign: "center" }}>
                    Warning <CloseIcon />
                </h2>
                <p>
                    Are you sure you want to disable this category? If you do so all the products of
                    this category will be removed.
                </p>
                <Button variant="contained" color="secondary">
                    Confirm
                </Button>
                <Button>Cancel</Button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
