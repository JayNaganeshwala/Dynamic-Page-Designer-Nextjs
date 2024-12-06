'use strict';
import mongoose from "mongoose";

const EvolveDeviceLogsSchema = new mongoose.Schema({
    ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDevice', required: true },
    Data: {},
},{ collection: 'EvolveDeviceLogs' })

const EvolveDeviceLogs = mongoose.models.EvolveDeviceLogs || mongoose.model("EvolveDeviceLogs", EvolveDeviceLogsSchema)
export default EvolveDeviceLogs;

