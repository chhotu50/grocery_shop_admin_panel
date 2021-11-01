import React, { useState, useEffect } from "react";
import "./users.scss";
import MaterialTable from "material-table";

import User from "src/apis/User";
import { helper } from "src/helper";
import { toast, ToastContainer } from "react-toastify";
import { CSpinner } from "@coreui/react";

const Users = (props) => {
    const [toggle, setToggle] = useState(false);
    const [userData, setUserData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
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
                <img src="/avatars/avatar.jpeg" alt="" border="1" height="100" width="100" />
            ),
        },
        { title: "Email", field: "email", validate: (rowData) => Boolean(rowData.email) },
        {
            title: "Phone",
            field: "phone",
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
            render: (item) => {
                if (item.role === helper.ROLE.ADMIN) {
                    return <span>Admin</span>;
                } else {
                    return <span>Customer</span>;
                }
            },
        },
    ]);
    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        User.list()
            .then((res) => {
                setToggle(true);
                if (res.data.status === true) {
                    setUserData(res.data.data);
                } else {
                    toast.error(res.data.message, {
                        position: "top-center",
                    });
                }
            })
            .catch((err) => {
                toast.error(err.message, { position: "top-center" });
            });
    };

    const handleRowAdd = (newData, resolve) => {
        console.log("add row");
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        console.log("update row");
    };

    if (toggle) {
        return (
            <div>
                <ToastContainer />
                <h2>User List</h2>
                <MaterialTable
                    title=""
                    columns={columns}
                    data={userData}
                    onSelectionChange={(rows) => {
                        setSelectedRows(rows);
                    }}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                handleRowAdd(newData, resolve);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                handleRowUpdate(newData, oldData, resolve);
                            }),
                        onRowDelete: (selectedRow) =>
                            new Promise((resolve, reject) => {
                                const index = selectedRow.tableData.id;
                                const updatedRows = [...userData];
                                updatedRows.splice(index, 1);
                                setTimeout(() => {
                                    User.remove(selectedRow._id)
                                        .then((res) => {
                                            if (res.data.status === true) {
                                                setUserData(updatedRows);
                                                toast.success("Removed", {
                                                    position: "top-center",
                                                });
                                            }
                                        })
                                        .catch((err) => {
                                            toast.error(err.message, { position: "top-center" });
                                        });
                                    resolve();
                                }, 1000);
                            }),
                    }}
                    // actions={[
                    //     {
                    //         icon: "delete",
                    //         tooltip: "Delete Selected",
                    //         onClick: () => {
                    //             handleBulkDelete();
                    //         },
                    //     },
                    // ]}
                    options={{
                        headerStyle: {
                            fontSize: "1.2rem",
                            whiteSpace: "nowrap",
                            fontFamily: "cursive",
                            fontWeight: "bolder",
                        },
                        rowStyle: {
                            fontSize: "13px",
                        },
                        tableLayout: "auto",
                        selection: true,
                        exportButton: true,
                        exportAllData: true,
                        addRowPosition: "first",
                    }}
                />
            </div>
        );
    } else if (!toggle) {
        return <CSpinner variant="grow" className="spinner" />;
    }
};

export default Users;
