"use strict";
import globalVariableCls from "@/lib/globalVariable";
import mongoose from "mongoose";


let DevasEnergyMeterConnectionSchema = new mongoose.Schema({
	code: { type: "string", required: true, unique: true },
	name: { type: "string", default: "" },
	children: [
		{
			code: { type: "string", required: true, unique: true },
			name: { type: "string", default: "" },
			dcode: { type: "string", default: "" },
			deviceid: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveDevice", default: null },
			issummable: { type: "Boolean", default: false },
			children: [
				{
					code: { type: "string", required: true, unique: true },
					name: { type: "string", default: "" },
					dcode: { type: "string", default: "" },
					deviceid: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveDevice", default: null },
					issummable: { type: "Boolean", default: false },
					children: [
						{
							code: { type: "string", required: true, unique: true },
							name: { type: "string", default: "" },
							dcode: { type: "string", default: "" },
							deviceid: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveDevice", default: null },
						},
					],
				},
			],
		},
	],
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: "string", default: "" },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: "string", default: "" },
},{ collection: 'DevasEnergyMeterConnection' })
let DevasEnergyMeterConnection = mongoose.models.DevasEnergyMeterConnection || mongoose.model("DevasEnergyMeterConnection", DevasEnergyMeterConnectionSchema);

// DevasEnergyMeterConnection.pre("findOneAndDelete", async function (next) {
// 	try {
// 		if (this.getQuery()?._id) {
// 			let { code } = await new mongoose.model("DevasEnergyMeterConnection")
// 				.findOne(this.getQuery())
// 				.select("code");
// 			if (code.toLowerCase() == "default") {
// 				return next(new Error("Default data cannot be deleted.."));
// 			}
// 		}
// 		return next();
// 	} catch (error) {
// 		console.log("Error In Pre Hook while DevasEnergyMeterConnection  findOneAndDelete: ", error.message);
// 		return next(new Error("Error Pre Hook findOneAndDelete::" + error.message));
// 	}
// })

// DevasEnergyMeterConnection.pre("updateOne", async function (next) {
// 	try {
// 		if (this.getQuery()?._id) {
// 			let { code } = await new mongoose.model("DevasEnergyMeterConnection")
// 				.findOne(this.getQuery())
// 				.select("code");
// 			if (code.toLowerCase() == "default") {
// 				return next(new Error("Default data cannot be updated.."));
// 			}
// 		}
// 		return next();
// 	} catch (error) {
// 		console.log("Error In Pre Hook while DevasEnergyMeterConnection  updateOne: ", error.message);
// 		return next(new Error("Error Pre Hook updateOne:" + error.message));
// 	}
// },{ collection: 'EvolveComponents' })


export default DevasEnergyMeterConnection; 
