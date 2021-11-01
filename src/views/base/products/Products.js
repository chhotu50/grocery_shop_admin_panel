import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Product from "src/apis/Product";
import DropDown from "../categories/CategoryDropdown";
import { helper } from "./../../../helper/index";
import "./products.scss";
import { Divider, Grid, TablePagination } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";
import { CSpinner } from "@coreui/react";
import User from "src/apis/User";

const Products = (props) => {
    const [user, setUser] = useState();
    const [toggle, setToggle] = useState(false);
    const [productData, setProductData] = useState([]);
    const [productImg, setProductImg] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryChange, setCategoryChange] = useState({ title: "" });
    const [selectedRows, setSelectedRows] = useState([]);
    const [columns, setColumns] = useState([
        {
            title: " Title",
            field: "title",
            align: "center",
            validate: (rowData) => Boolean(rowData.title),
        },
        {
            title: "Category",
            field: "category",
            align: "center",
            render: (rowData) => (rowData.category_id ? rowData.category_id.title : ""),
            editComponent: (props) => <DropDown onChange={handleCategoryChange} />,
        },
        {
            title: "Price",
            field: "price",
            type: "numeric",
            validate: (rowData) => Boolean(rowData.title),
        },

        {
            title: "Offer Price",
            field: "offer_price",
            type: "numeric",
            align: "center",
            validate: (rowData) => Boolean(rowData.created_at),
        },
        {
            title: "Photo",
            field: "photo",
            editComponent: (props) => {
                return <input type="file" name="photo" accept="image/*" onChange={handleImg} />;
            },
            render: (item) => (
                <img src={helper.IMAGE_BASEURL + item.photo[0]} alt="" className="product-img" />
            ),
        },

        {
            title: "Created By",
            align: "center",
            render: (item) => {
                return item.created_by ? item.created_by.name : user.name;
            },
        },
        {
            title: "Status",
            align: "center",
            render: (item) => {
                if (item.status === helper.STATUS.ACTIVE) {
                    return <span className="status-active">Active</span>;
                } else if (item.status === helper.STATUS.DEACTIVE) {
                    return <span className="status-deactive">Deactive</span>;
                } else if (item.status === helper.STATUS.DELETED) {
                    return <span className="status-delete">Deleted</span>;
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
    ]);
    // -------------------------------------------------------------------------------------
    useEffect(() => {
        getProductData();
        getCategories();
        return () => {
            setProductData([]);
            setCategories([]); // This worked for me
        };
    }, []);

    const getCurrentUser = () => {
        User.showOne().then((res) => {
            setUser(res.data);
        });
    };

    const getCategories = () => {
        axios
            .get("categories")
            .then((res) => {
                if (res.data.status === true) {
                    setCategories(res.data.data);
                }
            })
            .catch((err) => {
                toast.error(err.message, { position: "top-center" });
            });
    };

    const getProductData = () => {
        axios
            .get("product")
            .then((res) => {
                setToggle(true);
                setProductData([...res.data.data]);
            })
            .catch((err) => {
                toast.error(err.message, { position: "top-center" });
            });
    };
    // ----------------------------------------------------------------------------------
    const handleImg = (e) => {
        setProductImg(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
        setCategoryChange({ _id: e.target.value });
    };

    const handleBulkDelete = () => {
        const updatedData = productData.filter((row) => !selectedRows.includes(row));
        setProductData(updatedData);
        let data = [];
        const selectedData = selectedRows.map((row) => data.push(row._id));

        Product.removeMultiple({ ids: data.toString() }).then((res) => {
            toast.success(res.data.message, { position: "top-center" });
        });
    };

    var sumOfferPrice = productData.reduce(function (tot, arr) {
        return tot + parseInt(arr.offer_price);
    }, 0);

    var sumPrice = productData.reduce(function (tot, arr) {
        return tot + parseInt(arr.price);
    }, 0);
    if (toggle) {
        return (
            <div>
                <ToastContainer />
                <MaterialTable
                    title=""
                    columns={columns}
                    data={productData}
                    components={{
                        Pagination: (props) => (
                            <div>
                                <Grid
                                    container
                                    style={{ padding: "16px 0 ", fontWeight: "bolder" }}
                                >
                                    <Grid item sm={3} align="right">
                                        Total:
                                    </Grid>
                                    <Grid item sm={2} align="right">
                                        <span className="total">{sumPrice.toFixed(2)}</span>
                                    </Grid>
                                    <Grid item sm={1} align="right">
                                        <span className="total">{sumOfferPrice.toFixed(2)}</span>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <TablePagination {...props} />
                            </div>
                        ),
                    }}
                    onSelectionChange={(rows) => {
                        setSelectedRows(rows);
                    }}
                    editable={{
                        onRowAdd: (newRow) =>
                            new Promise((resolve, reject) => {
                                const data = {
                                    ...newRow,
                                    photo: productImg,
                                    category_id: categoryChange._id,
                                };

                                const updatedRow = [...productData, data];
                                setTimeout(() => {
                                    Product.add(data)
                                        .then((res) => {
                                            if (res.data.status === true) {
                                                toast.success(res.data.message, {
                                                    position: "top-center",
                                                });
                                                setProductData(updatedRow);
                                                getProductData();
                                            }
                                        })
                                        .catch((err) => {
                                            toast.error(err.message, { position: "top-center" });
                                        });

                                    resolve();
                                }, 2000);
                            }),

                        onRowDelete: (selectedRow) =>
                            new Promise((resolve, reject) => {
                                const index = selectedRow.tableData.id;
                                const updatedRows = [...productData];
                                updatedRows.splice(index, 1);
                                setTimeout(() => {
                                    Product.remove(selectedRow._id)
                                        .then((res) => {
                                            if (res.data.status === true) {
                                                setProductData(updatedRows);
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
                        //     onRowUpdate: (updatedRow, oldRow) =>
                        //         new Promise((resolve, reject) => {
                        //             const index = oldRow.tableData.id;
                        //             const updatedRows = [...productData];
                        //             updatedRows[index] = updatedRow;
                        //             setTimeout(() => {
                        //                 setProductData(updatedRows);
                        //                 resolve();
                        //             }, 1000);
                        //         }),
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
                        selection: true,
                        exportButton: true,
                        exportAllData: true,
                        addRowPosition: "first",
                        columnsButton: true,
                    }}
                    actions={[
                        {
                            icon: "delete",
                            tooltip: "Delete Selected",
                            onClick: (props) => {
                                handleBulkDelete();
                            },
                        },
                    ]}
                />
            </div>
        );
    } else if (!toggle) {
        return <CSpinner variant="grow" className="spinner" />;
    }
};

export default Products;
