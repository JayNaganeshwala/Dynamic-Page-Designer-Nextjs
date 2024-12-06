"use strict";
import mongoose from "mongoose";

const EvolveReportsSchema = new mongoose.Schema({
	code: { type: "string", required: true, unique: true },
	name: { type: "string", required: true },
	device: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveDevice", default: null },
	path: { type: "string", required: true },
	is_active: { type: "Boolean", default: true },
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: "string", default: "" },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: "string", default: "" },
},{ collection: 'EvolveReports' })
const EvolveReports = mongoose.models.EvolveReports || mongoose.model("EvolveReports", EvolveReportsSchema);
export default EvolveReports;