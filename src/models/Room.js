const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minLength: 8 },
    volume: { type: Number, required: true, default: 1 },
    equipments: { type: [String], default: [] },
    availability:
    {
        //créneau horaire des dispo des salles
        '8h-9h'  : { type: Boolean, default: true},
        '9h-10h' : { type: Boolean, default: true},
        '10h-11h': { type: Boolean, default: true},
        '11h-12h': { type: Boolean, default: true},
        '12h-13h': { type: Boolean, default: true},
        '13h-14h': { type: Boolean, default: true},
        '14h-15h': { type: Boolean, default: true},
        '15h-16h': { type: Boolean, default: true},
        '16h-17h': { type: Boolean, default: true}
    }
},
{
    timestamps: true
})

const room = mongoose.model('Room', roomSchema);

module.exports = room;