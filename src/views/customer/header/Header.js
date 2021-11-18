import React from "react";
import { Redirect } from "react-router";
import "./header.css";

const Header = () => {
    const handleLogout = () => {
        localStorage.clear();
    };
    return (
        <>
            <div className="row header-wrapper">
                <div className="col">Groccery Shop</div>
                <div className="col-sm d-flex justify-content-between mt-3 header-nav">
                    <span className="nav-link">Home</span>
                    <span className="nav-link">My Cart</span>
                    <span className="nav-link">About Us</span>
                    <span className="nav-link">Contact Us</span>
                    {localStorage.getItem("user.token") ? (
                        <span className="nav-link" onClick={handleLogout}>
                            LogOut
                        </span>
                    ) : (
                        <span className="nav-link">
                            {/* <Redirect to="/login">Login</Redirect> */}Login
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
