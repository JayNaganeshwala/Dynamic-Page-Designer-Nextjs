"use strict";
import mongoose from "mongoose";

const EvolveDeviceTriggerSchema = new mongoose.Schema({
	name: { type: "string", required: true },
	device: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveDevice", default: null },
	deviceOffline: { type: "boolean", default: false, required: true },
	status: { type: "boolean", default: true},
	triggerTimeOut: { type: "string", default: '' },
	triggerTimeOutClear: { type: "string", default: '' },
	customfunction: { type: "string", default: '' },
	matchcase: [
		{
			field: { type: "string" },
			operator: { type: "string"}, // LT,GT,EQ,NEQ,LTE,GTE
			value: { type: "string"},
			status: { type: "boolean", default: false },
		},
	],
	timezone: { type: "string", required: true },
	schedule: [
		{
			code: { type: "string", required: true }, // ALLDAYS, RANGE
			start: { type: "string" }, // 24 hours
			end: { type: "string" }, // 24 hours
			days: { type: Array }, //  MON, TUE ...
			status: { type: "boolean", default: false, required: true },
		},
	],
	person: [
		{
			name: { type: "string", required: true },
			email: { type: "string", required: true },
			emailTemplate: {type: "string", required: true},
			mobile: { type: "string", required: true },
			user: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveUser", default: null },
			status: { type: "boolean", default: false, required: true },
			notification: { type: Array }, // EMAIL,SMS,CALL,PUSH,ENOTE
		},
	],
	devicenotifications: [
		{
			name: { type: "string", required: true }, // notification identification name
			device: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveDevice", default: null },
			json: { type: "string", required: true },
			status: { type: "boolean", default: false, required: true },
		},
	],

},{ collection: 'EvolveDeviceTrigger' })

const EvolveDeviceTrigger = mongoose.models.EvolveDeviceTrigger || mongoose.model("EvolveDeviceTrigger", EvolveDeviceTriggerSchema);
export default EvolveDeviceTrigger;