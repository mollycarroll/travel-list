const logRequest = (req, res, next) => {
    console.log(`${new Date().toISOString()} :: ${req.method} ${req.originalUrl}`);
    next();
}


const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        next();
    } else {
        console.log('Unathenticated request');
        res.redirect('/sessions/new');
    }
}


module.exports = {
    isAuthenticated,
    logRequest,
};