
const jwt = require("jsonwebtoken");



module.exports.adminAuthorisation = (req, res, next) => {
    const token = req.cookies.token; // Extract token from cookies

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    jwt.verify(token, "harsh", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token." });
        }

        req.user = decoded; // Attach decoded user data to request
        next(); // Proceed to the next middleware or route handler
    });
};
