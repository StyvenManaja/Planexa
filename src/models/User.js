const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Schema pour l'utilisateur
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, minLength: 8 },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String }
},
{
    timestamps: true    //pour garder l'ancienneté de l'utilisateur
})

//hashage du mot de passe avant la création de l'utilisateur
userSchema.pre('save', async function (next) {
    try {
        if(!this.isModified('password')) { return next }; //si le mot de passe n'est pas modifier, on ne fait rien
        this.password = await bcrypt.hash(this.password, 10);   //sinon, on le hash avant l'enregistrement
        next();
    } catch (error) {
        next(error);
    }
})

//méthodes de comparaison du mot de passe au connection
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);