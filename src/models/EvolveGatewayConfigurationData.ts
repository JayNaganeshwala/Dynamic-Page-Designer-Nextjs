"use strict";
import mongoose from "mongoose";

const EvolveGatewayConfigurationDataSchema = new mongoose.Schema({
	EvolveGatewayConfiguration_ID: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveGatewayConfiguration" },
	EvolveDeviceConfiguration_ID: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveDeviceConfiguration" },
	cgroup: { type: "string", required: true },
	gtype: { type: "string", required: true },
	params: { type: "string", required: true },
	value: { type: "string", required: true },
},{ collection: 'EvolveGatewayConfigurationData' })

const EvolveGatewayConfigurationData = mongoose.models.EvolveGatewayConfigurationData || mongoose.model("EvolveGatewayConfigurationData", EvolveGatewayConfigurationDataSchema);
export default EvolveGatewayConfigurationData;