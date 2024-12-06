'use strict';
import mongoose from "mongoose";

const EvolveFieldsTemplateSchema = new mongoose.Schema({
    // Template_Name: { type: 'string', required: true },
    // Template_Code: { type: 'string', required: true },
    // Template_CustomFunction: { type: 'string', default: '' },
    // Template_Fields: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDeviceFields' }],

    fields: [
        {
            index: { type: 'number' },
            name: { type: 'string', required: true },
            code: { type: 'string', required: true, unique: true },
            datasource: { type: 'string', required: true },
            dataType: { type: 'string', required: true },
            isDefault: { type: 'Boolean', default: false },
            isSumable: { type: 'Boolean', default: false },
            isIncreamental: { type: 'Boolean', default: false },
            isStorable: { type: 'Boolean', default: true },
            defaultValue: { type: 'string', default: '' },
            formula: { type: 'string', default: '' },
            customfunction: { type: 'string', default: '' },
            attributes: [
                {
                    attrCode: { type: 'string', required: true },
                    attrLabel: { type: 'string', required: true },
                    attrDesc: { type: 'string' },
                    attrDataType: { type: 'string', required: true },
                    attrType: { type: 'string', required: true },
                    attrValue: { type: 'string' },
                    attrDefaultValue: { type: 'string', required: true },
                }
            ],
        }
    ],
    name: { type: 'string', required: true },
    code: { type: 'string', required: true, unique: true },
    customfunction: { type: 'string', default: '' },
},{ collection: 'EvolveFieldsTemplate' })
const EvolveFieldsTemplate = mongoose.models.EvolveFieldsTemplate || mongoose.model("EvolveFieldsTemplate", EvolveFieldsTemplateSchema);
export default EvolveFieldsTemplate;
