import React from "react";

const Products = React.lazy(() => import("./views/base/products/Products"));
const Categories = React.lazy(() => import("./views/base/categories/Category"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));

const routes = [
    { path: "/", exact: true, name: "Home" },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
    { path: "/products", name: "Products", component: Products },
    { path: "/categories", name: "Categories", component: Categories },
    { path: "/users", exact: true, name: "Users", component: Users },
    { path: "/users/:id", exact: true, name: "User Details", component: User },
];

export default routes;
