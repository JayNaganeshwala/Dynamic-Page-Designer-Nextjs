'use strict';
import mongoose from "mongoose";


const LengthExtruder_DAYSchema= new mongoose.Schema({
    date: { type: Date, required: true },
    deviceCode : { type: 'string', required: true },
    EvolveIdentifier: { type: 'string', required: true },
    shift_1: { type: 'object', require: true },
    shift_2: { type: 'object', require: true },
    shift_3: { type: 'object', require: true },
    createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },

}, { collection: 'LengthExtruder_DAY' })


const LengthExtruder_DAY = mongoose.models.LengthExtruder_DAY || mongoose.model("LengthExtruder_DAY", LengthExtruder_DAYSchema);
export default LengthExtruder_DAY;