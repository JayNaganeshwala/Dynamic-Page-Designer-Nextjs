'use strict';
import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
    code: { type: 'string', required: true, unique: true },
    name: { type: 'string', default: '', unique: true },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUnit' },
    shifttemplate_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ShiftTemplate' }
},{ collection: 'Department' })

const Department = mongoose.models.Department || mongoose.model("Department", DepartmentSchema);

export default Department; 