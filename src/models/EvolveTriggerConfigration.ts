'use strict';
import mongoose from "mongoose";

const EvolveTriggerConfigrationSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveCompany' },
	type: { type: 'string', required: true },
	authtoken: { type: 'string', required: true },
    authsid: { type: 'string', required: true },
    fromNo: { type: 'string', required: true },
    remarks: { type: 'string' },
	
},{collection:"EvolveTriggerConfigration"})
const EvolveTriggerConfigration = mongoose.models.EvolveTriggerConfigration || mongoose.model("EvolveTriggerConfigration", EvolveTriggerConfigrationSchema);
export default EvolveTriggerConfigration;