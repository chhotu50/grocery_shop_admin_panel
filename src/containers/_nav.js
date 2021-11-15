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
        _tag: "CSidebarNavItem",
        name: "Categories",
        to: "/categories",
        icon: "cilLayers",
    },
    {
        _tag: "CSidebarNavItem",
        name: "Users",
        to: "/users",
        icon: <CIcon name="cilUser" customClasses="c-sidebar-nav-icon" />,
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
        _tag: "CSidebarNavItem",
        name: "Profile",
        to: "/profile",
        icon: <CIcon name="cil-settings" customClasses="c-sidebar-nav-icon" />,
    },
];

export default _nav;
