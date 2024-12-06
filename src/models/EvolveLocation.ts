'use strict';
import mongoose from "mongoose";

const EvolveLocationSchema = new mongoose.Schema({
    EvolveLocation_Code: { type: 'string', required: true },
    EvolveLocation_Desc: { type: 'string', required: true },
    EvolveLocation_IsERP: { type: 'Boolean', required: true, default: true },
    EvolveERPLocation_Code: { type: 'string', default:"NA"},
    EvolveLocation_Status: { type: 'string'},
    EvolveLocation_Type: {type: 'string'},
    EvolveLocation_IsActive:{ type: 'Boolean', default: true, required:true},
    EvolveUnit_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUnit' },
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'number', default: 0 },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveLocation' })

const EvolveLocation = mongoose.models.EvolveLocation || mongoose.model("EvolveLocation", EvolveLocationSchema);
export default EvolveLocation;