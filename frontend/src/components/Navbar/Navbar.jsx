import React from "react";

import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import { Box } from "@mui/system";

import logo from "../../logo.svg";

const Navbar = () => {
    return (
        <>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Box flexGrow={1} padding={1} margin={1}>
                        <img src={logo} alt="logoimg" />
                    </Box>
                    <Stack spacing={2} direction="row">
                        <Button href="/home" color="inherit">
                            Home
                        </Button>
                        <Button href="/send" color="inherit">
                            Send
                        </Button>
                        <Button href="/contact" color="inherit">
                            Contact
                        </Button>
                        <Button href="/projects" color="inherit">
                            Projects
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
