'use strict';
import mongoose from "mongoose";

const EvolveDeviceTypeSchema = new mongoose.Schema({
    code: { type: 'string', required: true },
    name: { type: 'string', required: true },
    image: { type: 'string', required: true },
    status: { type: 'Boolean', required: true, default: true },
    attribute: { type: 'object', default: {} },
    firmware: { type: 'string', required: true, default: 'NA' },
    version: { type: 'string', required: true, default: '0.0.0.0' },
    // EvolveDeviceType_History: [{
    //     EvolveDeviceType_ActionAt: { type: 'string' },
    //     EvolveDeviceType_ActionBy: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    //     EvolveDeviceType_ActionType: { type: 'string' },
    //     EvolveDeviceType_ActionDataFilePath: { type: 'string' }
    // }],
    // createdAt: { type: Date, default: Date.now },
    // createdUser: { type: 'number', default: 0 },
    // updatedAt: { type: Date, default: Date.now },
    // updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveDeviceType' })
const EvolveDeviceType = mongoose.models.EvolveDeviceType || mongoose.model("EvolveDeviceType", EvolveDeviceTypeSchema);
export default EvolveDeviceType;