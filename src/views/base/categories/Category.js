import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Category from "src/apis/Category";
import { helper } from "src/helper";
import "./category.scss";
import { toast, ToastContainer } from "react-toastify";

const Categories = (props) => {
    const [categoryData, setCategoryData] = useState([]);
    const [categoryImg, setCategoryImg] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [columns, setColumns] = useState([
        {
            title: " Name",
            field: "title",
            validate: (rowData) => Boolean(rowData.title),
        },
        {
            title: "Photo",
            field: "photo",
            editComponent: (props) => {
                return <input type="file" name="photo" accept="image/*" onChange={handleImg} />;
            },
            render: (item) => (
                <img
                    src={helper.IMAGE_BASEURL + item.photo || categoryImg}
                    alt=""
                    className="category-img"
                />
            ),
        },
        {
            title: "Status",
            align: "center",
            render: (item) => {
                if (item.status === helper.STATUS.ACTIVE) {
                    return <span className="status-active">Active</span>;
                } else if (item.status === helper.STATUS.DEACTIVE) {
                    return <span className="status-deactive">Deactive</span>;
                } else {
                    return <span className="status-deleted">Deleted</span>;
                }
            },
        },
        {
            title: "Created At",
            align: "center",
            field: "created_at",
            validate: (rowData) => Boolean(rowData.created_at),
            type: "date",
            dateSetting: {
                format: "dd/MM/yyyy",
            },
        },
        {
            title: "Created By",
            align: "center",
            render: (item) => {
                return item.created_by
                    ? item.created_by.name
                    : JSON.parse(localStorage.getItem("user.data")).name;
            },
        },
    ]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        Category.list()
            .then((res) => {
                if (res.data.status === true) {
                    setCategoryData(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleBulkDelete = (data) => {
        const updatedData = categoryData.filter((row) => !selectedRows.includes(row));
        setCategoryData(updatedData);
    };

    const handleImg = (e) => {
        setCategoryImg(e.target.files[0]);
    };
    return (
        <div>
            <ToastContainer />
            <h2>Categories List</h2>
            <MaterialTable
                title=""
                columns={columns}
                data={categoryData}
                onSelectionChange={(rows) => {
                    setSelectedRows(rows);
                }}
                editable={{
                    onRowAdd: (newRow) =>
                        new Promise((resolve, reject) => {
                            const data = {
                                ...newRow,
                                photo: categoryImg,
                            };
                            console.log(data, "=====");

                            const updatedRow = [...categoryData, data];
                            setTimeout(() => {
                                Category.add(data)
                                    .then((res) => {
                                        if (res.data.status === true) {
                                            toast.success(res.data.message, {
                                                position: "top-center",
                                            });
                                            if (res.data.status === true) {
                                                setCategoryData(updatedRow);
                                            }
                                        } else {
                                            console.log(res);
                                        }
                                    })
                                    .catch((err) => console.log(err.message));

                                resolve();
                            }, 2000);
                        }),

                    onRowDelete: (selectedRow) => new Promise((resolve, reject) => {}),
                }}
                actions={[
                    {
                        icon: "delete",
                        tooltip: "Delete Selected",
                        onClick: (event, rowdata) => {
                            console.log(rowdata);
                            handleBulkDelete();
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

export default Categories;
