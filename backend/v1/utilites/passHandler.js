const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    const hashedPass = await bcrypt.hash(password, 8);
    return hashedPass;
};
module.exports = { hashPassword };
