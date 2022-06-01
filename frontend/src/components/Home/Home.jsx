import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

import homeImg from "../../assets/homeImg.png";

const Home = () => {
    return (
        <>
            <Box className="main">
                <Box className="maintitle">
                    <p className="title"> Trusted and secure crypto exchange</p>
                    <p className="subtitle">Get started by sending your digital assets in a milliseconds.</p>
                    <Button color="inherit" href="/send" className="btn">
                        Send Now
                    </Button>
                </Box>
                <Box className="homeimage">
                    <img src={homeImg} alt="homeImg" />
                </Box>
            </Box>
        </>
    );
};

export default Home;
