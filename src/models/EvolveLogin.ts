'use strict';
import mongoose from "mongoose";

const EvolveLoginSchema = new mongoose.Schema({
	EvolveLogin_InTime: { type: Date, default: Date.now },
	EvolveLogin_OutTime: { type: Date, default: '' },
	EvolveUser_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
	EvolveLogin_IP: { type: 'string', default: '' },
	EvolveLogin_Device: { type: 'string', default: '' },
	EvolveLogin_Mac: { type: 'string', default: '' }
},{ collection: 'EvolveLogin' })

const EvolveLogin = mongoose.models.EvolveLogin || mongoose.model("EvolveLogin", EvolveLoginSchema);
export default EvolveLogin;