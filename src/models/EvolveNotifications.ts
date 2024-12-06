"use strict";
import mongoose from "mongoose";

const EvolveNotificationsSchema = new mongoose.Schema({
	type: { type: "string", required: true },
	message: { type: "string", required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveUser", default: null }, // useId
	status: { type: "boolean", default: false}, // notification status
	actiontype: { type: "string", default: '' },  // redirect || meesage
	actionvalue: { type: "string", default: '' },  
	customfunction: { type: "string"},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
},{collection: "EvolveNotifications"})

const EvolveNotifications = mongoose.models.EvolveNotifications || mongoose.model("EvolveNotifications", EvolveNotificationsSchema);
export default EvolveNotifications;