import React from "react";

const Products = React.lazy(() => import("./views/admin/products/Products"));
const Categories = React.lazy(() => import("./views/admin/categories/Category"));
const Dashboard = React.lazy(() => import("./views/admin/dashboard/Dashboard"));
const Users = React.lazy(() => import("./views/admin/users/Users"));
const Profile = React.lazy(() => import("./views/admin/profile/Profile"));
const LandingPage = React.lazy(() => import("./views/customer/homepage/index"));

const routes = [
    { path: "/", exact: true, name: "Home" },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
    { path: "/products", name: "Products", component: Products },
    { path: "/categories", name: "Categories", component: Categories },
    { path: "/users", exact: true, name: "Users", component: Users },
    { path: "/profile", exact: true, name: "Profile", component: Profile },
    { path: "/landing-page", exact: true, name: "landing-page", component: LandingPage },
];

export default routes;
