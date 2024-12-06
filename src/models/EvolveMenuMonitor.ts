'use strict';
import mongoose from "mongoose";

const EvolveMenuMonitorSchema = new mongoose.Schema({
    EvolveUser_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    EvolveMenu_SrNo: { type: 'string', default: '' },
    EvolveMenu_Url: { type: 'string', default: '' },
    EvolveMenuMonitor_Ip: { type: 'string', default: '' },
    EvolveMenuMonitor_Device: { type: 'string', default: '' },
    EvolveMenuMonitor_InTime: { type: Date, default: Date.now },
    EvolveMenuMonitor_OutTime: { type: Date }
},{ collection: 'EvolveMenuMonitor' })


const EvolveMenuMonitor = mongoose.models.EvolveMenuMonitor || mongoose.model("EvolveMenuMonitor", EvolveMenuMonitorSchema);
export default EvolveMenuMonitor;