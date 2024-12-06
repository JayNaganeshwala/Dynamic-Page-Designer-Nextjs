'use strict';
import mongoose from "mongoose";

const EvolveAttributesSchema = new mongoose.Schema({
    EvolveAttributes_Name: { type: 'string', required: true },
    EvolveAttributes_UnitID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUnit', default: null },
    EvolveAttributes_IsRequired: { type: 'Boolean', default: true },
    EvolveAttributes: [
        {
            EvolveAttributes_Sequence: { type: 'Number', default: '' },
            EvolveAttributes_Code: { type: 'string', default: '' },
            EvolveAttributes_Value: { type: 'string', default: '' },
            EvolveAttributes_IsActive: { type: 'Boolean', default: true, },
        }

    ],
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'string', default: '' },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'string', default: '' },
},{ collection: 'EvolveAttributes' })

const EvolveAttributes = mongoose.models.EvolveAttributes || mongoose.model("EvolveAttributes", EvolveAttributesSchema);
export default EvolveAttributes;
