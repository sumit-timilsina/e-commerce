import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.token;
    console.log(token);

    if (!token) {
      return res.status(401).json({ sucess: false, message: "Unauthorized" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ sucess: false, message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ sucess: false, message: "Unauthorized" });
  }
};

export default adminAuth;
