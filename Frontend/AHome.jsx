import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper } from "@mui/material";
import LoggingService from "./logging";

const initialUrls = [{ url: "", validity: "", shortcode: "" }];

const Home = () => {
  const [urls, setUrls] = useState(initialUrls);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = async () => {
    const validInputs = urls.filter((u) => validateUrl(u.url));
    if (!validInputs.length) return alert("Provide at least one valid URL.");

    try {
      const res = await fetch("http://localhost:3001/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validInputs),
      });
      const data = await res.json();
      setResults(data);
      LoggingService.log("Shortened URLs successfully", data);
    } catch (err) {
      LoggingService.log("Shorten error", err);
      alert("Failed to shorten URLs");
    }
  };

  const addUrlField = () => {
    if (urls.length >= 5) return;
    setUrls([...urls, { url: "", validity: "", shortcode: "" }]);
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5">Shorten URLs</Typography>
      {urls.map((input, index) => (
        <Grid container spacing={2} key={index} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Original URL"
              value={input.url}
              onChange={(e) => handleChange(index, "url", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Validity (min)"
              type="number"
              value={input.validity}
              onChange={(e) => handleChange(index, "validity", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Custom Shortcode"
              value={input.shortcode}
              onChange={(e) => handleChange(index, "shortcode", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button sx={{ mt: 2 }} variant="contained" onClick={addUrlField}>
        Add Another
      </Button>
      <Button sx={{ mt: 2, ml: 2 }} variant="outlined" onClick={handleShorten}>
        Shorten
      </Button>

      {results.length > 0 && (
        <Paper sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6">Shortened Links</Typography>
          {results.map((r, i) => (
            <Typography key={i}>{r.shortUrl} (expires at {r.expiry})</Typography>
          ))}
        </Paper>
      )}
    </Paper>
  );
};
export default Home;
