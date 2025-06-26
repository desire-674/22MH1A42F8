import React, { useEffect, useState } from "react";
import { Typography, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";
import LoggingService from "./logging";

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/stats");
        const data = await res.json();
        setStats(data);
        LoggingService.log("Fetched statistics", data);
      } catch (err) {
        LoggingService.log("Stats fetch error", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <Paper sx={{ mt: 4, p: 3 }}>
      <Typography variant="h5">Shortened URL Statistics</Typography>
      <List>
        {stats.map((s, i) => (
          <React.Fragment key={i}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={${s.shortUrl} (Created: ${s.createdAt}, Expires: ${s.expiresAt}) | Clicks: ${s.clicks.length}}
                secondary={
                  <>
                    {s.clicks.map((click, j) => (
                      <Typography variant="body2" key={j}>
                        {click.timestamp} — {click.source || "Unknown"} — {click.location || "N/A"}
                      </Typography>
                    ))}
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default Stats;
