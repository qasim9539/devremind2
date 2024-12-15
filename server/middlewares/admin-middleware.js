const adminMiddleware = (req, res, next) => {
    try {
        const adminRole = req.user.isAdmin;
        if (!adminRole) {
            return res.status(403).json({ message: "Access denied user is not a admin" });
        }
        next();
    } catch (error) {
        console.log(error);
    }
  
};

module.exports = adminMiddleware;