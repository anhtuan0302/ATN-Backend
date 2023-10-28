const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    name: { type: String, required: true},
    role: { type: String, enum: ['admin', 'user'], required: true },
});

const UsersModel = mongoose.model('users', UserSchema, 'users');

// Default account for admin
UsersModel.findOne({ email: 'admin@atn.com' }, (err, user) => {
    if (!user) {
        bcrypt.hash('admin', 10, (err, hashedPassword) => {
            const newUser = {
                email: 'admin@atn.com',
                password: hashedPassword,
                name: 'ATN Company',
                role: 'admin',
            };
            UsersModel.create(newUser);
        });
    }
});

module.exports = UsersModel;