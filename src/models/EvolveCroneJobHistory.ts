'use strict';
import mongoose from "mongoose";

const EvolveCroneJobHistorySchema = new mongoose.Schema({
    EvolveCroneJob_Code: { type: 'string', required: true,  },
    EvolveCroneJobHistory_Date: { type: Date, default: Date.now  },
    EvolveCroneJobResponse: {},
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'number', default: 0 },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveCroneJobHistory' })
const EvolveCroneJobHistory = mongoose.models.EvolveCroneJobHistory || mongoose.model("EvolveCroneJobHistory", EvolveCroneJobHistorySchema);
export default EvolveCroneJobHistory;