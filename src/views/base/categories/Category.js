import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { helper } from "src/helper";
import "./category.scss";
import { toast, ToastContainer } from "react-toastify";
import { CSpinner } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryData, newCategory, removeCategory } from "src/store/slices/CategorySlice";

const Categories = (props) => {
    const dispatch = useDispatch();
    const category = useSelector((state) =>
        state.category.categoryData.map((o) => ({ ...o, tableData: {} }))
    );
    const loader = useSelector((state) => state.category.loader);

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
                } else if (item.status === undefined) {
                    return <span className="status-active">Active</span>;
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
        dispatch(fetchCategoryData());
    }, [dispatch]);

    const handleImg = (e) => {
        setCategoryImg(e.target.files[0]);
    };
    if (loader) {
        return (
            <div>
                <ToastContainer />
                <MaterialTable
                    title=""
                    columns={columns}
                    data={category}
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
                                setTimeout(() => {
                                    dispatch(newCategory(data));

                                    resolve();
                                }, 2000);
                            }),

                        onRowDelete: (selectedRow) =>
                            new Promise((resolve, reject) => {
                                const index = selectedRow.tableData.id;
                                const updatedRows = [...categoryData];
                                updatedRows.splice(index, 1);
                                setTimeout(() => {
                                    dispatch(removeCategory(selectedRow._id));
                                    resolve();
                                }, 1000);
                            }),
                    }}
                    localization={{
                        body: {
                            editRow: {
                                deleteText: (
                                    <p style={{ fontSize: "16px", color: "gray" }}>
                                        Are you sure you want to disable this category? If you do so
                                        all the products of this category will be removed.
                                    </p>
                                ),
                            },
                        },
                    }}
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
                        exportAllData: true,
                        addRowPosition: "first",
                        columnsButton: true,
                    }}
                />
            </div>
        );
    } else if (!loader) {
        return <CSpinner variant="grow" className="spinner" />;
    }
};

export default Categories;
