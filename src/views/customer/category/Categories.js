import Button from "@material-ui/core/Button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./categories.css";

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categoryData);

    return (
        <div className="d-flex justify-content-center mt-5">
            {categories.map((category, i) => (
                <Button
                    variant="outlined"
                    style={{ color: "black", border: "1px solid black", margin: "0px 6px" }}
                    key={i}
                >
                    {category.title}
                </Button>
            ))}
        </div>
    );
};

export default Categories;
