'use strict';
import mongoose from "mongoose";


const IOTSchema = new mongoose.Schema({
	name: { type: 'string', required: true },
	code: { type: 'string', default: 'abc' },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },

}, { collection: 'IOT' })


const IOT = mongoose.models.IOT || mongoose.model("IOT", IOTSchema);
export default IOT;