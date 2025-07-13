const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expireAfterSeconds: 86400 } // Automatically deletes the document after 24 hours
    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);