import React, { useState, useEffect } from "react";
import "./users.scss";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
// import User from "src/apis/User";
import { helper } from "src/helper";
import { toast, ToastContainer } from "react-toastify";
import { CSpinner } from "@coreui/react";
import { fetchUserData } from "src/store/slices/UserSlice";

const Users = (props) => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.userData.map((o) => ({ ...o })));
    const loader = useSelector((state) => state.user.loader);

    // const [userData, setUserData] = useState([]);
    const [columns, setColumns] = useState([
        {
            title: " Name",
            field: "name",
            validate: (rowData) => Boolean(rowData.name),
        },
        {
            title: "Photo",
            field: "photo",
            // editComponent: (props) => {
            //     return <input type="file" name="photo" accept="image/*" onChange={handleImg} />;
            // },
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
    useEffect(() => {
        dispatch(fetchUserData());
    }, []);
    // const getUser = () => {
    //     User.list()
    //         .then((res) => {
    //             setToggle(true);
    //             if (res.data.status === true) {
    //                 setUserData(res.data.data);
    //             } else {
    //                 toast.error(res.data.message, {
    //                     position: "top-center",
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             toast.error(err.message, { position: "top-center" });
    //         });
    // };

    if (loader) {
        return (
            <div>
                <ToastContainer />
                <h2>User List</h2>
                <MaterialTable
                    title=""
                    columns={columns}
                    data={users}
                    // editable={{
                    //     onRowAdd: (newRow) =>
                    //         new Promise((resolve) => {
                    //             const data = {
                    //                 ...newRow,
                    //                 photo: userImg,
                    //             };

                    //             const updatedRow = [...userData, data];
                    //             setTimeout(() => {
                    //                 dispatch(newUser(data));
                    //                 setUserData(updatedRow);
                    //                 resolve();
                    //             }, 2000);
                    //         }),
                    // }}
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
