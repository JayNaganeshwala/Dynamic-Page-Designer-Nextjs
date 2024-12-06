'use strict';
import mongoose from "mongoose";

const EvolveGHGReportSchema = new mongoose.Schema({
    month: { type: 'number', required: true },
    year: { type: 'number', required: true },
    GHG_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveGHG' },
    scope: { type: 'string', required: true }, // 1, 2, 3
    co2: { type: 'number', required: true }, // sum of total carbon 
    data: [{
        group: { type: 'string', required: true },
        field: { type: 'string', required: true },
        factor: { type: 'number', required: true },
        value: { type: 'number', required: true },
        uom: { type: 'string', required: true }
    }],

},{ collection: 'EvolveGHGReport' })
const EvolveGHGReport = mongoose.models.EvolveGHGReport || mongoose.model("EvolveGHGReport", EvolveGHGReportSchema);
export default EvolveGHGReport;