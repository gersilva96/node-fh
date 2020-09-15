const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const validRoles = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} no es un rol válido"
};

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El email es obligatorio"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: validRoles
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//Esta función elimina la propiedad password para que no sea mostrada al devolver el objeto por el response
userSchema.methods.toJSON = function() {
    const user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator, {message: "El {PATH} ya existe"});

module.exports = mongoose.model("users", userSchema);