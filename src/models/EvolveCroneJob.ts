'use strict';
import mongoose from "mongoose";

const EvolveCroneJobSchema = new mongoose.Schema({
    EvolveCroneJob_Code: { type: 'string', required: true, unique: true },
    EvolveCroneJob_FunctionPath: { type: 'string', default: '' },
    EvolveCroneJob_IsActive: { type: 'Boolean', default: true, required:true},
    EvolveCroneJob_UnitID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUnit' , default:null},
    EvolveCroneJob_Hours: { type: 'string', default: '' },
    EvolveCroneJob_Minutes: { type: 'string', default: '' },
    EvolveCroneJob_Seconds: { type: 'string', default: '' },
    EvolveCroneJob_DateRange: { type: 'string', default: '' },
    EvolveCroneJob_WeekOffDay: [],
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'number', default: 0 },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveCroneJob' })
const EvolveCroneJob = mongoose.models.EvolveCroneJob || mongoose.model("EvolveCroneJob", EvolveCroneJobSchema);
export default EvolveCroneJob;