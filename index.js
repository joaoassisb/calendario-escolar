"use strict";

const server = require("./backend/server");
const app = server.app;
const PORT = process.env.PORT || server.port; 

app.listen(PORT, () => {
  console.info("Server listening on port %d in %s mode", PORT, app.get("env"));
});