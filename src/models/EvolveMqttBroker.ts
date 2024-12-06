'use strict';
import mongoose from "mongoose";

const EvolveMqttBrokerSchema = new mongoose.Schema({

    data: { type: 'object', default: '' },
    topic: { type: 'string', default: '' },
    Date: { type: Date, default: '' }
},{ collection: 'EvolveMqttBroker' })
const EvolveMqttBroker = mongoose.models.EvolveMqttBroker || mongoose.model("EvolveMqttBroker", EvolveMqttBrokerSchema);
export default EvolveMqttBroker;