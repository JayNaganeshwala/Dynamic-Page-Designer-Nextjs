'use strict';
import mongoose from "mongoose";

const EvolveBrokerSchema = new mongoose.Schema({
    name: { type: 'string', required: true },
    user: { type: 'string', required: true },
    pass: { type: 'string', required: true },
    pre: { type: 'string', required: true },
    ip: { type: 'string', required: true },
    port: { type: 'string', required: true },
    status: { type: 'boolean', default: false }
},{ collection: 'EvolveBroker' })


const EvolveBroker = mongoose.models.EvolveBroker || mongoose.model("EvolveBroker", EvolveBrokerSchema)
export default EvolveBroker;


