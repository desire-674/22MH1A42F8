// pages/RedirectHandler.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoggingService from "./logging";

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const resolveRedirect = async () => {
      try {
        const res = await fetch(http://localhost:3001/api/redirect/${shortcode});
        const data = await res.json();
        if (data.originalUrl) {
          LoggingService.log("Redirecting", data);
          window.location.href = data.originalUrl;
        } else {
          alert("Invalid or expired link.");
        }
      } catch (err) {
        LoggingService.log("Redirection error", err);
        alert("Failed to redirect.");
      }
    };

    resolveRedirect();
  }, [shortcode]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
