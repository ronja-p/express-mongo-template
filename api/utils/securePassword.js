const bcrypt = require('bcrypt');

const saltRounds = 10;

const securePassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = {
    securePassword,
    comparePassword
};
