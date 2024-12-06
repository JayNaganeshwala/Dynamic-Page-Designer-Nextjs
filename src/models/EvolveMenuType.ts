'use strict';
import mongoose from "mongoose";

const EvolveMenuTypeSchema = new mongoose.Schema({
	EvolveMenuType_Type :  { type: 'string', required: true , unique: true , maxlength : 8 },
	EvolveMenuType_Description:  { type: 'string', default: ''},
	EvolveMenuType_Icon:  { type: 'string', default: '' },
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'number', default: 0 },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveMenuType' })
const EvolveMenuType = mongoose.models.EvolveMenuType || mongoose.model("EvolveMenuType", EvolveMenuTypeSchema);
export default EvolveMenuType;