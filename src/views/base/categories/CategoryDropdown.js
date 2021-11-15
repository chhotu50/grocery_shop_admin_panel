import React, { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { FormControl } from "@material-ui/core";

const DropDown = ({ onChange }) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
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
