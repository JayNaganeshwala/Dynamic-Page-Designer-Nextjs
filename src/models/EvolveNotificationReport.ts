"use strict";
import mongoose from "mongoose";

const EvolveNotificationReportSchema = new mongoose.Schema({
	transactionId: { type: "string" },
	status: { type: "string", required: true }, // notification status
	message: { type: "string" },
	company: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveCompany", default: null },
	category: { type: "string", required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
},{ collection: 'EvolveNotificationReport' })
const EvolveNotificationReport = mongoose.models.EvolveNotificationReport || mongoose.model("EvolveNotificationReport", EvolveNotificationReportSchema);
export default EvolveNotificationReport;
