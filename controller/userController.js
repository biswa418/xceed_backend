const jwt = require('jsonwebtoken');
const User = require('../model/Users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//user signin
module.exports.signin = async (req, res) => {
    const { email: userEmail, password } = req.body;

    try {
        let user = await User.findOne({ email: userEmail });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Account not found, Sign up first" });
        }

        const matchPass = bcrypt.compareSync(password, user.password);

        if (!matchPass) {
            return res
                .status(400)
                .json({ message: "Invalid username/password." });
        }

        const { _id, name, email, avatar } = user;
        let token = jwt.sign({ _id, name, email, avatar }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        res.status(200).json({
            message: 'Signin Successful',
            token
        })

    } catch (err) {
        return res.status(500).json({ err });
    }
}

module.exports.signiin = async (req, res) => {
    res.send('Here');
}

//user sign up
module.exports.signup = async (req, res) => {
    const { email: userEmail, password } = req.body;

    try {
        let user = await User.findOne({ email: userEmail });

        if (user) {
            return res
                .status(400)
                .json({ message: "Account already exists, Sign In!", success: false });
        }

        const encryptedPass = bcrypt.hashSync(password, saltRounds);

        // Create the user
        const userCreated = await User.create({
            ...req.body,
            password: encryptedPass
        });

        if (!userCreated) {
            return res.status(400).json({ message: "User creation failed", success: false });
        }

        return res.status(200).json({ message: "User successfully created", success: true });
    } catch (err) {
        return res.status(500).json({ err });
    }
}