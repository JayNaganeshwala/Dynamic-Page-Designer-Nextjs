'use strict';
import mongoose from "mongoose";

const EvolveMouldingSchema = new mongoose.Schema({
    EvolveIOTDevice_Code: { type: 'string', required: true, default: '' },
    EvolveIOTDevice_MacID: { type: 'string', default: '', required: true },
    deviceStatus: { type: 'Boolean', default: false },
    TS: { type: 'string', required: true },
    DATE: { type: Date, default: Date.now },
    Data: { type: 'object', require: true },
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'string', default: '' },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'string', default: '' }
},{ collection: 'EvolveMoulding' })
const EvolveMoulding = mongoose.models.EvolveMoulding || mongoose.model("EvolveMoulding", EvolveMouldingSchema);
export default EvolveMoulding;