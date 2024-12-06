'use strict';
import mongoose from "mongoose";

 const EvolveComponentsDataSchema = new mongoose.Schema({
    code: { type: 'string', required: true,unique: true}, // Auto incriment 4 digits code
    name: { type: 'string', required: true },
    status: { type: 'Boolean', default: true, required:true},
    EvolveComponent_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveComponents'},
    props: [{
        code: { type: 'string', required: true },
        value: { type: 'string' },
        type: { type: 'string', required: true }, // STATIC / DESIGN / DATASOURCE 
        sourcetype: { type: 'string', default: "" },
        datasource: { type: "object", default: {} },
        inputtype: { type: 'string' },
        grouptype: { type: 'string' },
    }],
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
},{ collection: 'EvolveComponentsData' })
const EvolveComponentsData = mongoose.models.EvolveComponentsData || mongoose.model("EvolveComponentsData", EvolveComponentsDataSchema);
export default EvolveComponentsData;