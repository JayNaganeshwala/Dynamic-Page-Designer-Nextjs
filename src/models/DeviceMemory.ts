'use strict';
import mongoose from "mongoose";

const DeviceMemorySchema = new mongoose.Schema({
    deviceCode: { type: 'string' },
    date: { type: Date, default: new Date() },
    memoryObject: { type: 'Object', default: {} },
}, { collection: 'DeviceMemory', timestamps: true });

const DeviceMemory = mongoose.models.DeviceMemory || mongoose.model("DeviceMemory", DeviceMemorySchema);

export default DeviceMemory; 