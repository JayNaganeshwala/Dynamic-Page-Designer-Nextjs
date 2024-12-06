'use strict';
import mongoose from "mongoose";


const EvolveBotTriggerSchema = new mongoose.Schema({
    EvolveBot_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveBot' },
    EvolveBotTrigger_Name: { type: 'String', required: true },
    EvolveBotTrigger_Code: { type: 'String', required: true },
    EvolveBotTrigger_Timezone: { type: 'String' },
    EvolveBotTrigger_ScheduleOperator: { type: 'String' },// DAYS, Date,DAYOFWEEK
    EvolveBotTrigger_ScheduleValue: { type: 'String' },
    EvolveBotTrigger_Hour: { type: 'Number' },
    EvolveBotTrigger_Minute: { type: 'Number' },
    EvolveBotTrigger_PersonDetails: [
        {
            name: { type: "string", required: true },
            email: { type: "string", required: true },
            emailTemplate: { type: "string", required: true },
            user: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveUser", default: null },
            status: { type: "boolean", default: false, required: true },
            notification: { type: "boolean", default: false, required: true }
        },
    ],
    EvolveBotTrigger_BotSetting: { type: 'Object' },
    EvolveBotTrigger_Status: { type: 'Boolean' },
    EvolveBotTrigger_LastTriggeredTime: { type: 'Date' },
    createdUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    updatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    createdAt: { type: 'Date', default: Date.now },
    updatedAt: { type: 'Date', default: Date.now },
},{ collection: 'EvolveBotTrigger' })
const EvolveBotTrigger = mongoose.models.EvolveBotTrigger || mongoose.model("EvolveBotTrigger", EvolveBotTriggerSchema)
export default EvolveBotTrigger;