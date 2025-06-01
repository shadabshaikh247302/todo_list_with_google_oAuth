
const Uschema = require("../schema/user");
const jwt = require("jsonwebtoken");

exports.authenticator = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).send("Authorization token is missing");
    }

    // Extract the token from the Authorization header (Bearer <token>)
    const token = authHeader.split(' ')[1];

    // If the token is missing after splitting
    if (!token) {
      return res.status(400).send("JWT token must be provided");
    }
    // Verify the token
    const verify = jwt.verify(token, process.env.SECRET);

    // Find the user associated with the email in the decoded token
    const user = await Uschema.findOne({ email: verify.email });
    if (!user) {
      return res.status(401).send("User not found");
    }

    // Attach the user ID to the request object
    req.userID = user._id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error); // Log error for debugging

    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send("Invalid token signature");
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).send("Token expired");
    }

    // Default error response for other cases
    res.status(500).send("An error occurred while authenticating");
  }
};
