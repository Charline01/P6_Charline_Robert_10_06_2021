const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.splitz( ' ' )[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = { userId: userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User Id non valable !';
        } else {
            next ();
        }
    } catch {
        res.status(401).json({ 
            error: new Error ('Requête non authentifiée ! ')
        });
    }
};