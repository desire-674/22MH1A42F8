const LoggingService = {
  log: (message, payload) => {
    fetch("http://localhost:3001/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, payload, timestamp: new Date().toISOString() }),
    }).catch((err) => {
    });
  },
};

export default LoggingService;
