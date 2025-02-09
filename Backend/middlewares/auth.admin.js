import jwt from "jsonwebtoken";
const authenticate = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user information to the request object
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authenticate;
