'use strict';
import mongoose from "mongoose";

const EvolveConfigSchema = new mongoose.Schema({
    EvolveConfig_Key: { type: 'string', required: true },
    EvolveConfig_Value: { type: 'string', required: true },
    EvolveConfig_Desc: { type: 'string', required: true },
    EvolveConfig_Type: { type: 'string', required: true },
    EvolveConfig_IsActive: { type: 'Boolean', default: true, required:true},
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'number', default: 0 },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveConfig' })


const EvolveConfig = mongoose.models.EvolveConfig || mongoose.model("EvolveConfig", EvolveConfigSchema);
export default EvolveConfig;