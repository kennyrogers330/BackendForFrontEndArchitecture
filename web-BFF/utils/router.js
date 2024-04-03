const axios = require("axios");

exports.routeRequests = async (req, res) => {
  const domain = process.env.INT_ALB;
  try {
    const response = await axios({
      method: req.method,
      // url: `http://localhost:3000${req.originalUrl}`,
      url: `${process.env.INT_ALB}${req.originalUrl}`,
      data: req.method === "GET" || req.method === "DELETE" ? {} : req.body,
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    const statusCode = error.response.status || 500;
    const errorMessage = error.response
      ? error.response.data.message
      : "Internal Server Error";

    return res.status(statusCode).json({ message: errorMessage });
  }
};
