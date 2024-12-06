'use strict';
import mongoose from "mongoose";

const EvolveStateSchema = new mongoose.Schema({
	EvolveState_Code: { type: 'string', required: true  , unique: true},
	EvolveState_Desc: { type: 'string', default: '' },
	EvolveState_IsActive: { type: 'Boolean', default: true, required:true},
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'string', default: '' },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'string', default: '' },
},{ collection: 'EvolveState' })

const EvolveState = mongoose.models.EvolveState || mongoose.model("EvolveState", EvolveStateSchema);
export default EvolveState;