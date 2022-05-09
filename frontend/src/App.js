import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../src/components/Navbar/Navbar.jsx";
import Home from "../src/components/Home/Home.jsx";
import Send from "../src/components/Send/Send.jsx";
import Contact from "../src/components/Contact/Contact.jsx";
import Projects from "../src/components/Projects/Projects.jsx";
import Error from "../src/components/Error/Error.jsx";

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/send" element={<Send />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
};

export default App;
