const jwt = require("jsonwebtoken");
const User = require("../model/user");
const adminAuth =  async (req, res, next) => {
   try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Token not found");
    }
    const cookieVarify = jwt.verify(token, "shib@12345") 
    const user = await User.findById(cookieVarify._id);
    if (!user) {
        throw new Error("User not found");
    }
    req.user = user;
    next();
   } catch (error) {
    res.status(401).json({ message: "Unauthorized Access" });
   }
}

module.exports = {
    adminAuth
};