'use strict';
import mongoose from "mongoose";

const EvolveBotSchema =  new mongoose.Schema({
    EvolveBot_Name: { type: 'String', required: true },
    EvolveCompany_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveCompany' },
    EvolveBot_Code: { type: 'String', required: true },
    EvolveBot_Status: { type: 'Boolean' },
    EvolveBot_CustomFunction: { type: 'String' },
    EvolveBot_LastTriggeredTime: { type: 'Date' },
    EvolveBot_Attribute: { type: 'Object' },
    EvolveBot_ConfigData: { type: 'Object' },
    EvolveBot_ApiConfig: { type: 'Object' },
    createdUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    updatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    createdAt: { type: 'Date', default: Date.now },
    updatedAt: { type: 'Date', default: Date.now },
},{ collection: 'EvolveBot' })
const EvolveBot = mongoose.models.EvolveBot || mongoose.model("EvolveBot", EvolveBotSchema);
export default EvolveBot;