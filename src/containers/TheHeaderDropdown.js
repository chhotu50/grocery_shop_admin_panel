import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import { helper } from "src/helper";

const TheHeaderDropdown = () => {
    const history = useHistory();
    const currentUser = useSelector((state) => state.currentUser.currentUserData);

    const handleLogout = () => {
        localStorage.clear();
        history.push("/login");
    };

    return (
        <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div className="c-avatar">
                    <CImg
                        src={helper.IMAGE_BASEURL + currentUser.photo}
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
