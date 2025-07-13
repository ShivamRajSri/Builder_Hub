const SellerModel = require('../Models/Sellerusermodel');
module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = SellerModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}