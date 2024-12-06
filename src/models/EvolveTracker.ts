'use strict';
import mongoose from "mongoose";

const EvolveTrackerSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
	ts: { type: Date, default: Date.now },
	path: { type: 'string', default: '' },
	name: { type: 'string', default: '' },
},{ collection: 'EvolveTracker' })


const EvolveTracker = mongoose.models.EvolveTracker || mongoose.model("EvolveTracker", EvolveTrackerSchema);
export default EvolveTracker;