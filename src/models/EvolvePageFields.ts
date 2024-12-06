'use strict';
import mongoose from "mongoose";

const EvolvePageFieldsSchema = new mongoose.Schema({
    EvolvePage_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolvePage' },
    EvolvePageFields_Code: { type: 'string', required: true },
    EvolvePageFields_DataType: { type: 'string' },
    EvolvePageFields_InputType: { type: 'string' },
    EvolvePageFields_DefaultValueCode: { type: 'string' },
    EvolvePageFields_isReadOnly: { type: 'Boolean' },
    EvolvePageFields_ValidationCode: { type: 'string' },
    EvolvePageFields_CustomFunction: { type: 'string' },
    EvolvePageFields_DefaultValue: { type: 'string' },
    EvolvePageFields_Index: { type: 'number' },
    EvolvePageFields_ListIndex: { type: 'number' },
    EvolvePageFields_Desc: { type: 'string' },
    EvolvePageFields_SuccessMsg: { type: 'string' },
    EvolvePageFields_FailureMsg: { type: 'string' },
    EvolvePageFields_SearchType: { type: 'string' },
    EvolvePageFields_MachineIP: { type: 'string' },
    EvolvePageFields_ListLabel: { type: 'string' },
    EvolvePageFields_Label: { type: 'string' },
    EvolvePageFields_IsRequired: { type: 'Boolean' },
    EvolvePageFields_SelectQuery: { type: 'string' },
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'number', default: 0 },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolvePageFields' })

const EvolvePageFields = mongoose.models.EvolvePageFields || mongoose.model("EvolvePageFields", EvolvePageFieldsSchema);
export default EvolvePageFields;