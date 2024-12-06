'use strict';
import mongoose from "mongoose";

const EvolveLoginFailedAttemptsSchema = new mongoose.Schema({
	EvolveLoginFailedAttempts_Time: { type: Date, default: Date.now },
	EvolveLoginFailedAttempts_UserID: { type: 'string', default: '' },
	EvolveLoginFailedAttempts_IP: { type: 'string', default: '' },
	EvolveLoginFailedAttempts_Device: { type: 'string', default: '' },
	EvolveLoginFailedAttempts_Mac: { type: 'string', default: '' }
},{ collection: 'EvolveLoginFailedAttempts' })

const EvolveLoginFailedAttempts = mongoose.models.EvolveLoginFailedAttempts || mongoose.model("EvolveLoginFailedAttempts", EvolveLoginFailedAttemptsSchema);
export default EvolveLoginFailedAttempts;