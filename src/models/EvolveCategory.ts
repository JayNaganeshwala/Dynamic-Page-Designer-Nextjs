'use strict';
import mongoose from "mongoose";

const EvolveCategorySchema = new mongoose.Schema({
    EvolveCategory_Name: { type: 'string', default: ""},
    EvolveCategory_Desc: { type: 'string', default: ""},
    EvolveCategory_IsActive : { type: 'boolean', default:false},
    createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'number', default: 0 },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'number', default: 0 },

},{ collection: 'EvolveCategory' })

const EvolveCategory = mongoose.models.EvolveCategory || mongoose.model("EvolveCategory", EvolveCategorySchema);
// EvolveCategory.index({EvolveOtp_ExpiresAt: 1},{expireAfterSeconds: 600},{ collection: 'EvolveComponents' })
export default EvolveCategory;