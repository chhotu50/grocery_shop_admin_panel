import React, { useState } from "react";

import { Grid, IconButton } from "@material-ui/core";
import { MTableBodyRow } from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteModal from "./Modal";

const CustomRow = (props) => {
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const overlayStyle = { width: "100%", position: "absolute" };
    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <Grid
            style={{ display: "contents" }}
            onMouseOver={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {show && (
                <Grid align="right" style={overlayStyle}>
                    <Grid sm={2} align="center" style={{ backgroundColor: "#fff" }}>
                        {/* show modal on click event,and show warning message in modal to confirm if user wants to delete or not,if clicked on delete again , add functionality of row delete */}
                        <IconButton
                            style={{ marginTop: "30px", marginRight: "75px" }}
                            onClick={() => setShowModal(true)}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <DeleteModal open={showModal} Close={handleClose} {...props} />
                    </Grid>
                </Grid>
            )}
            <MTableBodyRow {...props} />
        </Grid>
    );
};
export default CustomRow;
