import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { listProducts } from "src/store/actions/ProductActions";
import { listCategories } from "src/store/actions/CategoryActions";
import axios from "axios";
import Product from "src/apis/Product";
import DropDown from "./CategoryDropdown";

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
      validate: (rowData) => Boolean(rowData.title),
    },
    {
      title: "Category",
      field: "category",
      render: (rowData) => rowData.category_id.title,
      editComponent: (props) => <DropDown onChange={handleCategoryChange} />,
    },

    {
      title: "Offer Price",
      field: "offer_price",
      type: "numeric",
      align: "left",
      validate: (rowData) => Boolean(rowData.created_at),
    },
    {
      title: "Photo",
      field: "photo",
      editComponent: (props) => {
        return <input type="file" name="photo" accept="image/*" onChange={handleImg} />;
      },
      render: (item) => (
        <img
          src={"http://192.168.1.4:4000" + item.photo[0]}
          alt=""
          border="1"
          height="100"
          width="100"
        />
      ),
    },
    {
      title: "Created At",
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

  // ----------------------------------------------------------------------------------
  const handleImg = (e) => {
    setProductImg(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategoryChange({ _id: e.target.value });
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
              const data = {
                ...newRow,
                photo: productImg,
                category_id: categoryChange._id,
              };
              console.log(data, "=========");

              const updatedRow = [...productData, data];
              setTimeout(() => {
                Product.add(data).then((res) => {
                  console.log(res);
                  if (res.data.status === true) {
                    setProductData(updatedRow);
                  }
                });

                resolve();
              }, 2000);
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
