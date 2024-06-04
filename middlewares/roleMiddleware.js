const roleMiddleware = (role) => async(req, res, next) => {
    user = req.user; // Users Role from DB

    // console.log(role);
    // console.log(user);

    if(role !== user.role){
        return res.status(403).json({
            success : false,
            message : "Forbidden",
        });
    }

    next();
};

module.exports = roleMiddleware;