'use strict';
import mongoose from "mongoose";

const EvolveRoleSchema = new mongoose.Schema({
	EvolveRole_Code:  { type: 'string', required: true , unique: true , maxlength : 8 },
	EvolveRole_Name :  { type: 'string', required: true, maxlength : 18 },
	EvolveRole_Description:  { type: 'string'},
	EvolveRole_IsActive:  { type: 'Boolean', default: true, required:true},
	// EvolveRole_DefaultMenu_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveMenu' },
	EvolveRoleMenuData: [
		{
			// EvolveMenu_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveMenu' },
			EvolveMenu_SrNo : { type: 'string' },

		}
	],
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'number', default: 0 },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveRole' })
const EvolveRole = mongoose.models.EvolveRole || mongoose.model("EvolveRole", EvolveRoleSchema);
export default EvolveRole;
