"use strict";
import mongoose from "mongoose";

const EvolveDownTimeMasterSchema = new mongoose.Schema({
	deviceCode: { type: "string", required: true },
	reasonCode: { type: "string", required: true },
	reasonType: { type: "string", required: true },
	categoryName: { type: "string", required: true },
	startTime: { type: "Date", required: true },
	endTime: { type: "Date", required: true },
	hourDataDetails: [
		{
			tableName: { type: "string", required: true },
			tableID: [ {ID : { type: mongoose.Schema.Types.ObjectId, required: true } , DownTimeMin : { type: "Number", default : 0 }}]
		},
	],
	monthlyDataDetails: [
		{
			tableName: { type: "string", required: true },
			tableID: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
		},
	],
	monthDataDetails: [
		{
			tableName: { type: "string", required: true },
			tableID: [ {ID : { type: mongoose.Schema.Types.ObjectId, required: true } , SHIFTDATA :[{DownTimeMin : { type: "Number", default : 0 } ,SHIFT : { type: "string", default : 0 }}]}]
		},
	],
	dayDataDetails: [
		{
			tableName: { type: "string", required: true },
			tableID: [ {ID : { type: mongoose.Schema.Types.ObjectId, required: true } , SHIFTDATA :[{DownTimeMin : { type: "Number", default : 0 } ,SHIFT : { type: "string", default : 0 }}]}]
		},
	],
	yearDataDetails: [
		{
			tableName: { type: "string", required: true },
			tableID: [ {ID : { type: mongoose.Schema.Types.ObjectId, required: true } , SHIFTDATA :[{DownTimeMin : { type: "Number", default : 0 } ,SHIFT : { type: "string", default : 0 }}]}]
		},
	],
	shiftDataDetails: [
		{
			tableName: { type: "string", required: true },
			tableID: [ {ID : { type: mongoose.Schema.Types.ObjectId, required: true } , DownTimeMin : { type: "Number", default : 0 }}]
		},
	],
	createdTime: { type: "Date", default: Date.now() },
	updatedTime: { type: "Date", default: Date.now() },
	createdUser: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveUser", default: null },
	updatedUser: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveUser", default: null },
},{ collection: 'EvolveDownTimeMaster' })
// const EvolveDownTimeMaster = new Schema(Evolve.EvolveDownTimeMaster, { collection: "EvolveDownTimeMaster" },{ collection: 'EvolveComponents' })

// EvolveDownTimeMaster.post("findOneAndDelete", function (deletedData) {
// 	try {
// 		let memoryIndex = Evolve.Devices[deletedData.deviceCode].PLANNEDDOWNTIMEARRAY.findIndex(
// 			(obj) => obj._id == deletedData._id
// 		);
// 		if (memoryIndex != -1) Evolve.Devices[deletedData.deviceCode].PLANNEDDOWNTIMEARRAY.splice(index, 1);
// 	} catch (error) {
// 		console.log("Error In Pre Hook while EvolveDownTimeMaster findOneAndDelete: ", error.message);
// 		return new Error("Error Pre Hook findOneAndDelete::" + error.message);
// 	}
// },{ collection: 'EvolveComponents' })


// EvolveDownTimeMaster.pre("findOneAndDelete", async function (next) {
// 	try {
// 		if (this.getQuery()?._id) {
// 			await Evolve.App.Controllers.iotPlatform.OPCUA.ConList.preHookOperationForDelete(this.getQuery());
// 		}
// 		next();
// 	} catch (error) {
// 		console.log("Error In Pre Hook while EvolveDownTimeMaster findOneAndDelete: ", error.message);
// 		return next(new Error("Error Pre Hook findOneAndDelete::" + error.message));
// 	}
// },{ collection: 'EvolveComponents' })

// EvolveDownTimeMaster.pre("deleteOne", async function (next) {
// 	try {
// 		if (this.getQuery()?._id) {
// 			await Evolve.App.Controllers.iotPlatform.OPCUA.ConList.preHookOperationForDelete(this.getQuery());
// 		}
// 		next();
// 	} catch (error) {
// 		console.log("Error In Pre Hook while EvolveDownTimeMaster deleteOne: ", error.message);
// 		return next(new Error("Error Pre Hook deleteOne::" + error.message));
// 	}
// },{ collection: 'EvolveComponents' })

// new mongoose.model("EvolveDownTimeMaster", EvolveDownTimeMaster);

const EvolveDownTimeMaster = mongoose.models.EvolveDownTimeMaster || mongoose.model("EvolveDownTimeMaster", EvolveDownTimeMasterSchema);
export default EvolveDownTimeMaster;