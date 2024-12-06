'use strict';
import mongoose from "mongoose";

const EvolveItemSchema = new mongoose.Schema({
    EvolveItem_Code: { type: 'string', required: true },
    EvolveItem_CycleTime: { type: 'string', maxlength: 50 },
    createdAt: { type: Date, default: Date.now },
    createdUser: { type: 'number', default: 0 },
    updatedAt: { type: Date, default: Date.now },
    updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveItem' })

const EvolveItem = mongoose.models.EvolveItem || mongoose.model("EvolveItem", EvolveItemSchema);
export default EvolveItem;