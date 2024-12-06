'use strict';
import mongoose from "mongoose";

const EvolveCountrySchema = new mongoose.Schema({
	EvolveCountry_Code: { type: 'string', required: true  , unique: true},
	EvolveCountry_Desc: { type: 'string', default: '' },
	EvolveCountry_IsActive: { type: 'Boolean', default: true, required:true},
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'string', default: '' },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'string', default: '' },
},{ collection: 'EvolveCountry' })

const EvolveCountry = mongoose.models.EvolveCountry || mongoose.model("EvolveCountry", EvolveCountrySchema);
export default EvolveCountry;