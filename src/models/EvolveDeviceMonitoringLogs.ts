'use strict';
import mongoose from "mongoose";

const EvolveDeviceMonitoringLogsSchema = new mongoose.Schema({
    Data: [
        { 
            ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDevice', required: true },
            Status : { type: 'Boolean', default : 0 },
            LastOnlineTime : { type: 'Date', default: null},
            isUnderrObservation : { type: 'Boolean', default : false },
            EstimetedBackToOnlineTime : { type: 'Date', default: null}
        }
    ],
},{ collection: 'EvolveDeviceMonitoringLogs' })

const EvolveDeviceMonitoringLogs = mongoose.models.EvolveDeviceMonitoringLogs || mongoose.model("EvolveDeviceMonitoringLogs", EvolveDeviceMonitoringLogsSchema);
export default EvolveDeviceMonitoringLogs;