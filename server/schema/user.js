
const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },
    username: String,
    email: { type: String, unique: true },
    password: String,
    confirm_password: String,
    profilePicture: String,

})
// =======
const Uschema = mongoose.model("Uschema", userSchema);
module.exports = Uschema;
