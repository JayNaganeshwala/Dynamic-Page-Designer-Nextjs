'use strict';
import mongoose from "mongoose";

const EvolveUserUnitLinkSchema = new mongoose.Schema({
	EvolveUser_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
	EvolveUnit_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUnit' },
	EvolveRole_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveRole' },
	EvolveUserUnitLink_IsActive: {type: 'Boolean'},
	EvolveUserUnitLink_MachineIp: {type: 'string'},
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'number', default: 0 },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveUserUnitLink' })

const EvolveUserUnitLink = mongoose.models.EvolveUserUnitLink || mongoose.model("EvolveUserUnitLink", EvolveUserUnitLinkSchema);
export default EvolveUserUnitLink;