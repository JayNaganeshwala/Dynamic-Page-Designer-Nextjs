"use strict";
import mongoose from "mongoose";
const EvolveDeviceSchema = {
	ts: { type: Date, required: true, default: Date.now },
	data: { type: "object", require: true },
	// status: { type: 'number', required: true, default: 0 },
	date: { type: Date, default: Date.now },
	// createdAt: { type: Date, default: Date.now },
	createdUser: { type: new mongoose.Types.ObjectId, ref: "EvolveUser", default: null },
	updatedUser: { type: new mongoose.Types.ObjectId, ref: "EvolveUser", default: null },
};
