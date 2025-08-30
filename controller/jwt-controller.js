import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = (request, response, next) => {
  console.log("Headers:", request.headers);
  const authHeader = request.headers["authorization"];

  console.log("Auth Header:", authHeader);
  // Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];

  console.log("Token:", token);

  if (!token) {
    return response.status(401).json({ msg: "Token is Missing" });
  }
  Jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return response.status(401).json({ msg: "Token Expired" });
      }
      return response.status(403).json({ msg: "Invalid Token" });
    }
    request.user = user;
    next();
  });

};
