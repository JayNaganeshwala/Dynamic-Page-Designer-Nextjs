'use strict';
import mongoose from "mongoose";

const EvolveReasonSchema = new mongoose.Schema({
    EvolveReason_Code: { type: 'string', default: "", unique: true },
    EvolveReason_Desc: { type: 'string', default: ""},
    EvolveReason_Type: { type: 'string', default: ""},
    EvolveCategory_Name: { type: 'string', default: ""},
    EvolveReason_IsActive : { type: 'boolean', default:false},
    createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'number', default: 0 },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'number', default: 0 },

},{ collection: 'EvolveReason' })
// EvolveReason.index({EvolveOtp_ExpiresAt: 1},{expireAfterSeconds: 600},{ collection: 'EvolveComponents' })

const EvolveReason = mongoose.models.EvolveReason || mongoose.model("EvolveReason", EvolveReasonSchema);
export default EvolveReason;