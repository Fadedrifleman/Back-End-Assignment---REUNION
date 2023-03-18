import jwt from "jsonwebtoken";
import User from "../models/User.js";

//LOGGING IN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).json({ msg: "User does not exist" });

    const isMatch = password === user.password;
    if (!isMatch) return res.status(401).json({ msg: " Invalid credentials." });

    const token = jwt.sign({ id: user._id }, "JWT_SECRET");
    delete user.password;
    res.status(200).json({ jwtToken: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};