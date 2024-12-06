'use strict';
import mongoose from "mongoose";

let EvolveDeviceConfigurationSchema = new mongoose.Schema({
    Name: { type: 'string', required: true },
    deviceMac: { type: 'string', required: true ,unique: true },
    gatewayConfiguration: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveGatewayConfiguration', required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveCompany', required: true },
    firmware: { type: 'string', required: true },
    fw_version: { type: 'string', required: true },
    fw_history: [{ 
        fw_version: { type: 'string'},
        firmware: { type: 'string' },
        date: { type: Date, default: Date.now },
     }],
    configuration_updated: [{ 
        key: { type: 'string' },
        // cgroup: { type: 'string' },
        // gtype: { type: 'string' },
        // params: { type: 'string' },
        DeviceValue: { type: 'string'},
        gatewayValue: { type: 'string' },
        date: { type: Date, default: Date.now },
     }],
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'number', default: 0 },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveDeviceConfiguration' })


const EvolveDeviceConfiguration = mongoose.models.EvolveDeviceConfiguration || mongoose.model("EvolveDeviceConfiguration", EvolveDeviceConfigurationSchema);

export default EvolveDeviceConfiguration;