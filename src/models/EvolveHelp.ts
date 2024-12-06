'use strict';
import mongoose from "mongoose";

const EvolveHelpSchema = new mongoose.Schema({

    EvovleHelp_MasterTag: { type: 'string', required: true },
    EvovleHelp_FildName: { type: 'string', maxlength: 50 },
    EvovleHelp_Help: { type: 'string', default: '' },
    EvovleHelp_Tooltip: { type: 'string', required: true, default: '' },
    EvovleHelp_IsActive:  { type: 'Boolean', default: true, required:true},
    EvolveLanguage_ID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'EvolveLanguage' },
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'number', default: 0 },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveHelp' })
const EvolveHelp = mongoose.models.EvolveHelp || mongoose.model("EvolveHelp", EvolveHelpSchema);
export default EvolveHelp;