'use strict';
import mongoose from "mongoose";

const EvolveUnitSchema = new mongoose.Schema({
	company: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveCompany' },
	code: { type: 'string', required: true, unique: true, maxlength: 8 },
	name: { type: 'string', require: true },
	desc: { type: 'string' },
	//Port: {type: 'string'},
	status: { type: 'Boolean', default: true, required: true },
	address: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveAddress' },
	shifttemplate_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ShiftTemplate' }
	// MachineIp: {type: 'string'},
	// Gstin: {type: 'string'},
	// GstnUser: {type: 'string'},
	// GstnPass: {type: 'string'},
	// GstnPassEnc: {type: 'string'},
	// Rek: {type: 'string'},
	// MachingField: {type: 'string'},
	// createdAt: { type: Date, default: Date.now },
	// createdUser: { type: 'number', default: 0 },
	// updatedAt: { type: Date, default: Date.now },
	// updatedUser: { type: 'number', default: 0 },
},{collection:"EvolveUnit"})

const EvolveUnit = mongoose.models.EvolveUnit || mongoose.model("EvolveUnit", EvolveUnitSchema);
export default EvolveUnit;