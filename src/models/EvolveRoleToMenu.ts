'use strict';
import mongoose from "mongoose";

const EvolveRoleToMenuSchema = new mongoose.Schema({
	EvolveRole_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveRole' },
	EvolveMenu_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveMenu' },
	EvolveApp_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveApp' },
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'number', default: 0 },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveRoleToMenu' })
const EvolveRoleToMenu = mongoose.models.EvolveRoleToMenu || mongoose.model("EvolveRoleToMenu", EvolveRoleToMenuSchema);
export default EvolveRoleToMenu;