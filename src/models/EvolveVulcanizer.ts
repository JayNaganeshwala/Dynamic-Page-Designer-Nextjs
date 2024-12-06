'use strict';
import mongoose from "mongoose";

const EvolveVulcanizerSchema = new mongoose.Schema({
    EvolveMachine_Name: { type: 'string', default: '' },
    Cycle_Complet_Count: { type: 'Number', default:0 },
    DATE: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'string', default: '' },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'string', default: '' },
},{ collection: 'EvolveVulcanizer' })

const EvolveVulcanizer = mongoose.models.EvolveVulcanizer || mongoose.model("EvolveVulcanizer", EvolveVulcanizerSchema);
export default EvolveVulcanizer;