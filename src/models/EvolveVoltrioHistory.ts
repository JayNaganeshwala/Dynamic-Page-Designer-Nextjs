'use strict';
import mongoose from "mongoose";

const EvolveVoltrioHistorySchema = new mongoose.Schema({
	"mac_id": { type: 'string', default : "" },
	"timestamp": { type: Date, default: Date.now },
	"slave_id": { type: 'string', default : "" },
	"String 1": { type: 'string', default : "" },
	"String 2": { type: 'string', default : "" },
	"String 3": { type: 'string', default : "" },
	"String 4": { type: 'string', default : "" },
	"String 5": { type: 'string', default : "" },
	"String 6": { type: 'string', default : "" },
	"String 7": { type: 'string', default : "" },
	"String 8": { type: 'string', default : "" },
	"String 9": { type: 'string', default : "" },
	"String 10": { type: 'string', default : "" },
	"String 11": { type: 'string', default : "" },
	"String 12": { type: 'string', default : "" },
	"String 13": { type: 'string', default : "" },
	"String 14": { type: 'string', default : "" },
	"String 15": { type: 'string', default : "" },
	"String 16": { type: 'string', default : "" },
	"Bus Voltage": { type: 'string', default : "" },
	"Internal Temperature": { type: 'string', default : "" },
	"DI Status-1": { type: 'string', default : "" },
	"DI Status-2": { type: 'string', default : "" },
	"DI Status-3": { type: 'string', default : "" },
	"DI Status-4": { type: 'string', default : "" },
	"DI Status-5": { type: 'string', default : "" },
	"DO Status-1": { type: 'string', default : "" },
	"DO Status-2": { type: 'string', default : "" },
	"Solar_Radiation": { type: 'string', default : "" },
	"avg_radiation": { type: 'string', default : "" },
	"expected_generation": { type: 'string', default : "" },
	"Temperature": { type: 'string', default : "" },
},{ collection: 'EvolveVoltrioHistory' })

const EvolveVoltrioHistory = mongoose.models.EvolveVoltrioHistory || mongoose.model("EvolveVoltrioHistory", EvolveVoltrioHistorySchema);
export default EvolveVoltrioHistory;