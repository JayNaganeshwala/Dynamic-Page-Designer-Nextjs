'use strict';
import mongoose, { mongo } from "mongoose";

const EvolveDepartmentSchema = new mongoose.Schema({
	EvolveDepartment_Name: { type: 'string',default:""},
    EvolveDepartment_Code: { type: 'string',default:""},
    EvolveDepartment_ParentCode: { type: 'string',default:""},
    EvolveDepartment_IsVendor: { type: 'Boolean',default:false},
	EvolveLocation_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveLocation'},
	EvolveUnit_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUnit'},
	EvolveDepartment_MenuUrl : { type: 'string'},
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'number', default: 0 },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'number', default: 0 }
},{ collection: 'EvolveDepartment' })
const EvolveDepartment = mongoose.models.EvolveDepartment || mongoose.model("EvolveDepartment", EvolveDepartmentSchema);
export default EvolveDepartment;