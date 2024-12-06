export type Item = {
    operator: string;
    matchedvalue: string;
    displayhtml: string;
  };

  export type primaryObjType = {
    name: string;
    table: string;
    field: string;
  };

export interface listObjType {
    listfield: string;
    listlabel: string;
    listdesc: string;
    listprefix: string;
    listpostfix: string;
    listcustomfunction: string;
    listtable: string;
    listtabledisplayfield: string;
    listtablereffield: string;
    listtablereffieldOpt: string[];
    listicon: string;
    listisbadge: boolean;
    isRefTableField: boolean;
    listBText: string;
    conditionaldisplay: Item[];
    conditionaldisplayOpt: string[];
    listlink: string;
    deviceby: string;
    isEdit: number;
  }

export interface formObjType {
    formfield: string;
    formlabel: string;
    formdesc: string;
    formdatatype: string;
    forminputtype: string;
    formdefault: string;
    formoptions: any;
    formcustomfunction: string;
    isreadonly: boolean;
    isrequired: boolean;
    formtable: string;
    formtabledisplayfield: string;
    formtablereffield: string;
    isRefTableField: boolean;
    isEdit: number;
    // defaulvalcondition: string;
    // isSerialGenerated: boolean;
    // serial: string;
  }

export interface optObjType {
    exportType: exportType,
    optionsType: optionsType,
    noofrecords: number,
    actionurl: string,
    viewurl: string,
}   

export interface exportType {
    print: boolean,
    excle: boolean,
    pdf: boolean,
    csv: boolean,
}

export interface optionsType {
    refresh: boolean,
    edit: boolean,
    add: boolean,
    view: boolean,
    delete: boolean,
    field: string, // select _id for delete / update operations
  }

export interface pageDesignerType extends primaryObjType, optObjType{
    code: string,
    url: string,
    listfields: listObjType[],
    pagefields: formObjType[],
    // ...primaryObj,
    // ...optObj,
}