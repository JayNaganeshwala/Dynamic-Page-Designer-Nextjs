'use strict';
import mongoose from "mongoose";

const ShiftTemplateSchema = new mongoose.Schema({
    code: { type: 'string', required: true, unique: true },// auto increamental
    name: { type: 'string', default: '' }, // user input
    shift: [
        {
            name : { type: 'string', default: '' },
            code : { type: 'string', required: true,}, // in every template code should be shift_1,shif_2,shift_3...
            startTime : { type: 'string', default: '' },
            endTime : { type: 'string', default: '' },

        }
    ],
    isdefault: { type: 'boolean', default: false },
    createdUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    updatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
},{ collection: 'ShiftTemplate' })

const ShiftTemplate = mongoose.models.ShiftTemplate || mongoose.model("ShiftTemplate", ShiftTemplateSchema);
export default ShiftTemplate;