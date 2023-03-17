import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token)
      return res.status(403).json({ error: "You must be logged In." });

    if (token.startsWith("Bearer ")) {
      token = token.replace("Bearer ", "");
    }

    const verified = jwt.verify(token, "JWT_SECRET");
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
