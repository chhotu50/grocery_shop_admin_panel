import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl } from "@material-ui/core";
import { useSelector } from "react-redux";

const DropDown = ({ onChange }) => {
    const categories = useSelector((state) => state.category.categoryData);

    const renderCategories = () => {
        return (
            categories.length > 0 &&
            categories.map((item, index) => {
                return (
                    <MenuItem key={index} value={item._id}>
                        {item.title}
                    </MenuItem>
                );
            })
        );
    };

    return (
        <FormControl>
            <Select onChange={onChange} defaultValue="">
                {renderCategories()}
            </Select>
        </FormControl>
    );
};

export default DropDown;
