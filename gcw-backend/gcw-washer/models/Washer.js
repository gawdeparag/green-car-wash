const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const WasherSchema = new Schema({
    name: {
        type: String
    },
    userName: {
        type: String,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: [6, 'Minimum password length should be 6 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastLoggedIn: {
        type: Date,
        default: Date.now()
    }
});

WasherSchema.statics.login = async function(email, password) {
    const washer = await this.findOne({ email });
    if (washer) {
        const auth = await bcrypt.compare(password, washer.password);
        if (auth) {
            this.updateOne({ email }, { lastLoggedIn: Date.now() });
            return washer;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

WasherSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const Washer = new mongoose.model('washers', WasherSchema);

module.exports = Washer;