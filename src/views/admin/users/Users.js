import React, { useState } from "react";
import "./users.scss";
import MaterialTable from "material-table";
import { useSelector } from "react-redux";
import { helper } from "src/helper";
import { ToastContainer } from "react-toastify";
import { CSpinner } from "@coreui/react";

const Users = (props) => {
    const users = useSelector((state) => state.user.userData.map((o) => ({ ...o })));
    const loader = useSelector((state) => state.user.loader);

    const [columns, setColumns] = useState([
        {
            title: " Name",
            field: "name",
            validate: (rowData) => Boolean(rowData.name),
        },
        {
            title: "Photo",
            field: "photo",

            render: (item) => (
                <img
                    src={helper.IMAGE_BASEURL + item.photo}
                    alt=""
                    border="1"
                    height="100"
                    width="100"
                />
            ),
        },
        { title: "Email", field: "email", validate: (rowData) => Boolean(rowData.email) },
        {
            title: "Phone",
            field: "phone",
            align: "left",
            type: "numeric",
            validate: (rowData) => Boolean(rowData.phone),
        },
        {
            title: "Status",
            render: (item) => {
                if (item.status === helper.STATUS.ACTIVE) {
                    return <span className="status-active">Active</span>;
                } else if (item.status === helper.STATUS.DEACTIVE) {
                    return <span className="status-deactive">Deactive</span>;
                } else {
                    return <span className="status-delete">Delete</span>;
                }
            },
        },
        {
            title: "Role",
            field: "role",
            editable: false,
            render: (item) => {
                if (item.role === helper.ROLE.ADMIN) {
                    return <span>Admin</span>;
                } else {
                    return <span>Customer</span>;
                }
            },
        },
    ]);

    if (loader) {
        return (
            <div>
                <ToastContainer />
                <h2>User List</h2>
                <MaterialTable
                    title=""
                    columns={columns}
                    data={users}
                    options={{
                        headerStyle: {
                            fontSize: "1.2rem",
                            whiteSpace: "nowrap",
                            fontFamily: "cursive",
                            fontWeight: "bolder",
                            color: "white",
                            backgroundColor: "#3C4B64",
                        },
                        rowStyle: {
                            fontSize: "13px",
                        },
                        tableLayout: "auto",
                        exportButton: true,
                        selection: true,
                        exportAllData: true,
                        addRowPosition: "first",
                        columnsButton: true,
                        actionsColumnIndex: -1,
                    }}
                />
            </div>
        );
    } else if (!loader) {
        return <CSpinner variant="grow" className="spinner" />;
    }
};

export default Users;
