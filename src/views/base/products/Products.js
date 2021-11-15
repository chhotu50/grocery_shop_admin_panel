import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../categories/CategoryDropdown";
import { helper } from "./../../../helper/index";
import "./products.scss";
import { Divider, Grid, TablePagination } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";
import { CSpinner } from "@coreui/react";
import {
    newProduct,
    fetchProductData,
    removeProduct,
    handleUpdateProduct,
    removeMultiple,
} from "src/store/slices/ProductSlice";

const Products = (props) => {
    const dispatch = useDispatch();

    const loader = useSelector((state) => state.product.loader);
    const [productData, setProductData] = useState([]);
    const [productImg, setProductImg] = useState("");
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
            type: "currency",
            currencySetting: { currencyCode: "INR" },
            validate: (rowData) => Boolean(rowData.price),
        },

        {
            title: "Offer Price",
            field: "offer_price",
            type: "currency",
            currencySetting: { currencyCode: "INR" },
            align: "center",
            validate: (rowData) => Boolean(rowData.offer_price),
        },
        {
            title: "Photo",
            field: "photo",
            editable: "onAdd",
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
            editable: "onAdd",
            render: (item) => {
                return item.created_by
                    ? item.created_by.name
                    : localStorage.getItem("user.data").name;
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
            editable: "onAdd",
            validate: (rowData) => Boolean(rowData.created_at),
            type: "date",
            dateSetting: {
                format: "dd/MM/yyyy",
            },
        },
    ]);
    // -------------------------------------------------------------------------------------

    useEffect(() => {
        dispatch(fetchProductData());
        getProductData();
        return () => {
            setProductData([]);
        };
    }, [dispatch]);

    const getProductData = () => {
        axios
            .get("product")
            .then((res) => {
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

        dispatch(removeMultiple({ ids: data.toString() }));
    };
    // __________________________For total amount_______________________________
    // var sumOfferPrice = productData.reduce(function (tot, arr) {
    //     return tot + parseInt(arr.offer_price);
    // }, 0);

    // var sumPrice = productData.reduce(function (tot, arr) {
    //     return tot + parseInt(arr.price);
    // }, 0);

    if (loader) {
        return (
            <div>
                <ToastContainer />
                <MaterialTable
                    title=""
                    columns={columns}
                    data={productData}
                    // to show total amount------------------------------------------

                    // components={{
                    //     Pagination: (props) => (
                    //         <div>
                    //             <Grid
                    //                 container
                    //                 style={{ padding: "16px 0 ", fontWeight: "bolder" }}
                    //             >
                    //                 <Grid item sm={3} align="right">
                    //                     Total:
                    //                 </Grid>
                    //                 <Grid item sm={2} align="right">
                    //                     <span className="total">{sumPrice.toFixed(2)}</span>
                    //                 </Grid>
                    //                 <Grid item sm={1} align="right">
                    //                     <span className="total">{sumOfferPrice.toFixed(2)}</span>
                    //                 </Grid>
                    //             </Grid>
                    //             <Divider />
                    //             <TablePagination {...props} />
                    //         </div>
                    //     ),
                    // }}
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
                                    dispatch(newProduct(data));
                                    setProductData(updatedRow);
                                    // Product.add(data)
                                    //     .then((res) => {
                                    //         if (res.data.status === true) {
                                    //             toast.success(res.data.message, {
                                    //                 position: "top-center",
                                    //             });
                                    //             setProductData(updatedRow);
                                    //             getProductData();
                                    //         }
                                    //     })
                                    //     .catch((err) => {
                                    //         toast.error(err.message, { position: "top-center" });
                                    //     });

                                    resolve();
                                }, 2000);
                            }),

                        onRowDelete: (selectedRow) =>
                            new Promise((resolve, reject) => {
                                const index = selectedRow.tableData.id;
                                const updatedRows = [...productData];
                                updatedRows.splice(index, 1);
                                setTimeout(() => {
                                    dispatch(removeProduct(selectedRow._id));
                                    setProductData(updatedRows);
                                    resolve();
                                    // Product.remove(selectedRow._id)
                                    //     .then((res) => {
                                    //         if (res.data.status === true) {
                                    //             setProductData(updatedRows);
                                    //             toast.success("Removed", {
                                    //                 position: "top-center",
                                    //             });
                                    //         }
                                    //     })
                                    //     .catch((err) => {
                                    //         toast.error(err.message, { position: "top-center" });
                                    //     });
                                }, 1000);
                            }),
                        onRowUpdate: (updatedRow, oldRow) =>
                            new Promise((resolve, reject) => {
                                const data = {
                                    title: updatedRow.title,
                                    category_id: categoryChange._id,
                                    price: updatedRow.price.toString(),
                                    offer_price: updatedRow.offer_price,
                                };
                                const index = oldRow.tableData.id;
                                const updatedRows = [...productData];
                                updatedRows[index] = updatedRow;
                                setTimeout(() => {
                                    dispatch(handleUpdateProduct({ ...data, id: oldRow._id }));
                                    setProductData(updatedRows);

                                    // Product.update(oldRow._id, data)
                                    //     .then((res) => {
                                    //         if (res.data.status === true) {
                                    //             console.log(res.data);
                                    // setProductData(updatedRows);
                                    //             toast.success(res.data.message, {
                                    //                 position: "top-center",
                                    //             });
                                    //         } else {
                                    //             console.log(res.data);
                                    //             toast.error(res.data.message, {
                                    //                 position: "top-center",
                                    //             });
                                    //         }
                                    //     })
                                    //     .catch((err) => {
                                    //         console.log(err);
                                    //     });
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
    } else if (!loader) {
        return <CSpinner variant="grow" className="spinner" />;
    }
};

export default Products;
