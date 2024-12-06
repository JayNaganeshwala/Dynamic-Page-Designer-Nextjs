'use strict';
import mongoose from "mongoose";

const EvolveDeviceActivityLogsSchema = new mongoose.Schema({
    macID: { type: 'string', required: true },
    log: { type: 'Object', default: {}, required: true },
    date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'number', default: 0 },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveDeviceActivityLogs' })

const EvolveDeviceActivityLogs = mongoose.models.EvolveDeviceActivityLogs || mongoose.model("EvolveDeviceActivityLogs", EvolveDeviceActivityLogsSchema);
export default EvolveDeviceActivityLogs;