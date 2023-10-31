import jwt from "jsonwebtoken"; 

const verifyToken = (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const type = req.headers.authorization.split(" ")[0];
  if (type !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Unauthorized: wrong token provided" });
  }

  try {
    const payload = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET
    );

    req.userId = payload.id;
    next();
  } catch (e) {
    res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }
};

export  {verifyToken};
