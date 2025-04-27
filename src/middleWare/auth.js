const adminAuth = (req, res, next) => {
    const token = "x1xx";
    if (token === "xxx") {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = {
    adminAuth
};