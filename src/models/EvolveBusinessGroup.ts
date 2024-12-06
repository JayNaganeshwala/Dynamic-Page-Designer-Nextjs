'use strict';
import mongoose from "mongoose";

const EvolveBusinessGroupSchema = new mongoose.Schema({
	EvolveAddress_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveAddress' },//dropdown
	EvolveCurrency_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveCurrency' },
	EvolveBusinessGroup_Domain: { type: 'string', required: true , unique: true , maxlength : 8 },
	EvolveBusinessGroup_Name: { type: 'string',required: true, maxlength : 18 },
	EvolveBusinessGroup_Type: { type: 'string', default: '' },
	EvolveBusinessGroup_SearchName: { type: 'string', default: '' },
	EvolveBusinessGroup_Db: { type: 'string', default: '' },
	EvolveBusinessGroup_IsActive: { type: 'Boolean', default: true, required:true},//check box
	EvolveBusinessGroup_DataCpg: { type: 'string', default: '' },
	EvolveBusinessGroup_ExptIst: { type: 'string', default: '' },
	EvolveBusinessGroup_TzDb: { type: 'string', default: '' },
	EvolveBusinessGroup_ProPath: { type: 'string', default: '' },
	EvolveBusinessGroup_MachineIp: { type: 'string', default: '' },
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'string', default: '' },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'string', default: '' },
},{ collection: 'EvolveBusinessGroup' })

const EvolveBusinessGroup = mongoose.models.EvolveBusinessGroup || mongoose.model("EvolveBusinessGroup", EvolveBusinessGroupSchema);
export default EvolveBusinessGroup;
