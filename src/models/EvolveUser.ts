'use strict';
import mongoose from "mongoose";

const EvolveUserSchema = new mongoose.Schema({
    name: { type: 'string', required: true },
    units: [{
        unit: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUnit' },
        role: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveRole' }
        ],
        // department: [
        //     { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDepartment' }
        // ]
    }],
    selectedunit: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUnit' },
    email: { type: 'string', required: true, unique: true },
    login: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true, unique: true },
    status: { type: 'Boolean', default: true, required:true},
    oldpass: { type: 'string' },
    defaultUrl: { type: 'string'},
    image: { type: 'string', required: true },
    passchangeat: { type: Date, default: Date.now }, // last password changed
    lang: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveLanguage' }, // language id
    activedir: { type: 'Boolean', default: false }, // is active directory login
    mob: { type: 'string', default: '' }, // mobile number
    fcm: { type: 'string', default: '' }, // fcm token
    issuperuser: { type: 'Boolean', default: false },
    // createdAt: { type: Date, default: Date.now },
    // createdUser: { type: 'number', default: 0 },
    // updatedAt: { type: Date, default: Date.now },
    // updatedUser: { type: 'number', default: 0 },
    themeset: { type: Object, default: {} } // theme setting
    // EvolveUser_UserType: {type: 'string'}, // not use
    // EvolveUser_PrintAllow: {type: 'Boolean', default: false},//not use
    // EvolveUser_IsBranchUser: {type: 'Boolean', default: false},//not use
    // EvolveUser_ActiveDirUrl: {type: 'string'},//not use
    // EvolveUser_ActiveDirBaseDN: {type: 'string'},//not use
    // EvolveUser_ActiveDirUserName: {type: 'string'},//not use
    // EvolveUser_ActiveDirPassword: {type: 'string'},//not use
    // EvolveUser_DefaultMenu_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveMenu' },//not use
    // EvolveUser_DeviceID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDevice' },//not use
    // EvolveUser_IsBuyer: { type: 'Boolean', default: 0 },
    // EvolveUser_CreatePoAllow: {type: 'Boolean', default: false},//not use
},{collection:"EvolveUser"})
const EvolveUser = mongoose.models.EvolveUser || mongoose.model("EvolveUser", EvolveUserSchema);
export default EvolveUser;