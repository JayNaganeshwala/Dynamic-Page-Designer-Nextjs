'use strict';
import mongoose from "mongoose";

const EvolveTriggerHistorySchema = new mongoose.Schema({
    EvolveTriggerName: { type: 'string', required: true, default: '' },
    EvolveDeviceCode: { type: 'string', default: '', required: true },
    EvolveDeviceMac: { type: 'string', default: '', required: true },
    TriggerStatus: { type: 'string', default: '' },
    ErrorCode: { type: 'string', default: '' },
    NotificationType: { type: 'string', required: true },
    name: { type: 'string', default:''},
    email: { type: 'string', default:''},
    mobile: { type: 'string', default:''},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveUser", default: null },
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'string', default: '' },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'string', default: '' }
},{ collection: 'EvolveTriggerHistory' })

const EvolveTriggerHistory = mongoose.models.EvolveTriggerHistory || mongoose.model("EvolveTriggerHistory", EvolveTriggerHistorySchema);
export default EvolveTriggerHistory;