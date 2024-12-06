'use strict';
import mongoose from "mongoose";

const EvolveGenCodeSchema = new mongoose.Schema({
	EvolveGenCode_Code: { type: 'string', required: true  , maxlength : 15 },
	EvolveGenCode_Value: { type: 'string'},
	EvolveGenCode_Desc: { type: 'string', default: ''},
	EvolveGenCode_IsActive:  { type: 'Boolean', default: true, required:true},
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'string', default: '' },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'string', default: '' },
},{collection: 'EvolveGenCode'})

const EvolveGenCode = mongoose.models.EvolveGenCode || mongoose.model("EvolveGenCode", EvolveGenCodeSchema);
export default EvolveGenCode;