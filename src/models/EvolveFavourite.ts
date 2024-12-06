'use strict';
import mongoose from "mongoose";

const EvolveFavouriteSchema = new mongoose.Schema({
	EvolveUser_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
	EvolveMenu_SrNo: { type: 'string', default: '' },
	EvolveFavourite_Status: { type: 'Boolean', default: true },
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'number', default: 0 },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'number', default: 0 }
},{ collection: 'EvolveFavourite' })

const EvolveFavourite = mongoose.models.EvolveFavourite || mongoose.model("EvolveFavourite", EvolveFavouriteSchema);
export default EvolveFavourite;