'use strict';
import mongoose from "mongoose";

const EvolveDeviceToAttributeLinkSchema = new mongoose.Schema({
    EvolveDeviceToAttributeDevice_ID:{ type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDevice' , required: true  ,unique: true},
    EvolveDeviceToAttribute_Type: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveAttributes', required: true },
    EvolveDeviceToAttribute_Attribute: { type: 'Object', default: {} },
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'string', default: '' },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'string', default: '' },
},{ collection: 'EvolveDeviceToAttributeLink' })
const EvolveDeviceToAttributeLink = mongoose.models.EvolveDeviceToAttributeLink || mongoose.model("EvolveDeviceToAttributeLink", EvolveDeviceToAttributeLinkSchema);
export default EvolveDeviceToAttributeLink;