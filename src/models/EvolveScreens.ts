'use strict';
import mongoose from "mongoose";

 const EvolveScreensSchema = new mongoose.Schema({
    code: { type: 'string', required: true,unique: true}, // Auto incriment 4 digits code
    name: { type: 'string',  required:true, unique: true },
    desc: { type: 'string',  required:true },
    status: { type: 'Boolean', default: true, required:true},
    layout : { type: 'string',  required:true },
    components : [{
        index: { type: 'number', default: 0  },
        code: { type: 'string', required: true },
        top :  { type: 'number', default: 0  },
        left :  { type: 'number', default: 0  },
        EvolveComponent_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveComponents'},
        EvolveComponentsData_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveComponentsData'},   
    }],
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
},{ collection: 'EvolveScreens' })

const EvolveScreens = mongoose.models.EvolveScreens || mongoose.model("EvolveScreens", EvolveScreensSchema);
export default EvolveScreens;