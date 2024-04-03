const verifyJwt = (req, res, next) => {
  let decoded;
  try {
    if (req.headers.authorization) {
      decoded = JSON.parse(
        Buffer.from(
          req.headers.authorization.split(".")[1],
          "base64"
        ).toString()
      );

      // Check if the "sub" claim exists and its value is valid
      if (
        !decoded.sub ||
        !["starlord", "gamora", "drax", "rocket", "groot"].includes(decoded.sub)
      ) {
        return res.status(401).json({
          status: "auth-failure",
          error: "Invalid subject in token",
        });
      }

      // Check if the "exp" claim exists and token is not expired
      const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
      if (!decoded.exp || decoded.exp <= currentTimestamp) {
        return res.status(401).json({
          status: "auth-failure",
          error: "Token has expired",
        });
      }

      // Check if the "iss" claim exists and its value is valid
      if (!decoded.iss || decoded.iss !== "cmu.edu") {
        return res.status(401).json({
          status: "auth-failure",
          error: "Invalid issuer in token",
        });
      }

      next();
    } else {
      return res.status(401).json({
        status: "auth-failure",
        error: "You are not logged in! Please log in to get access.",
      });
    }
  } catch (error) {
    // Handle any errors that occur during decoding
    return res.status(401).json({
      status: "auth-failure",
      error: error.message,
    });
  }
};

module.exports = verifyJwt;
