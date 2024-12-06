'use strict';
import mongoose from "mongoose";

const EvolveMessageSchema = new mongoose.Schema({
	EvolveMessage_Number :  { type: 'number'  },
	EvolveLanguage_Code:  { type: 'string'},
	EvolveMessage_Description:  { type: 'string' },
	EvolveMessage_ShowPosition: {type: 'string'},
	EvolveMessage_Time: {type: 'number'},
	EvolveMessage_IsActive: { type: 'Boolean', default: true, required:true},
	EvolveMessage_Type: {type: 'number'},
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'number', default: 0 },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveMessage' })


const EvolveMessage = mongoose.models.EvolveMessage || mongoose.model("EvolveMessage", EvolveMessageSchema);
export default EvolveMessage;