import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    const token = req.headers.authorization;
 

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;

        next();
    }
     catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    }

}

export default authUser;