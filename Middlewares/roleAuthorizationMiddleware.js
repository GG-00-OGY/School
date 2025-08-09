
function roleAuthorizationMiddleware(rolesAllowed) {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!rolesAllowed.includes(userRole)) {
            return res.status(403).json({ message: 'شما مجاز به انجام این کار نیستید' });
        }

        next();
    };
}

module.exports = roleAuthorizationMiddleware;
