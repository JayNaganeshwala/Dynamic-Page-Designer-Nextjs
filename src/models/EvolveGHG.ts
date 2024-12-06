'use strict';
import mongoose from "mongoose";

const EvolveGHGSchema = new mongoose.Schema({
    name: { type: 'string', required: true },
    title: { type: 'string', required: true },
    status: { type: 'Boolean', default: false },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUnit' },
    isDefault: { type: 'Boolean', default: false },
    scope: [{
        srno: { type: 'string', required: true, unique: true }, // 1, 2, 3
        name: { type: 'string', required: true }, // scope 1, scope 2.... n 
        groups: [{
            title: { type: 'string', required: true },
            code: { type: 'string', required: true, unique: true },
            icon: { type: 'string', required: true },
            desc: { type: 'string', required: true },
            fields: [{
                title: { type: 'string', required: true },
                code: { type: 'string', required: true },
                uom: { type: 'string', required: true }, // M3 , Liter, kg 
                desc: { type: 'string', required: true },
                factor: { type: 'number', required: true },
                isActiveEnergy: { type: 'Boolean', default: false },
                device: { type: 'string'},
            }]
        }],
    }],
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
},{ collection: 'EvolveGHG' })
const EvolveGHG = mongoose.models.EvolveGHG || mongoose.model("EvolveGHG", EvolveGHGSchema);
export default EvolveGHG;