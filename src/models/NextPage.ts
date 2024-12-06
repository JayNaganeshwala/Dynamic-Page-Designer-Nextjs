import mongoose from "mongoose";

const nextPagechema = new mongoose.Schema({
    name: { type: 'string', required: true },
    code: { type: 'string', required: true, unique: true },
    table: { type: 'string', required: true },
    // isdevice: { type: 'Boolean', default: false },
    // isDeviceManualEntry: { type: 'Boolean', default: false },
    // deviceby: { type: 'string', default: '' },
    export: {
        print: { type: 'Boolean', default: false },
        excle: { type: 'Boolean', default: false },
        pdf: { type: 'Boolean', default: false },
        csv: { type: 'Boolean', default: false },
    },
    // import: {
    //     bulkupload: { type: 'Boolean', default: false },
    // },
    options: {
        refresh: { type: 'Boolean', default: false },
        edit: { type: 'Boolean', default: false },
        add: { type: 'Boolean', default: false },
        view: { type: 'Boolean', default: false },
        delete: { type: 'Boolean', default: false },
        field: { type: 'string', default: "" },
    },
    noofrecords: { type: 'number', default: 10 },
    isdyanamicload: { type: 'Boolean', default: false }, 
    url: { type: 'string', default: '' }, 
    actionurl: { type: 'string', default: '' },
    viewurl: { type: 'string', default: '' },
    pagefields: [{
        index: { type: 'number', default: null },
        field: { type: 'string', required: true },
        label: { type: 'string', default: '' },
        desc: { type: 'string', default: '' },
        datatype: { type: 'string', default: '' },
        inputtype: { type: 'string', default: '' },
        options: { type: 'string', default: '' },
        default: { type: 'string', default: '' },
        isreadonly: { type: 'Boolean', default: false },
        isrequired: { type: 'Boolean', default: false },
        // validationcode: { type: 'string', default: '' },
        customfunction: { type: 'string', default: '' },
        table: { type: 'string', default: '' },
        tabledisplayfield: { type: 'string', default: '' },
        tablereffield: { type: 'string', default: '' },
        // defaulvalcondition: { type: 'string', default: '' },
        // isSerialGenerated: { type: 'Boolean', default: false },
        // serial: { type: 'string', default: '' },
    }],
    listfields: [{
        index: { type: 'number', default: null },
        field: { type: 'string', required: true },
        label: { type: 'string', default: '' },
        desc: { type: 'string', default: '' },
        prefix: { type: 'string', default: '' },
        postfix: { type: 'string', default: '' },
        type: { type: 'number', default: 1 }, 
        customfunction: { type: 'string', default: '' },
        table: { type: 'string', default: '' },
        tabledisplayfield: { type: 'string', default: '' },
        tablereffield: { type: 'string', default: '' },
        // icon: { type: 'string', default: '' },
        isbadge: { type: 'Boolean', default: false }, 
        BText: { type: 'string', default: '' },
        // conditionaldisplay: [{
        //     operator: { type: 'string', default: '' },
        //     matchedvalue: { type: 'string', default: '' },
        //     displayhtml: { type: 'string', default: '' },
        // }],
        // link: { type: 'string', default: '' },
    }],
}, { collection: 'NextPage' })

const NextPage = mongoose.models.NextPage || mongoose.model("NextPage", nextPagechema);


export default NextPage; 