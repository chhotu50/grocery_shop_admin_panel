import React, { useState, useEffect } from "react";
import {
    CBadge,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CImg,
    CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router";
import User from "src/apis/User";

const TheHeaderDropdown = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        currentUserData();
    }, []);
    const history = useHistory();
    const handleLogout = () => {
        localStorage.clear();
        history.push("/login");
    };
    const currentUserData = () => {
        User.showOne(data._id).then((res) => {
            setUser(res.data.data);
        });
    };
    const data = JSON.parse(localStorage.getItem("user.data"));
    return (
        <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div className="c-avatar">
                    <CImg
                        // src={helper.IMAGE_BASEURL + user.photo}
                        src={"./avatars/avatar.jpeg"}
                        className="c-avatar-img"
                        alt="admin"
                    />
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem header tag="div" color="light" className="text-center">
                    <strong>Settings</strong>
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon name="cil-user" className="mfe-2" />
                    Profile
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon name="cil-settings" className="mfe-2" />
                    Settings
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon name="cil-credit-card" className="mfe-2" />
                    Payments
                    <CBadge color="secondary" className="mfs-auto">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon name="cil-file" className="mfe-2" />
                    Projects
                    <CBadge color="primary" className="mfs-auto">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem divider />
                <CDropdownItem>
                    <CButton block variant="ghost" color="dark" onClick={handleLogout}>
                        Log Out
                    </CButton>
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default TheHeaderDropdown;
