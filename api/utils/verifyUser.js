import jwt from 'jsonwebtoken'

export const verifyUser = (req, res, next) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err){
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = user;
    next();
  })
};
