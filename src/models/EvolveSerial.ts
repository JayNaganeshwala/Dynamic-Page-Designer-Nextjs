'use strict';
import mongoose from "mongoose";

const EvolveSerialSchema = new mongoose.Schema({
	EvolveSerial_Code: { type: 'string', required: true },
    EvolveSerial_Prefix: { type: 'string', required: true },
    EvolveSerial_Start: { type: 'number', required: true },
    EvolveSerial_Next: { type: 'number', required: true },
    EvolveSerial_Width: { type: 'number', required: true },
    EvolveSerial_Reset: { type: 'string', required: true },
    EvolveUnit_ID: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUnit' }
    ],
    EvolveSerial_LastGeneratedCode: { type: 'string', required: true },
    EvolveSerial_IsActive: { type: 'Boolean', default: true },
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'string', default: '' },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'string', default: '' },
},{ collection: 'EvolveSerial' })
const EvolveSerial = mongoose.models.EvolveSerial || mongoose.model("EvolveSerial", EvolveSerialSchema);
export default EvolveSerial;