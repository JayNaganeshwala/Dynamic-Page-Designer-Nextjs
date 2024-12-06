'use strict';
import mongoose from "mongoose";

const EvolveEmailTemplateSchema = new mongoose.Schema({
	EvolveEmailTemplate_Code: { type: 'string', required: true, unique: true},
    EvolveEmailTemplate_Subject: { type: 'string', required: true},
    EvolveEmailTemplate_Body: { type: 'string', required: true},
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'string', default: '' },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'string', default: '' },
},{ collection: 'EvolveEmailTemplate' })


const EvolveEmailTemplate = mongoose.models.EvolveEmailTemplate || mongoose.model("EvolveEmailTemplate", EvolveEmailTemplateSchema);
export default EvolveEmailTemplate;