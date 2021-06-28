const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
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

AdminSchema.statics.login = async function(email, password) {
    const admin = await this.findOne({ email });
    if (admin) {
        const auth = await bcrypt.compare(password, admin.password);
        if (auth) {
            this.updateOne({ email }, { lastLoggedIn: Date.now() }).then((response) => {
                console.log("Last Logged In Time Updated Successfully");
            }).catch((err) => { console.log(err) });
            return admin;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

AdminSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const Admin = new mongoose.model('admin', AdminSchema);

module.exports = Admin;