'use strict';
import mongoose from "mongoose";

const EvolveBotIOSchema = new mongoose.Schema({
    EvolveBot_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveBot' },
    EvolveBotIO_Status: { type: 'String' },
    EvolveBotIO_Message: { type: 'Object' },
    EvolveBotIO_NotificationStatus: { type: 'Boolean' },
    EvolveBotIO_NotificationResponse: { type: 'String' },
    EvolveBotIO_Response: [{
        type: 'Object',
        default: {}
    }],
    EvolveTrigger_ID: { type: mongoose.Types.ObjectId, ref: 'EvolveBotTrigger' },
    createdUser: { type: mongoose.Types.ObjectId, ref: 'EvolveUser' },
    updatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    createdAt: { type: 'Date', default: Date.now },
    updatedAt: { type: 'Date', default: Date.now },
},{ collection: 'EvolveBotIO' })
const EvolveBotIO = mongoose.models.EvolveBotIO || mongoose.model("EvolveBotIO", EvolveBotIOSchema);
export default EvolveBotIO;