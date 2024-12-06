'use strict';
import mongoose from "mongoose";

const EvolveDeviceFieldsSchema = new mongoose.Schema({
    Field_Index: { type: 'number' },
    Field_Name: { type: 'string', required: true },
    Field_Code: { type: 'string', required: true },
    Field_Datasource: { type: 'string', required: true },
    Field_DataType: { type: 'string', required: true },
    Field_isDefault: { type: 'Boolean', default: false },
    Field_isIncreamental: { type: 'Boolean', default: true },
    Field_isStorable: { type: 'Boolean', default: true },
    Field_DefaultValue: { type: 'string', default: '' },
    Field_Attributes: [
        {
            Attribute_Code: { type: 'string', required: true },
            Attribute_Label: { type: 'string', required: true },
            Attribute_Desc: { type: 'string' },
            Attribute_DataType: { type: 'string', required: true },
            Attribute_Type: { type: 'string', required: true },
            Attribute_Value: { type: 'string' },
            Attribute_DefaultValue: { type: 'string', required: true },
        }
    ],
    Field_Formula: { type: 'string', default: '' },
    Field_CustomFunction: { type: 'string', default: '' },
},{collection: "EvolveDeviceFields"})

const EvolveDeviceFields = mongoose.models.EvolveDeviceFields || mongoose.model("EvolveDeviceFields", EvolveDeviceFieldsSchema);
export default EvolveDeviceFields;