'use strict';
import mongoose from "mongoose";

const EvolvePageSchema = new mongoose.Schema({
    name: { type: 'string', required: true },
    code: { type: 'string', required: true, unique: true },
    table: { type: 'string', required: true },
    isdevice: { type: 'Boolean', default: false },
    isDeviceManualEntry: { type: 'Boolean', default: false },
    deviceby: { type: 'string', default: '' },
    export: {
        print: { type: 'Boolean', default: false },
        excle: { type: 'Boolean', default: false },
        pdf: { type: 'Boolean', default: false },
        csv: { type: 'Boolean', default: false },
    },
    import: {
        bulkupload: { type: 'Boolean', default: false },
    },
    options: {
        refresh: { type: 'Boolean', default: false },
        edit: { type: 'Boolean', default: false },
        add: { type: 'Boolean', default: false },
        view: { type: 'Boolean', default: false },
        delete: { type: 'Boolean', default: false },
        field: { type: 'string', default: "" }, // select _id for delete / update operations 
    },
    noofrecords: { type: 'number', default: 10 },
    isdyanamicload: { type: 'Boolean', default: false }, // 0 : load all record in sigle time 1 : load reuired record and then depend on pegination mumber
    url: { type: 'string', default: '' }, // created by auto code
    actionurl: { type: 'string', default: '' }, // if you wants to create sperate page for create and edit. 
    viewurl: { type: 'string', default: '' }, // if you wants to create sperate page for view. 
    pagefields: [{
        index: { type: 'number', default: null },
        field: { type: 'string', required: true },
        label: { type: 'string', default: '' },
        desc: { type: 'string', default: '' },
        datatype: { type: 'string', default: '' }, // number  / string 
        inputtype: { type: 'string', default: '' }, // INPUT  / SELECT / CHECKBOX / file etc...
        options: { type: 'string', default: '' },// GREEN | RED | ETC
        default: { type: 'string', default: '' }, //  GREEN
        isreadonly: { type: 'Boolean', default: false },
        isrequired: { type: 'Boolean', default: false },
        validationcode: { type: 'string', default: '' },
        customfunction: { type: 'string', default: '' },
        table: { type: 'string', default: '' },
        tabledisplayfield: { type: 'string', default: '' },
        tablereffield: { type: 'string', default: '' },
        defaulvalcondition: { type: 'string', default: '' },
        isSerialGenerated: { type: 'Boolean', default: false },
        serial: { type: 'string', default: '' },
    }],
    listfields: [{
        index: { type: 'number', default: null },
        field: { type: 'string', required: true }, // field name  / code
        label: { type: 'string', default: '' },
        desc: { type: 'string', default: '' },
        prefix: { type: 'string', default: '' },
        postfix: { type: 'string', default: '' },
        type: { type: 'number', default: 1 }, // 1 : table field 2 : custom field  3: refrence field 
        customfunction: { type: 'string', default: '' },
        table: { type: 'string', default: '' },
        tabledisplayfield: { type: 'string', default: '' },
        tablereffield: { type: 'string', default: '' },
        icon: { type: 'string', default: '' },
        isbadge: { type: 'Boolean', default: false }, // show text on badge html
        BText: { type: 'string', default: '' }, // show text on badge html
        conditionaldisplay: [{
            operator: { type: 'string', default: '' }, // == > < != LIKE
            matchedvalue: { type: 'string', default: '' },
            displayhtml: { type: 'string', default: '' },
        }],
        link: { type: 'string', default: '' },
    }],
},{ collection: 'EvolvePage' })

const EvolvePage = mongoose.models.EvolvePage || mongoose.model("EvolvePage", EvolvePageSchema);
export default EvolvePage;