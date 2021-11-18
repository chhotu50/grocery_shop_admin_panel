import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoryData } from "src/store/slices/CategorySlice";
import { fetchProductData } from "src/store/slices/ProductSlice";
import Categories from "../category/Categories";
import Header from "../header/Header";
import Cards from "../products/Cards";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductData());
        dispatch(fetchCategoryData());
    });
    return (
        <div className=" ">
            <Header />
            <div className="mt-5">
                <Categories />
            </div>
            <div className="mt-5">
                <Cards className="mt-5" />
            </div>
        </div>
    );
};

export default Home;
