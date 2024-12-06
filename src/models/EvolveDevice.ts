'use strict';
import mongoose from "mongoose";

const EvolveDeviceSchema= new mongoose.Schema({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDeviceType', required: true },
    subtype: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDeviceSubType', required: true },
    code: { type: 'string', required: true, unique: true }, // MAC / UNIQUE CODE this is also use for Subscriber MQTT and API Call
    mac: { type: 'string', required: true },
    slave: { type: 'number' },
    name: { type: 'string', required: true },
    lat: { type: 'number', required: true, default: 0 },
    long: { type: 'number', required: true, default: 0 },
    status: { type: 'Boolean', required: true, default: true },
    image: { type: 'string', required: true, default: '' },
    machine: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveMachine', default: null },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUnit', default: null }, // Company unit for Activate devices 
    fieldstemplate: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveFieldsTemplate', required: true },
    mfgdate: { type: Date, default: Date.now }, // manufacturing date
    expdate: { type: Date, default: Date.now }, // expiry  date
    remark: { type: 'string', required: true },
    broker: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveBroker' },
    subscriber: { type: 'string', required: true },
    offlinetimeout: { type: 'number', default: 0 },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
    shifttemplate_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ShiftTemplate' }
    // EvolveDevice_History: [{
    //     EvolveDevice_ActionAt: { type: 'string' },
    //     EvolveDevice_ActionBy: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    //     EvolveDevice_ActionType: { type: 'string' },
    //     EvolveDevice_ActionDataFilePath: { type: 'string' }
    // }],
    // EvolveDeviceNotificationTemplate_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDeviceNotificationTemplate' },
    // EvolveDeviceTrigger_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDeviceTrigger' },
    // EvolveDeviceGraph_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDeviceGraph' },
    // EvolveDeviceTable_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDeviceTable' },
    // EvolveDevice_Attributes: { type: "object", default: {} },
    // EvolveDevice_firmware_version: { type: "string", default: "NA" },

    // createdAt: { type: Date, default: Date.now },
    // createdUser: { type: 'number', default: 0 },
    // updatedAt: { type: Date, default: Date.now },
    // updatedUser: { type: 'number', default: 0 },
},{ collection: 'EvolveDevice' })
const EvolveDevice = mongoose.models.EvolveDevice || mongoose.model("EvolveDevice", EvolveDeviceSchema);
export default EvolveDevice;