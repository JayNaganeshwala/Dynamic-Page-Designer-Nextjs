'use strict';
import mongoose, { mongo } from "mongoose";

 const EvolveComponentsSchema = new mongoose.Schema({
    code: { type: 'string', required: true,unique: true}, // Auto incriment 4 digits code
    path: { type: 'string', required: true}, // /cards/v1  ,unique: true<< Remove for multiuse
    name: { type: 'string',  required:true, unique: true },
    status: { type: 'Boolean', default: true, required:true},
    props: [{
        index: { type: 'number', default: 0  },
        code: { type: 'string', required: true },
        desc: { type: 'string', required: true },
        datatype: { type: 'string', required: true }, // NUMBER | STRING 
        inputtype: { type: 'string', required: true }, // INPUT / SELECT / REDIO 
        value: { type: 'string'  },  // RED | GREEN | BLUE
        default: { type: 'string'}, //  GREEN
        grouptype: { type: 'string', required: true }, // STATIC / DESIGN / DATASOURCE 
        datasource : { type: "object", default: {} },
        options: { type: "string", default: "" }
    }]
},{ collection: 'EvolveComponents' })

const EvolveComponents = mongoose.models.EvolveComponents || mongoose.model("EvolveComponents", EvolveComponentsSchema);
export default EvolveComponents;