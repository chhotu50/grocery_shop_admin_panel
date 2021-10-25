import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { listProducts } from "src/store/actions/ProductActions";
import axios from "axios";
import Product from "src/apis/Product";

const Products = (props) => {
    const [productData, setProductData] = useState([]);
    const [productImg, setProductImg] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [allData, setAllData] = useState([]);
    const [columns, setColumns] = useState([
        {
            title: " Title",
            field: "title",
        },
        { title: "offer", field: "offer" },

        {
            title: "Offer Price",
            field: "offer_price",
        },
        {
            title: "Photo",
            field: "photo",
            editable: "onAdd",
            editComponent: (props) => {
                // console.log(props);
                return (
                    <input type="file" name="img" accept="image/*" multiple onChange={handleImg} />
                );
            },
            render: (item) => (
                <img src={item.photo[0]} alt="" border="1" height="100" width="100" />
            ),
        },
        {
            title: "Created At",
            field: "created_at",
            type: "date",
            dateSetting: {
                format: "dd/MM/yyyy",
            },
        },
        {
            title: "Address",
            field: "address",
        },
    ]);

    useEffect(() => {
        // props.listProducts();
        // setProductData(props.products.products);
        getProductData();
    }, []);

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

    const handleImg = (e) => {
        setProductImg([...e.target.files]);
    };
    // Update a single row
    const handleRowUpdate = (newData, oldData, resolve) => {
        console.log("update row");
    };

    const handleBulkDelete = () => {
        const updatedData = productData.filter((row) => !selectedRows.includes(row));
        setProductData(updatedData);
    };
    return (
        <div>
            <h1>Products Page</h1>
            <MaterialTable
                title=""
                columns={columns}
                data={productData}
                onSelectionChange={(rows) => {
                    setSelectedRows(rows);
                }}
                editable={{
                    onRowAdd: (newRow) =>
                        new Promise((resolve, reject) => {
                            const updatedRow = [
                                ...productData,
                                { ...newRow, photo: [...productImg], category_id: 655 },
                            ];
                            setTimeout(() => {
                                Product.add({
                                    ...newRow,
                                    photo: [...productImg],
                                    category_id: 655,
                                });
                                setProductData(updatedRow);
                                resolve();
                            }, 1000);
                        }),

                    // Update row in table and database
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowDelete: (selectedRow) =>
                        new Promise((resolve, reject) => {
                            const index = selectedRow.tableData.id;
                            const updatedRows = [...productData];
                            updatedRows.splice(index, 1);
                            setTimeout(() => {
                                setProductData(updatedRows);
                                resolve();
                            }, 1000);
                        }),
                }}
                actions={[
                    {
                        icon: "delete",
                        tooltip: "Delete Selected",
                        onClick: () => {
                            handleBulkDelete();
                        },
                    },
                ]}
                // Table Options And Styling
                options={{
                    headerStyle: {
                        whiteSpace: "nowrap",
                        // color: "white",
                        // backgroundColor: "#992764",
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
        products: state.products,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        listProducts: () => dispatch(listProducts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Products));
