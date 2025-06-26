import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import AHome from "./AHome"
import Stats from "./Stats";
import RedirectHandler from "./RedirectHandler"
const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<AHome />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/:shortcode" element={<RedirectHandler />} />
        </Routes>
      </Container>
    </Router>
  );
};
export default App;
