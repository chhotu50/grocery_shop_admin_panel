import React, { useState } from "react";

import MaterialTable from "material-table";

import { listUsers } from "src/store/actions/UserActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const Users = (props) => {
    const [userData, setUserData] = useState([
        {
            name: "ani",
            email: "ani@gmail.com",
            phone: "898989889",
            role: "admin",
            address: "Mohali",
        },
    ]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [columns, setColumns] = useState([
        {
            title: " Name",
            field: "name",
            validate: (rowData) => Boolean(rowData.name),
        },
        { title: "Email", field: "email", validate: (rowData) => Boolean(rowData.email) },
        {
            title: "Phone",
            field: "phone",
            validate: (rowData) => Boolean(rowData.phone),
        },
        { title: "Role", field: "role" },
        { title: "Address", field: "address" },
    ]);

    const handleRowAdd = (newData, resolve) => {
        console.log("add row");
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        console.log("update row");
    };

    return (
        <div>
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

                    // Update row in table and database
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowDelete: (selectedRow) =>
                        new Promise((resolve, reject) => {
                            console.log(selectedRow);
                            const index = selectedRow.tableData.id;
                            const updatedRows = [...userData];
                            updatedRows.splice(index, 1);
                            setTimeout(() => {
                                setUserData(updatedRows);
                                resolve();
                            }, 1000);
                        }),
                }}
                actions={[
                    {
                        icon: "delete",
                        tooltip: "Delete Selected",
                        onClick: () => {
                            this.handleBulkDelete();
                        },
                    },
                ]}
                options={{
                    headerStyle: {
                        whiteSpace: "nowrap",
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
};

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        listUsers: () => dispatch(listUsers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Users));
