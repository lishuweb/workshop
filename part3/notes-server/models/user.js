const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    passwordHash: String,
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note",
        },
    ],
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v; 
        delete returnedObject.passwordHash;
    },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);