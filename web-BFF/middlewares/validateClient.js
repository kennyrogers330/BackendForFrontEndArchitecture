const BFF = require("../utils/router");

function validateClientType(req, res) {
  const clientType = req.headers["x-client-type"];

  // Check if client type header is missing or invalid
  if (!clientType || !["Web"].includes(clientType)) {
    return res
      .status(400)
      .json({ error: "Invalid or missing X-Client-Type header." });
  }
  BFF.routeRequests(req, res);
}

module.exports = validateClientType;
