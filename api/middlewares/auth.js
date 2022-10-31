const isLoggedIn = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.redirect('http://localhost:4000/login');
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

const isLoggedOut = async (req, res, next) => {
    try {
        if (req.session.userId) {
            return res.redirect('http://localhost:4000/login');
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = { isLoggedIn, isLoggedOut };
