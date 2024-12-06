'use strict';
import mongoose from "mongoose";

const EvolveShiftSchema = new mongoose.Schema({
    EvolveShift_Code: { type: 'string', required: true },
    EvolveShift_Name: { type: 'string', default: '' },
    EvolveShift_StartTime: { type: 'string', default: '' },
    EvolveShift_EndTime: { type: 'string', default: '' },
    EvolveUnit_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUnit' },
    EvolveShift_WeekOffDay: { type: 'array', default: [] },
    EvolveShift_IsActive: { type: 'Boolean', default: true, required:true},
    EvolveShift_Sequence: { type: 'Number',required:true},  
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'string', default: '' },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'string', default: '' },
},{ collection: 'EvolveShift' })
const EvolveShift = mongoose.models.EvolveShift || mongoose.model("EvolveShift", EvolveShiftSchema);
export default EvolveShift;