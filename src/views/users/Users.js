import React, { useState, useEffect } from "react";
import "./users.scss";
import MaterialTable from "material-table";

import { listUsers } from "src/store/actions/UserActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import axios from "axios";
import User from "src/apis/User";
import { helper } from "src/helper";
import { render } from "enzyme";
import { green } from "@material-ui/core/colors";

const Users = (props) => {
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
      render: (item) => <img src="/avatars/9.png" alt="" border="1" height="100" width="100" />,
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
    User.list().then((res) => {
      setUserData(res.data.data);
    });
  };
  console.log(userData);
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
