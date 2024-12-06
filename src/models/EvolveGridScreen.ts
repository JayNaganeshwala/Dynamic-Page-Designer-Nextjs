'use strict';
import mongoose from "mongoose";

const EvolveGridScreenSchema = new mongoose.Schema({
    code: { type: 'string', required: true, unique: true }, // Auto incriment 4 digits code
    name: { type: 'string' },
    desc: { type: 'string' },
    status: { type: 'Boolean', default: true },
    rows: [{
        class: { type: 'string' },
        css: { type: 'string' },
        cols: [{
            class: { type: 'string' },
            css: { type: 'string' },
            components: [{
                index: { type: 'number', default: 0 },
                code: { type: 'string' },
                class: { type: 'string' },
                EvolveComponent_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveComponents' },
                EvolveComponentsData_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveComponentsData' },
            }],
            rows: [{
                class: { type: 'string' },
                css: { type: 'string' },
                cols: [{
                    class: { type: 'string' },
                    css: { type: 'string' },
                    components: [{
                        index: { type: 'number', default: 0 },
                        code: { type: 'string' },
                        class: { type: 'string' },
                        EvolveComponent_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveComponents' },
                        EvolveComponentsData_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveComponentsData' },
                    }],
                }],
            }]
        }],
    }],

    createdAt: { type: Date, default: Date.now },
    createdUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
},{ collection: 'EvolveGridScreen' })
const EvolveGridScreen = mongoose.models.EvolveGridScreen || mongoose.model("EvolveGridScreen", EvolveGridScreenSchema);
export default EvolveGridScreen;