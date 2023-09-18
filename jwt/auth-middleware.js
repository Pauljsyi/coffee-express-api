const jwt = require("jsonwebtoken");
const config = require("./config");

module.exports = (credentials = []) => {
  return (req, res, next) => {
    console.log("authorization middleware");

    // Allow for either string or array
    if (typeof credentials === "string") {
      credentials = [credentials];
    }

    // Find JWT in Headers
    const token = req.headers["authorization"];
    console.log(config);

    if (!token) {
      return res.status(401).send("Sorry dude: access denied");
    } else {
      // Validate

      // Bearer token
      const tokenBody = token.slice(7);
      console.log("tokenBody: ", tokenBody);
      jwt.verify(tokenBody, config.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(`JWT ERROR: ", ${err}`);
          return res.status(401).send("Error: access denied");
        }
        // if Valid

        // Check for credentials
        if (credentials.length > 0) {
          if (
            decoded.scopes &&
            decoded.scopes.length &&
            credentials.some((cred) => decoded.scopes.indexOf(cred) >= 0)
          ) {
            next();
          } else {
            return res.status(401).send("Error: Access denied");
          }
        } else {
          // No Credentials required, user is authorized
          next();
        }
      });
    }
  };
};
