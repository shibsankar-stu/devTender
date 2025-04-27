const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    bio: { type: String, required: true },
    interests: [{ type: String }],
    image: { type: String, default: "default.jpg" },
    tokens: [{ token: { type: String, required: true } }]
});

const User = mongoose.model('User', userSchema);
module.exports = User