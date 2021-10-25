import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
    {
        _tag: "CSidebarNavItem",
        name: "Dashboard",
        to: "/dashboard",
        icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Products",
        to: "/products",
        icon: "cil-chart-pie",
    },

    {
        _tag: "CSidebarNavDropdown",
        name: "Notifications",
        route: "/notifications",
        icon: "cil-bell",
        _children: [
            {
                _tag: "CSidebarNavItem",
                name: "Alerts",
                to: "/notifications/alerts",
            },
            {
                _tag: "CSidebarNavItem",
                name: "Badges",
                to: "/notifications/badges",
            },
            {
                _tag: "CSidebarNavItem",
                name: "Modal",
                to: "/notifications/modals",
            },
            {
                _tag: "CSidebarNavItem",
                name: "Toaster",
                to: "/notifications/toaster",
            },
        ],
    },
    {
        _tag: "CSidebarNavDivider",
    },

    {
        _tag: "CSidebarNavDropdown",
        name: "Pages",
        route: "/pages",
        icon: "cil-star",
        _children: [
            {
                _tag: "CSidebarNavItem",
                name: "Login",
                to: "/login",
            },
            {
                _tag: "CSidebarNavItem",
                name: "Register",
                to: "/register",
            },
        ],
    },

    {
        _tag: "CSidebarNavDivider",
        className: "m-2",
    },
];

export default _nav;
