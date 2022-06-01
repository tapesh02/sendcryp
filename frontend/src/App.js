import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../src/components/Navbar/Navbar.jsx";
import Home from "../src/components/Home/Home.jsx";
import Send from "../src/components/Send/Send.jsx";
import Contact from "../src/components/Contact/Contact.jsx";
import Market from "../src/components/Market/Market.jsx";
import Error from "../src/components/Error/Error.jsx";

import "./styles/main/style.scss";

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/send" element={<Send />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/market" element={<Market />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
};

export default App;
