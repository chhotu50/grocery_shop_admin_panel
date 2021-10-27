import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Product from "src/apis/Product";
import DropDown from "../categories/CategoryDropdown";
import { helper } from "./../../../helper/index";
import "./products.scss";
import { Divider, Grid, TablePagination } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";

const Products = (props) => {
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
        { title: "Price", field: "price", validate: (rowData) => Boolean(rowData.title) },
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
                return item.created_by
                    ? item.created_by.name
                    : JSON.parse(localStorage.getItem("user.data")).name;
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
    ]);
    // -------------------------------------------------------------------------------------
    useEffect(() => {
        getProductData();
        getCategories();
    }, []);

    const getCategories = () => {
        axios
            .get("categories")
            .then((res) => {
                if (res.data.status === true) {
                    setCategories(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getProductData = () => {
        axios
            .get("product")
            .then((res) => {
                setProductData([...res.data.data]);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log(productData);
    // ----------------------------------------------------------------------------------
    const handleImg = (e) => {
        setProductImg(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
        setCategoryChange({ _id: e.target.value });
    };

    var sumOfferPrice = productData.reduce(function (tot, arr) {
        return tot + parseInt(arr.offer_price);
    }, 0);

    var sumPrice = productData.reduce(function (tot, arr) {
        return tot + parseInt(arr.price);
    }, 0);
    return (
        <div>
            <ToastContainer />
            <h1>Products Page</h1>
            <MaterialTable
                title=""
                columns={columns}
                data={productData}
                components={{
                    Pagination: (props) => (
                        <div>
                            <Grid container style={{ padding: "16px 0 ", fontWeight: "bolder" }}>
                                <Grid item sm={3} align="right">
                                    Total:
                                </Grid>
                                <Grid item sm={2} align="center">
                                    {sumPrice.toFixed(2)}
                                </Grid>
                                <Grid item sm={2} align="left">
                                    {sumOfferPrice.toFixed(2)}
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
                            // console.log(data, "=====");

                            const updatedRow = [...productData, data];
                            setTimeout(() => {
                                Product.add(data).then((res) => {
                                    toast.success(res.data.message, { position: "top-center" });
                                    if (res.data.status === true) {
                                        setProductData(updatedRow);
                                    }
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
                                Product.remove(selectedRow._id).then(() => {
                                    console.log("Removed");
                                });
                                setProductData(updatedRows);
                                resolve();
                            }, 1000);
                        }),
                }}
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

export default Products;
