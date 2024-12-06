'use strict';
import mongoose from "mongoose";

const EvolveDeviceHealthStatusSchema = new mongoose.Schema({
    Date: { type: Date, default: Date.now },
    macID: { type: 'string', required: true },
    Data:{},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},{ collection: 'EvolveDeviceHealthStatus' })
const EvolveDeviceHealthStatus = mongoose.models.EvolveDeviceHealthStatus || mongoose.model("EvolveDeviceHealthStatus", EvolveDeviceHealthStatusSchema);
export default EvolveDeviceHealthStatus;