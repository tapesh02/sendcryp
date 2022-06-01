import React from "react";
import { NavLink } from "react-router-dom";

import { AppBar, Stack, Toolbar } from "@mui/material";
import { Box } from "@mui/system";

import logo from "../../assets/logo.svg";

const Navbar = () => {
    return (
        <>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Box flexGrow={1} padding={1} margin={1}>
                        <img src={logo} alt="logoimg" />
                    </Box>
                    <Stack spacing={2} direction="row">
                        <NavLink to="/home" className={(navlink) => (navlink.isActive ? "active" : "inactive")}>
                            Home
                        </NavLink>
                        <NavLink to="/send" className={(navlink) => (navlink.isActive ? "active" : "inactive")}>
                            Send
                        </NavLink>
                        <NavLink to="/contact" className={(navlink) => (navlink.isActive ? "active" : "inactive")}>
                            Contact
                        </NavLink>
                        <NavLink to="/market" className={(navlink) => (navlink.isActive ? "active" : "inactive")}>
                            Market
                        </NavLink>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
