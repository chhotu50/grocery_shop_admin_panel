import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { listProducts } from "src/store/actions/ProductActions";
import { listCategories } from "src/store/actions/CategoryActions";
import axios from "axios";
import Product from "src/apis/Product";

const Products = (props) => {
    const [productData, setProductData] = useState([]);
    const [productImg, setProductImg] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryChange, setCategoryChange] = useState({ title: "" });
    const [selectedRows, setSelectedRows] = useState([]);
    const [allData, setAllData] = useState([]);
    const renderCategories = () => {
        console.log(categories);
        return (
            categories.length > 0 &&
            categories.map((item, index) => {
                return (
                    <>
                        <option>tshirt</option>
                        <option>shirt</option>
                    </>
                );
            })
        );
    };
    const [columns, setColumns] = useState([
        {
            title: " Title",
            field: "title",
        },
        {
            title: "Category",
            field: "category",
            editable: "onAdd",
            render: (rowData) => rowData.category_id.title,
            editComponent: (row) => {
                console.log(row);
                return (
                    <select name="categories" id="categories">
                        <option>Choose Category:</option>
                        {renderCategories()}
                    </select>
                );
            },
        },

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
                return <input type="file" name="img" accept="image/*" onChange={handleImg} />;
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
        getProductData();
        getCategories();
    }, []);

    // console.log(categories);

    const getCategories = () => {
        axios
            .get("categories")
            .then((res) => {
                setCategories([...res.data.data]);
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

    const handleCategoryChange = (e) => {
        setCategoryChange({ title: e.target.value });
        console.log(categoryChange);
    };
    // ----------------------------------------------------------------------------------
    const handleImg = (e) => {
        setProductImg(e.target.files[0]);
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
                                {
                                    ...newRow,
                                    photo: [...productImg],
                                    category_id: "61710ea7a2741bbb4faa1a33",
                                },
                            ];
                            setTimeout(() => {
                                Product.add({
                                    ...newRow,
                                    photo: [...productImg],
                                    category_id: "61710ea7a2741bbb4faa1a33",
                                });
                                setProductData(updatedRow);
                                resolve();
                            }, 1000);
                        }),

                    onRowDelete: (selectedRow) =>
                        new Promise((resolve, reject) => {
                            console.log(selectedRow);
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
        categories: state.categories,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        listProducts: () => dispatch(listProducts()),
        listCategories: () => dispatch(listCategories()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Products));
