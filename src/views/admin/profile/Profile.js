import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { helper } from "src/helper";
import User from "src/apis/User";
import { Button, TextField } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";
import "./Profile.scss";
import { changeProfileImg, submitDetails } from "src/store/slices/CurrentUserSlice";
import { CSpinner } from "@coreui/react";

const Profile = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser.currentUserData);
    const loader = useSelector((state) => state.currentUser.loader);

    const [toggle, setToggle] = useState(true);
    const [user, setUser] = useState({});
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        verifyPassword: "",
    });

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlePassChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleImgChange = (e) => {
        const data = { photo: e.target.files[0] };
        dispatch(changeProfileImg(data));
    };
    //-----------------------------------submit details remaining
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
        };
        dispatch(submitDetails(data, currentUser._id));
    };

    const handlePassSubmit = (e) => {
        e.preventDefault();
        if (
            password.currentPassword !== "" &&
            password.newPassword !== "" &&
            password.verifyPassword !== ""
        ) {
            User.password(password).then((res) => {
                if (res.data.status === true) {
                    setPassword({ currentPassword: "", newPassword: "", verifyPassword: "" });
                    toast.success(res.data.message, { position: "top-center" });
                } else {
                    toast.error(res.data.message, { position: "top-center" });
                }
            });
        } else {
            toast.error("Please fill all the fields!!", { position: "top-center" });
        }
    };

    const handleToggle = () => {
        setToggle(!toggle);
    };
    if (loader) {
        return (
            <>
                <ToastContainer />
                <div className="container">
                    <div className="main-body">
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <div className="image-upload">
                                                <label htmlFor="img-input">
                                                    <img
                                                        alt="avatar"
                                                        src={
                                                            helper.IMAGE_BASEURL + currentUser.photo
                                                        }
                                                        width="100px"
                                                        height="100px"
                                                        style={{ borderRadius: "50%" }}
                                                    />
                                                </label>
                                                <input
                                                    id="img-input"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    type="file"
                                                    name="photo"
                                                    onChange={handleImgChange}
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <h4>{currentUser.name}</h4>
                                                <p className="text-secondary mb-1">
                                                    {currentUser.role === 1 ? "Admin" : "User"}
                                                </p>
                                                <p className="text-muted font-size-sm">
                                                    {currentUser.address}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-3">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-globe mr-2 icon-inline"
                                                >
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                                </svg>
                                                Website
                                            </h6>
                                            <span className="text-secondary">
                                                https://pixlerlab.com
                                            </span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-github mr-2 icon-inline"
                                                >
                                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                </svg>
                                                Github
                                            </h6>
                                            <span className="text-secondary">anirudhpixlerlab</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-twitter mr-2 icon-inline text-info"
                                                >
                                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                                </svg>
                                                Twitter
                                            </h6>
                                            <span className="text-secondary">@anirudhchauhan</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-instagram mr-2 icon-inline text-danger"
                                                >
                                                    <rect
                                                        x="2"
                                                        y="2"
                                                        width="20"
                                                        height="20"
                                                        rx="5"
                                                        ry="5"
                                                    ></rect>
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                    <line
                                                        x1="17.5"
                                                        y1="6.5"
                                                        x2="17.51"
                                                        y2="6.5"
                                                    ></line>
                                                </svg>
                                                Instagram
                                            </h6>
                                            <span className="text-secondary">anirudh_chauhan</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-facebook mr-2 icon-inline text-primary"
                                                >
                                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                                </svg>
                                                Facebook
                                            </h6>
                                            <span className="text-secondary">anirudhchauhan</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-8">
                                {toggle ? (
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {currentUser.name}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {currentUser.email}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Phone</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {currentUser.phone}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Address</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {currentUser.address}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <Button
                                                        variant="outlined"
                                                        onClick={handleToggle}
                                                        style={{ fontWeight: 800 }}
                                                    >
                                                        Edit
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">Name:</div>
                                                <div className="col-sm-9 text-secondary">
                                                    <TextField
                                                        className="profile-input"
                                                        type="text"
                                                        name="name"
                                                        fullWidth
                                                        value={user.name}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <TextField
                                                        className="profile-input"
                                                        type="email"
                                                        name="email"
                                                        fullWidth
                                                        onChange={handleInputChange}
                                                        value={user.email}
                                                    />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Phone</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <TextField
                                                        className="profile-input"
                                                        type="number"
                                                        name="phone"
                                                        fullWidth
                                                        onChange={handleInputChange}
                                                        value={user.phone}
                                                    />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Address</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <TextField
                                                        className="profile-input"
                                                        type="text"
                                                        name="address"
                                                        fullWidth
                                                        onChange={handleInputChange}
                                                        value={user.address}
                                                    />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <Button
                                                        variant="outlined"
                                                        onClick={handleToggle}
                                                        style={{ fontWeight: 800 }}
                                                    >
                                                        Details
                                                    </Button>
                                                </div>
                                                <div className="col-sm-2">
                                                    <Button
                                                        variant="outlined"
                                                        onClick={handleSubmit}
                                                        style={{ fontWeight: 800 }}
                                                    >
                                                        Submit
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="row gutters-sm">
                                    <div className="col-sm-6 mb-3">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h5 className="d-flex align-items-center mb-3">
                                                    <i className="material-icons text-info mr-2">
                                                        assignment
                                                    </i>
                                                    Project Status
                                                </h5>
                                                <small>Web Design</small>
                                                <div
                                                    className="progress mb-3"
                                                    style={{ height: "5px" }}
                                                >
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        style={{ width: "80%" }}
                                                        aria-valuenow="80"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    ></div>
                                                </div>
                                                <small>Website Markup</small>
                                                <div
                                                    className="progress mb-3"
                                                    style={{ height: "5px" }}
                                                >
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        style={{ width: "72%" }}
                                                        aria-valuenow="72"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    ></div>
                                                </div>
                                                <small>One Page</small>
                                                <div
                                                    className="progress mb-3"
                                                    style={{ height: "5px" }}
                                                >
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        style={{ width: "89%" }}
                                                        aria-valuenow="89"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    ></div>
                                                </div>
                                                <small>Mobile Template</small>
                                                <div
                                                    className="progress mb-3"
                                                    style={{ height: "5px" }}
                                                >
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        style={{ width: "55%" }}
                                                        aria-valuenow="55"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    ></div>
                                                </div>
                                                <small>Backend API</small>
                                                <div
                                                    className="progress mb-3"
                                                    style={{ height: "5px" }}
                                                >
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        style={{ width: "66%" }}
                                                        aria-valuenow="66"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <div className=" card h-100">
                                            <div className="card-body">
                                                <h5 className="d-flex align-items-center mb-3">
                                                    <i className="material-icons text-info mr-2">
                                                        assignment
                                                    </i>
                                                    Change Password
                                                </h5>
                                                <div className="mt-4">
                                                    <h6>Current Password:</h6>
                                                    <TextField
                                                        className="profile-input"
                                                        type="password"
                                                        name="currentPassword"
                                                        fullWidth
                                                        value={password.currentPassword}
                                                        onChange={handlePassChange}
                                                    />
                                                </div>
                                                <div className="mt-4">
                                                    <h6>New Password:</h6>
                                                    <TextField
                                                        className="profile-input"
                                                        type="password"
                                                        name="newPassword"
                                                        fullWidth
                                                        value={password.newPassword}
                                                        onChange={handlePassChange}
                                                    />
                                                </div>
                                                <div className="mt-4">
                                                    <h6>Confirm Password:</h6>
                                                    <TextField
                                                        className="profile-input"
                                                        type="password"
                                                        name="verifyPassword"
                                                        fullWidth
                                                        value={password.verifyPassword}
                                                        onChange={handlePassChange}
                                                    />
                                                </div>
                                                <div className="d-flex justify-content-end">
                                                    <Button
                                                        variant="outlined"
                                                        className="m-3"
                                                        style={{ fontWeight: 800 }}
                                                        onClick={handlePassSubmit}
                                                    >
                                                        Submit
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ================================================================================================= */}
            </>
        );
    } else if (!loader) {
        return <CSpinner variant="grow" className="spinner" />;
    }
};

export default Profile;
