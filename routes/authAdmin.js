const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ADMIN_EMAIL = "harsh@gmail.com";
const ADMIN_HASHED_PASSWORD = "$2b$10$ej40cm7TD.4RT4VcCHU8ieE.wnTe1gof4OxXD38/EClH8TEym/YNS"; // Your correct hash

module.exports.authAdmin = (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        if (email !== ADMIN_EMAIL) {
            return res.status(401).json({ message: "Email or password is incorrect." });
        }

        bcrypt.compare(password, ADMIN_HASHED_PASSWORD, (err, result) => {
            if (err) {
                console.error("❌ Error comparing passwords:", err);
                return res.status(500).json({ message: "Internal server error." });
            }


            if (!result) {
                return res.status(401).json({ message: "Email or password is incorrect." });
            }

            const token = jwt.sign({ email }, "harsh", { expiresIn: "1h" });

            res.cookie("token", token, { httpOnly: true, secure: false });
            return res.redirect("/admin/panel");
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
};




// $2b$10$ej40cm7TD.4RT4VcCHU8ieE.wnTe1gof4OxXD38/EClH8TEym/YNS