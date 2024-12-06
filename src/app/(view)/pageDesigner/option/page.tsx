"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { Icon, Pen, Pencil, SearchX, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Item,
  exportType,
  formObjType,
  listObjType,
  optObjType,
  optionsType,
  primaryObjType,
} from "./option.types";
import ConfirmModal from "@/components/confirmModal";

export default function Option() {
  //types
  const framListObj = {
    listfield: "",
    listlabel: "",
    listdesc: "",
    listprefix: "",
    listpostfix: "",
    listcustomfunction: "",
    listtable: "",
    listtabledisplayfield: "",
    listtablereffield: "",
    listtablereffieldOpt: [],
    listicon: "",
    listisbadge: false,
    isRefTableField: false,
    listBText: "",
    conditionaldisplay: [
      {
        operator: "",
        matchedvalue: "",
        displayhtml: "",
      },
    ],
    conditionaldisplayOpt: ["equal", "less than", "greater than"],
    listlink: "",
    deviceby: "",
    isEdit: -1,
  };

  const framFormObj = {
    formfield: "",
    formlabel: "",
    formdesc: "",
    formdatatype: "",
    forminputtype: "",
    formdefault: "",
    formoptions: "",
    formcustomfunction: "",
    isreadonly: false,
    isrequired: false,
    formtable: "",
    formtabledisplayfield: "",
    formtablereffield: "",
    isRefTableField: false,
    isEdit: -1,
    // defaulvalcondition: string;
    // isSerialGenerated: boolean;
    // serial: string;
  };

  const framOptObj = {
    exportType: {
      print: false,
      excle: false,
      pdf: false,
      csv: false,
    },
    optionsType: {
      refresh: false,
      edit: false,
      add: false,
      view: false,
      delete: false,
      field: "", // select _id for delete / update operations
    },
    noofrecords: 10,
    actionurl: "",
    viewurl: "",
    // isdyanamicload: false,
    // importType: {
    //   bulkupload: false,
    // },
    // noOfRecordsList: [10, 25, 50, 100],
  };

  const framPrimaryObj = {
    name: "",
    table: "",
    field: "",
  };

  const params = useSearchParams(); // Get dynamic parameters
  const pageId = params.get("pageId");

  const [primaryObj, setPrimaryObj] = useState<primaryObjType>(framPrimaryObj);
  const [isModalOpen, setIsModalOpen] = useState(false);


  let datatypes = ["string", "boolean", "number", "ObjectId"];
  let inputtypes = ["INPUT", "SELECT", "CHECKBOX", "DATE", "FILE"];

  const [listObj, setListObj] = useState<listObjType>(framListObj);
  const [listArr, setListArr] = useState<listObjType[]>([]);

  const [formObj, setFormObj] = useState<formObjType>(framFormObj);
  const [formArr, setFormArr] = useState<formObjType[]>([]);

  const [optObj, setoptObj] = useState<optObjType>(framOptObj);

  const [allTables, setallTables] = useState<string[]>([]);
  const [allTablesFields, setallTablesFields] = useState<string[]>([]);
  const [allListRefTablesFields, setAllListRefTablesFields] = useState<
    string[]
  >([]);
  const [allFormRefTablesFields, setAllFormRefTablesFields] = useState<
    string[]
  >([]);

  const [Loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to handle List Form input changes
  const listHandleChange = (e: any, field = "") => {
    console.log("ischeck: ", field, e);
    if (field && "isRefTableField" == field) {
      setListObj((prv) => ({
        ...prv,
        ...{
          listtable: "",
          listtabledisplayfield: "",
          listtablereffield: "",
        },
      }));
    }

    if (field) {
      setListObj((prevData) => ({
        ...prevData,
        [field]: e, // Dynamically update the field
      }));
    } else {
      const { name, value } = e.target;
      setListObj((prevData) => ({
        ...prevData,
        [name]: value, // Dynamically update the field
      }));
    }
  };

  const saveListObj = () => {
    if (listObj.isEdit >= 0) {
      listArr[listObj.isEdit] = listObj;
      setListArr(listArr);
    } else {
      setListArr((prv) => [...prv, listObj]);
    }
    setListObj(framListObj);
  };

  const editListObj = (i: number) => {
    let obj = listArr[i];
    console.log('obj: ', obj);
    obj.isEdit = i;
    setListObj(obj);
  };
  const deleteListObj = (i: number) => {
    console.log("Delete element: ", i);
    setListArr((prev) => prev.filter((_, index) => index !== i));
  };

  const resetListObj = () => {
    setListObj(framListObj);
  };

  // Function to handle Form input fields changes
  const primaryObjHandle = (e: any) => {
    const { name, value } = e.target;
    console.log("value: ", value);
    console.log("name: ", name);
    setPrimaryObj((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the field
    }));
  };

  // Function to handle Form input fields changes
  const formHandleChange = (e: any, field = "") => {
    console.log("ischeck: ", field, e);
    if (field && "isRefTableField" == field) {
      setFormObj((prv) => ({
        ...prv,
        ...{
          formtable: "",
          formtabledisplayfield: "",
          formtablereffield: "",
        },
      }));
    }

    if (field) {
      setFormObj((prevData) => ({
        ...prevData,
        [field]: e, // Dynamically update the field
      }));
    } else {
      const { name, value } = e.target;
      console.log("value: ", value);
      console.log("name: ", name);
      setFormObj((prevData) => ({
        ...prevData,
        [name]: value, // Dynamically update the field
      }));
    }
  };

  const saveFormObj = () => {
    if (formObj.isEdit >= 0) {
      formArr[formObj.isEdit] = formObj;
      setFormArr(formArr);
    } else {
      setFormArr((prv) => [...prv, formObj]);
    }
    setFormObj(framFormObj);
  };

  const editFormObj = (i: number) => {
    let obj = formArr[i];
    obj.isEdit = i;
    setFormObj(obj);
    console.log('obj: ', obj);
  };

  const deleteFormObj = (i: number) => {
    console.log("Delete element: ", i);
    setFormArr((prev) => prev.filter((_, index) => index !== i));
  };

  const resetFormObj = () => {
    setFormObj(framFormObj);
  };

  const optHandleChange = (
    e: any,
    field: keyof exportType | keyof optionsType | "" = "",
    headfield: keyof optObjType | "" = ""
  ) => {
    console.log("ischeck: ", field, e, e.target);
    if (field && headfield) {
      setoptObj((prevData) => {
        const headData = prevData[headfield];

        // Ensure headData exists and is an object
        if (typeof headData === "object" && headData !== null) {
          let target = e.target as HTMLInputElement;
          return {
            ...prevData,
            [headfield]: { ...headData, [field as string]: target.checked }, // Dynamically update the field
          };
        } else {
          return prevData;
        }
      });
    } else {
      const { name, value } = e.target;
      console.log("value: ", value);
      console.log("name: ", name);
      setoptObj((prevData) => ({
        ...prevData,
        [name]: value, // Dynamically update the field
      }));
    }
  };

  const onSave = async (e: any) => {
    console.log("onSave: ");
    try {
      e.preventDefault();
      setLoading(true);
      const dataObj = {
        operation: pageId ? "M" : "A",
        listfields: listArr,
        pagefields: formArr,
        ...primaryObj,
        ...optObj,
      };
      console.log("dataObj: ", dataObj);
      const response = await axios.post("/api/pageDesigner", { dataObj });
      console.log("reponse login", response);
      toast.success("Data Inserted successfully");
      
      router.push("/pageDesigner/list");
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  async function allTablesFieldsApi(
    table: string,
    setterFunc: React.Dispatch<React.SetStateAction<any[]>>
  ) {
    try {
      const response = await axios.post("/api/pageDesigner/tablefields", {
        table: table,
      });
      console.log("response: ", response);
      if (response.data.allTablesFields.length > 0) {
        setterFunc(response.data.allTablesFields);
      }
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    }
  }
  //on change primary table value
  useEffect(() => {
    if (primaryObj.table) {
      allTablesFieldsApi(primaryObj.table, setallTablesFields);
    }
    return () => {};
  }, [primaryObj.table]);

  //on change reftable value
  useEffect(() => {
    if (listObj.listtable) {
      allTablesFieldsApi(listObj.listtable, setAllListRefTablesFields);
    }
    return () => {};
  }, [listObj.listtable]);

  //on change reftable value
  useEffect(() => {
    if (formObj.formtable) {
      allTablesFieldsApi(formObj.formtable, setAllFormRefTablesFields);
    }
    return () => {};
  }, [formObj.formtable]);

  //on create api calling
  useEffect(() => {
    allTablesApi();

    async function allTablesApi() {
      try {
        const response = await axios.get("/api/pageDesigner/alltables");
        console.log("response: ", response);
        if (response.data.tables) {
          setallTables(response.data.tables);
        }
      } catch (error: unknown) {
        if (error instanceof Error) toast.error(error.message);
      }
    }

    if(pageId){
      getSinglePageData()
      async function getSinglePageData(){
        const getPageData: any = await axios.post(`/api/pageDesigner/getSinglePageData?pageId=${pageId}`);
        console.log("getPageData", getPageData);

        if(getPageData.data.pageData){
          const {pagefields, listfields, options, ...data } = getPageData.data.pageData;

          let obj = {
            name: data.name,
            table: data.table,
            field: data.field,
            _id: data._id
          }

          const optObj = {
            exportType: {...getPageData.data.pageData.export},
            optionsType: {...options},
            noofrecords: data.noofrecords,
            actionurl: data.actionurl,
            viewurl: data.viewurl
          };

          setPrimaryObj(obj)
          setFormArr(pagefields)
          setListArr(listfields)
          setoptObj(optObj)
        }
      }
    }

    return () => {};
  }, []);


  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   console.log('handleCloseModal: ');
  //   setIsModalOpen(false);
  // };

  // const handleConfirm = () => {
  //   console.log("Confirmed!");
  //   // Handle confirmation logic here
  // };

  return (
    <>
      {/* <div className="flex justify-center items-center min-h-screen bg-gray-100"> */}
      {/* Trigger Button */}
      {/* <button
        onClick={handleOpenModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Delete Item
      </button> */}

      {/* Confirm Modal */}
      {/* <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title="Delete Confirmation"
        message="Are you sure you want to delete this product?"
      /> */}
    {/* </div> */}
      <div className="container m-auto p-8 mt-10 bg-white border rounded">
        <div className=" flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold shadow-sm text-gray-900 hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
          >
            Cancel
          </button>
          <button
            onClick={(e) => onSave(e)}
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save Document
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Page Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                value={primaryObj.name}
                onChange={primaryObjHandle}
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="table"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Table
            </label>
            <div className="mt-2">
              <select
                id="table"
                name="table"
                value={primaryObj.table}
                onChange={primaryObjHandle}
                className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
              >
                (<option value="">None</option>)
                {allTables.length > 0 &&
                  allTables.map((table) => (
                    <option key={table}>{table}</option>
                  ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="field"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Primary Field
            </label>
            <div className="mt-2">
              <select
                id="field"
                name="field"
                value={primaryObj.field}
                onChange={primaryObjHandle}
                className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
              >
                {allTablesFields.length > 0 ? (
                  allTablesFields.map((table) => (
                    <option key={table}>{table}</option>
                  ))
                ) : (
                  <option>None</option>
                )}
              </select>
            </div>
          </div>
          {/* <div className="">
                <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                    Device
                </label>
                <div className="h-6 flex items-center mt-3">
                    <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    className="size-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                </div>
            </div> */}
        </div>
      </div>

      <div className=" container m-auto mt-10 border rounded bg-white">
        <Tabs defaultValue="list">
          <TabsList className="border m-5 ">
            <TabsList className="mt-5grid w-full grid-cols-3 space-x-5 gap-4 ">
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
            </TabsList>
          </TabsList>

          <TabsContent value="list">
            <form className=" p-8">
              <div className="space-y-12">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label
                      htmlFor="listfield"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Field
                    </label>
                    <div className="mt-2">
                      <select
                        id="listfield"
                        name="listfield"
                        value={listObj.listfield}
                        onChange={listHandleChange}
                        className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                      >
                        (<option value="">None</option>)
                        {allTablesFields.length > 0 &&
                          allTablesFields.map((field) => (
                            <option key={field}>{field}</option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="listlabel"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Label
                    </label>
                    <div className="mt-2">
                      <input
                        id="listlabel"
                        name="listlabel"
                        type="text"
                        placeholder=""
                        value={listObj.listlabel}
                        onChange={listHandleChange}
                        autoComplete="address-level1"
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="listdesc"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <input
                        id="listdesc"
                        name="listdesc"
                        type="text"
                        placeholder=""
                        autoComplete="address-level1"
                        value={listObj.listdesc}
                        onChange={listHandleChange}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="listprefix"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Prefix
                    </label>
                    <div className="mt-2">
                      <input
                        id="listprefix"
                        name="listprefix"
                        type="text"
                        placeholder=""
                        autoComplete="address-level1"
                        value={listObj.listprefix}
                        onChange={listHandleChange}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="listpostfix"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Postfix
                    </label>
                    <div className="mt-2">
                      <input
                        id="listpostfix"
                        name="listpostfix"
                        type="text"
                        placeholder=""
                        autoComplete="address-level1"
                        value={listObj.listpostfix}
                        onChange={listHandleChange}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                      />
                    </div>
                  </div>

                  <div className="">
                    <label
                      htmlFor="listisbadge"
                      className="flex justify-center text-sm/6 font-medium text-gray-900"
                    >
                      Badge
                    </label>
                    <div className="mt-2 flex justify-center">
                      <Switch
                        id="listisbadge"
                        checked={listObj.listisbadge} // Controls the state of the switch
                        onCheckedChange={(e) =>
                          listHandleChange(e, "listisbadge")
                        }
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="listcustomfunction"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Custom Functions(DB)
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="listcustomfunction"
                        name="listcustomfunction"
                        rows={3}
                        value={listObj.listcustomfunction}
                        onChange={listHandleChange}
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                      />
                    </div>
                    {/* <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p> */}
                  </div>

                  <div className="">
                    <label
                      htmlFor="isRefTableField"
                      className="text-sm/6 font-medium text-gray-900"
                    >
                      Reference Table
                    </label>
                    <div className="mt-2">
                      <Switch
                        id="isRefTableField"
                        checked={listObj.isRefTableField} // Controls the state of the switch
                        onCheckedChange={(e) =>
                          listHandleChange(e, "isRefTableField")
                        }
                      />
                    </div>
                  </div>

                  {listObj?.isRefTableField && (
                    <div>
                      <label
                        htmlFor="listtable"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Reference Table
                      </label>
                      <div className="mt-2">
                        <select
                          id="listtable"
                          name="listtable"
                          className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                          value={listObj.listtable}
                          onChange={listHandleChange}
                        >
                          (<option value="">None</option>)
                          {allTables.length > 0 &&
                            allTables.map((table) => (
                              <option key={table}>{table}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {listObj?.isRefTableField && (
                    <div>
                      <label
                        htmlFor="listtablereffield"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Table Field
                      </label>
                      <div className="mt-2">
                        <select
                          id="listtablereffield"
                          name="listtablereffield"
                          className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                          value={listObj.listtablereffield}
                          onChange={listHandleChange}
                        >
                          (<option value="">None</option>)
                          {allListRefTablesFields.length > 0 &&
                            allListRefTablesFields.map((field) => (
                              <option key={field}>{field}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {listObj?.isRefTableField && (
                    <div>
                      <label
                        htmlFor="listtabledisplayfield"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Display Field
                      </label>
                      <div className="mt-2">
                        <select
                          id="listtabledisplayfield"
                          name="listtabledisplayfield"
                          className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                          value={listObj.listtabledisplayfield}
                          onChange={listHandleChange}
                        >
                          (<option value="">None</option>)
                          {allListRefTablesFields.length > 0 &&
                            allListRefTablesFields.map((field) => (
                              <option key={field}>{field}</option>
                            ))}
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={resetListObj}
                    className="rounded-md px-3 py-2 text-sm font-semibold shadow-sm text-gray-900 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Reset
                  </button>
                  <button
                    onClick={saveListObj}
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>

            <div className="px-10 border border-rose-400 relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  List Fields
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Field name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Label
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Prefix
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Postfix
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listArr?.length > 0 ? (
                    listArr?.map((e, i) => (
                      <tr
                        key={i}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {e.listfield}
                        </th>
                        <td className="px-6 py-4">{e.listlabel}</td>
                        <td className="px-6 py-4">{e.listdesc}</td>
                        <td className="px-6 py-4">{e.listprefix}</td>
                        <td className="px-6 py-4">{e.listpostfix}</td>
                        <td className="px-6 py-4 text-right space-x-2 flex justify-center items-center">
                          <button
                            onClick={() => editListObj(i)}
                            type="button"
                            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center me-2 mb-2"
                          >
                            <Pen className="size-4" />
                          </button>
                          <button
                            onClick={() => deleteListObj(i)}
                            type="button"
                            className="flex items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center me-2 mb-2"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td colSpan={6} className="text-center py-4">
                        <div className="flex justify-center">
                          <SearchX className="text-blue-500 size-10" />
                        </div>
                        <h3 className="font-bold text-gray-600 text-lg mt-2">
                          Sorry! No Result Found
                        </h3>
                        <p className="text-lg">
                          {/* We did not find any record that match your search. */}
                          We do not have any record. Please Add Something.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="form">
            <form className=" p-8">
              <div className="space-y-12">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label
                      htmlFor="formfield"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Field
                    </label>
                    <div className="mt-2">
                      <select
                        id="formfield"
                        name="formfield"
                        value={formObj.formfield}
                        onChange={formHandleChange}
                        className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                      >
                        (<option value="">None</option>)
                        {allTablesFields.length > 0 &&
                          allTablesFields.map((field) => (
                            <option key={field}>{field}</option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="formlabel"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Label
                    </label>
                    <div className="mt-2">
                      <input
                        id="formlabel"
                        name="formlabel"
                        type="text"
                        value={formObj.formlabel}
                        onChange={formHandleChange}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="formdesc"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <input
                        id="formdesc"
                        name="formdesc"
                        type="text"
                        placeholder=""
                        autoComplete="address-level1"
                        value={formObj.formdesc}
                        onChange={formHandleChange}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="formoptions"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Options
                    </label>
                    <div className="mt-2">
                      <input
                        id="formoptions"
                        name="formoptions"
                        type="text"
                        placeholder=""
                        autoComplete="address-level1"
                        value={formObj.formoptions}
                        onChange={formHandleChange}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="formdatatype"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Type
                    </label>
                    <div className="mt-2">
                      <select
                        id="formdatatype"
                        name="formdatatype"
                        value={formObj.formdatatype}
                        onChange={formHandleChange}
                        className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                      >
                        (<option value="">None</option>)
                        {datatypes.length > 0 &&
                          datatypes.map((type) => (
                            <option key={type}>{type}</option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="forminputtype"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Input Type
                    </label>
                    <div className="mt-2">
                      <select
                        id="forminputtype"
                        name="forminputtype"
                        value={formObj.forminputtype}
                        onChange={formHandleChange}
                        className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                      >
                        (<option value="">None</option>)
                        {inputtypes.length > 0 &&
                          inputtypes.map((type) => (
                            <option key={type}>{type}</option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="formdefault"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Default Value
                    </label>
                    <div className="mt-2">
                      <input
                        id="formdefault"
                        name="formdefault"
                        type="text"
                        placeholder=""
                        autoComplete="address-level1"
                        value={formObj.formdefault}
                        onChange={formHandleChange}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                      />
                    </div>
                  </div>

                  <div className="flex justify-around">
                    <div>
                      <label
                        htmlFor="isreadonly"
                        className="text-sm/6 font-medium text-gray-900"
                      >
                        Read Only
                      </label>
                      <div className="mt-2">
                        <Switch
                          id="isreadonly"
                          checked={formObj.isreadonly} // Controls the state of the switch
                          onCheckedChange={(e) =>
                            formHandleChange(e, "isreadonly")
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="isrequired"
                        className=" text-sm/6 font-medium text-gray-900"
                      >
                        Required
                      </label>
                      <div className="mt-2">
                        <Switch
                          id="isrequired"
                          checked={formObj.isrequired} // Controls the state of the switch
                          onCheckedChange={(e) =>
                            formHandleChange(e, "isrequired")
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="formcustomfunction"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Custom Functions(DB)
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="formcustomfunction"
                        name="formcustomfunction"
                        rows={3}
                        value={formObj.formcustomfunction}
                        onChange={formHandleChange}
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                      />
                    </div>
                    {/* <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p> */}
                  </div>

                  <div className="">
                    <label
                      htmlFor="isRefTableField"
                      className="text-sm/6 font-medium text-gray-900"
                    >
                      Reference Table
                    </label>
                    <div className="mt-2">
                      <Switch
                        id="isRefTableField"
                        checked={formObj.isRefTableField} // Controls the state of the switch
                        onCheckedChange={(e) =>
                          formHandleChange(e, "isRefTableField")
                        }
                      />
                    </div>
                  </div>

                  {formObj?.isRefTableField && (
                    <div>
                      <label
                        htmlFor="formtable"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Reference Table
                      </label>
                      <div className="mt-2">
                        <select
                          id="formtable"
                          name="formtable"
                          className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                          value={formObj.formtable}
                          onChange={formHandleChange}
                        >
                          (<option value="">None</option>)
                          {allTables.length > 0 &&
                            allTables.map((table) => (
                              <option key={table}>{table}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {formObj?.isRefTableField && (
                    <div>
                      <label
                        htmlFor="formtablereffield"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Table Field
                      </label>
                      <div className="mt-2">
                        <select
                          id="formtablereffield"
                          name="formtablereffield"
                          className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                          value={formObj.formtablereffield}
                          onChange={formHandleChange}
                        >
                          (<option value="">None</option>)
                          {allFormRefTablesFields.length > 0 &&
                            allFormRefTablesFields.map((field) => (
                              <option key={field}>{field}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {formObj?.isRefTableField && (
                    <div>
                      <label
                        htmlFor="formtabledisplayfield"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Display Field
                      </label>
                      <div className="mt-2">
                        <select
                          id="formtabledisplayfield"
                          name="formtabledisplayfield"
                          className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                          value={formObj.formtabledisplayfield}
                          onChange={formHandleChange}
                        >
                          (<option value="">None</option>)
                          {allFormRefTablesFields.length > 0 &&
                            allFormRefTablesFields.map((field) => (
                              <option key={field}>{field}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>

            <div className="m-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={resetFormObj}
                className="rounded-md px-3 py-2 text-sm font-semibold shadow-sm text-gray-900 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Reset
              </button>
              <button
                onClick={saveFormObj}
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>

            <div className="px-10 border border-rose-400 relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  Form Fields
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Field name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Label
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Data Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Input Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Required
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formArr?.length > 0 ? (
                    formArr?.map((e, i) => (
                      <tr
                        key={i}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {e.formfield}
                        </th>
                        <td className="px-6 py-4">{e.formlabel}</td>
                        <td className="px-6 py-4">{e.formdatatype}</td>
                        <td className="px-6 py-4">{e.forminputtype}</td>
                        <td className="px-6 py-4">
                          {(e.isrequired + "").toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2 flex justify-center items-center">
                          <button
                            onClick={() => editFormObj(i)}
                            type="button"
                            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center me-2 mb-2"
                          >
                            <Pen className="size-4" />
                          </button>
                          <button
                            onClick={() => deleteFormObj(i)}
                            type="button"
                            className="flex items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center me-2 mb-2"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td colSpan={6} className="text-center py-4">
                        <div className="flex justify-center">
                          <SearchX className="text-blue-500 size-10" />
                        </div>
                        <h3 className="font-bold text-gray-600 text-lg mt-2">
                          Sorry! No Result Found
                        </h3>
                        <p className="text-lg">
                          {/* We did not find any record that match your search. */}
                          We do not have any record. Please Add Something
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="options">
            <form className=" p-8">
              <div className="space-y-12">
                <div className="grid grid-cols-4 gap-4">
                  <div className="">
                    <label
                      htmlFor="Export"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Export
                    </label>
                    <div className="h-6 flex items-center gap-3 mt-3">
                      <input
                        id="csv"
                        name="csv"
                        type="checkbox"
                        onChange={(e) =>
                          optHandleChange(e, "csv", "exportType")
                        }
                        checked={optObj.exportType.csv}
                        className="size-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="csv"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        CSV
                      </label>
                    </div>

                    <div className="h-6 flex items-center gap-3 mt-3">
                      <input
                        id="pdf"
                        name="pdf"
                        type="checkbox"
                        onChange={(e) =>
                          optHandleChange(e, "pdf", "exportType")
                        }
                        checked={optObj.exportType.pdf}
                        className="h-5 w-5 rounded border-gray-300 bg-green-800 text-green-600 hover:bg-green-100 focus:ring-green-500"
                      />
                      <label
                        htmlFor="pdf"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        PDF
                      </label>
                    </div>
                  </div>

                  <div className="">
                    <label
                      htmlFor="Export"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Form Options
                    </label>
                    <div className="h-6 flex items-center gap-3 mt-3">
                      <input
                        id="add"
                        name="add"
                        type="checkbox"
                        onChange={(e) =>
                          optHandleChange(e, "add", "optionsType")
                        }
                        checked={optObj.optionsType.add}
                        className="size-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="add"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Add
                      </label>
                    </div>

                    <div className="h-6 flex items-center gap-3 mt-3">
                      <input
                        id="edit"
                        name="edit"
                        type="checkbox"
                        onChange={(e) =>
                          optHandleChange(e, "edit", "optionsType")
                        }
                        checked={optObj.optionsType.edit}
                        className="h-5 w-5 rounded border-gray-300 bg-green-800 text-green-600 hover:bg-green-100 focus:ring-green-500"
                      />
                      <label
                        htmlFor="edit"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Edit
                      </label>
                    </div>

                    <div className="h-6 flex items-center gap-3 mt-3">
                      <input
                        id="view"
                        name="view"
                        type="checkbox"
                        onChange={(e) =>
                          optHandleChange(e, "view", "optionsType")
                        }
                        checked={optObj.optionsType.view}
                        className="h-5 w-5 rounded border-gray-300 bg-green-800 text-green-600 hover:bg-green-100 focus:ring-green-500"
                      />
                      <label
                        htmlFor="view"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        View
                      </label>
                    </div>

                    <div className="h-6 flex items-center gap-3 mt-3">
                      <input
                        id="delete"
                        name="delete"
                        type="checkbox"
                        onChange={(e) =>
                          optHandleChange(e, "delete", "optionsType")
                        }
                        checked={optObj.optionsType.delete}
                        className="h-5 w-5 rounded border-gray-300 bg-green-800 text-green-600 hover:bg-green-100 focus:ring-green-500"
                      />
                      <label
                        htmlFor="delete"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Delete
                      </label>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="noofrecords"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      No Of Records
                    </label>
                    <div className="mt-2">
                      <select
                        id="noofrecords"
                        name="noofrecords"
                        onChange={(e) => optHandleChange(e)}
                        value={optObj.noofrecords}
                        className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                      >
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                        <option>200</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="actionurl"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Action Url
                    </label>
                    <div className="mt-2">
                      <input
                        id="actionurl"
                        name="actionurl"
                        type="text"
                        value={optObj.actionurl}
                        onChange={optHandleChange}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>

      <br />
      <br />
      <br />
      <Toaster />
    </>
  );
}
