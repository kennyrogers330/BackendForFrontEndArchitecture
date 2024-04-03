const axios = require("axios");

exports.routeRequests = async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      // url: `http://localhost:3000${req.originalUrl}`,
      url: `${process.env.INT_ALB}${req.originalUrl}`,
      data: req.method === "GET" || req.method === "DELETE" ? {} : req.body,
    });

    if (req.method === "GET" && response.data.genre === "non-fiction") {
      response.data.genre = 3;
    }

    if (req.method === "GET" && response.data.userId != null) {
      delete response.data.address;
      delete response.data.address2;
      delete response.data.city;
      delete response.data.state;
      delete response.data.zipcode;
    }

    return res.status(response.status).json(response.data);
  } catch (error) {
    const statusCode = error.response.status || 500;
    const errorMessage = error.response
      ? error.response.data.message
      : "Internal Server Error";

    return res.status(statusCode).json({ message: errorMessage });
  }
};
