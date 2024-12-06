'use strict';
import mongoose from "mongoose";

const EvolveDesignSchema = new mongoose.Schema({

    EvolveDesign_Code: { type: 'string', required: true, unique: true },
    EvolveDesign_Name: {type: 'string', required: true},
    EvolveDesign_Desc: { type: 'string', required: true },
    EvolveDesign_IsActive: { type: 'Boolean', default: true, required:true},
    EvolveTool: [{
        EvolveTool_ID : { type: mongoose.Schema.Types.ObjectId, ref:"EvolveTool"},
    }],


    createdAt: { type: Date, default: Date.now },
    createdUser: { type: mongoose.Schema.Types.ObjectId, default: null },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'string', default: '' },
},{ collection: 'EvolveDesign' })

const EvolveDesign = mongoose.models.EvolveDesign || mongoose.model("EvolveDesign", EvolveDesignSchema);
export default EvolveDesign;