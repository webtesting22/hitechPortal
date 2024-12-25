import React, { useState } from "react";
import "./SideNavigationpanel.css";
import { NavLink } from "react-router-dom";
import HitechLogo from "./hitech_logo.png";
import { Button } from "antd";
import { MdMenu } from "react-icons/md";
const links = [
    { path: "/CareerApplication", label: "Career Application" },
    { path: "/Employee", label: "Employee" },
    { path: "/Evaluation", label: "Evaluation" },
    // Add more links as needed
];

const SideNavigation = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
        // const rightSideElement = document.getElementById("RightSide");
        // if (rightSideElement) {
        //     rightSideElement.style.width = isCollapsed ? "70%" : "100%";
        // }
    };
    return (
        <>

            <section className="SideNavigation">
                <div className="ToggleBtn"> <Button onClick={handleToggle}><MdMenu /></Button></div>
                <div className={`navigationPanel ${isCollapsed ? 'collapsed' : ''}`}>
                    <div className="PortalLogoContainer">
                        <img src={HitechLogo} alt="HitechLogo" />
                    </div>
                    <div className="FeaturesAndContainers">
                        {links.map((link, index) => (
                            <div key={index}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive ? "activeLink" : ""
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default SideNavigation;
