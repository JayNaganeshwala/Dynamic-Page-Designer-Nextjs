'use strict';
import mongoose from "mongoose";

const EvolveMoldingItemSchema = new mongoose.Schema({
    EvolveMoldingItem_Code: { type: 'string', required: true  ,unique: true},
    EvolveMoldingItem_Desc1: { type: 'string', default: ''},
    EvolveMoldingItem_Type: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveAttributes', required: true },
    EvolveMoldingItem_UnitID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUnit', required: true },
    EvolveMoldingItem_Attribute: { type: 'Object', default: {} },
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'number', default: 0 },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'number', default: 0 },    
},{ collection: 'EvolveMoldingItem' })
const EvolveMoldingItem = mongoose.models.EvolveMoldingItem || mongoose.model("EvolveMoldingItem", EvolveMoldingItemSchema);
export default EvolveMoldingItem;