'use strict';
import mongoose from "mongoose";

const EvolveCompanySchema= new mongoose.Schema({
    // businessgroup: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveBusinessGroup' },
    name: { type: 'string' },
    // address: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveAddress' },
    code: { type: 'string', required: true, unique: true, maxlength: 8 },
    status: { type: 'Boolean', default: true, required: true },
    shifttemplate_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ShiftTemplate' }
    // EvolveCompany_LocalisationCode: { type: 'string' },
    // EvolveCompany_Description: { type: 'string' },
    // EvolveCompany_MachineIp: { type: 'string' },
    // createdAt: { type: Date, default: Date.now },
    // createdUser: { type: 'number', default: 0 },
    // updatedAt: { type: Date, default: Date.now },
    // updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveCompany' })

const EvolveCompany = mongoose.models.EvolveCompany || mongoose.model("EvolveCompany", EvolveCompanySchema);
export default EvolveCompany;