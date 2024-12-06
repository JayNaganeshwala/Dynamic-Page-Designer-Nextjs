'use strict';
import mongoose from "mongoose";

const EvolveLanguageSchema = new mongoose.Schema({
	code :  { type: 'string', unique: true  },
	desc:  { type: 'string' },
	dir:  { type: 'string' }, // directory 
	status:  { type: 'Boolean', default: true, required:true},
	// createdAt: { type: Date, default: Date.now },
	// createdUser: { type: 'number', default: 0 },
	// updatedAt: { type: Date, default: Date.now },
	// updatedUser: { type: 'number', default: 0 }
},{ collection: 'EvolveLanguage' })


const EvolveLanguage = mongoose.models.EvolveLanguage|| mongoose.model("EvolveLanguage", EvolveLanguageSchema);
export default EvolveLanguage;