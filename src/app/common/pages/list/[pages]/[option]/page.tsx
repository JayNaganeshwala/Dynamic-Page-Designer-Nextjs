"use client"
import { Switch } from '@/components/ui/switch';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast, {Toaster} from 'react-hot-toast';

type Props = {}

const page = (props: Props) => {
    const params = useParams(); // Get dynamic parameters
    const { option, pages } = params;
    console.log('option: ', option);
    
    let paramsOption = "";
    let paramsId = "";
    if(typeof option == "string" && option){
      paramsOption =  option.charAt(0);
      paramsId =  option.substring(1);
    }
    
    // let pageId = pages
    const [pageData, setPageData] = useState<pageDesignerType | null>(null)
    const [primaryObj, setPrimaryObj] = useState<any>({})
    const [operation, setOperation] = useState<any>("")

    let router = useRouter()

    useEffect(() => {
      const getPageData = async () => {
        // console.log("Fetching page data...");
        try {
          const getPageData: any = await axios.post(
            `/api/pageDesigner/getPageDataForForm?pageId=${pages}`
          );
          console.log("getPageData:", getPageData);

          if (getPageData.data.pageData) {
            setPageData(getPageData.data.pageData);
            let defaultSavedObjFrame = getPageData.data.pageData.pagefields.reduce((result:any, item:any) => {

              if(item.datatype === 'string') {
                result[item.field] = "";
              }

              if(item.datatype === 'boolean') result[item.field] = false;
              if(item.datatype === 'number') result[item.field] = 0;
              return result;
            }, {})

            console.log('defaultSavedObjFrame: ', defaultSavedObjFrame);
            setPrimaryObj(defaultSavedObjFrame)
          }

          if (
            paramsId !== "NA" &&
            (paramsOption.toLowerCase() == "e" ||
            paramsOption.toLowerCase() == "v")
          ) {
            console.log('paramsId: ', paramsId);
            console.log('paramsOption: ', paramsOption);
            await getSinglePageData({
              operation: "LS",
              condition: { _id: paramsId },
              pageData: getPageData.data.pageData
            });
            setOperation("edit");
          }
      
          if (
            paramsId !== "NA" &&
            paramsOption.toLowerCase() == "v"
          ) {
            setOperation("view");
          }
        } catch (error: unknown) {
          if (error instanceof Error) toast.error(error.message);
        }
      };
      if (option) {
        getPageData();
      }
      // toast.success("Here is your toast.", {duration: 1000});
    }, [option]);

    const primaryObjHandle = (e: any, field: string = "") => {

      if(field){
        setPrimaryObj((prevData: any) => ({
          ...prevData,
          [field]: e, // Dynamically update the field
        }));
        return
      }

      const { name, value } = e.target;
      console.log("value: ", value);
      console.log("name: ", name);
      setPrimaryObj((prevData: any) => ({
        ...prevData,
        [name]: value, // Dynamically update the field
      }));
    };
    
    async function saveForm(){
      try {
        let error = false;
        let formData = new FormData();

        
        if(pageData){
          for (let i = 0; i < pageData.pagefields.length; i++) {
            const element = pageData.pagefields[i];
            // console.log("element: ", element);
    
            // console.log("this.pageData: ", this.pageData);
            if (
              element.isrequired &&
              !primaryObj[element.field] &&
              element.inputtype != "CHECKBOX"
            ) {
              console.log("primaryObj[element]: ", primaryObj[element.field]);
              console.log("primaryObj[element]: ", element.field);
              // this.customValidation = true;
              error = true;
              break;
            }
    
            // if(element.inputtype == "DATE" && this.pageData[element.field]){
            //   this.pageData[element.field] = new Date(this.pageData[element.field]).toISOString()
            //   console.log('this.pageData[element.field]: ', this.pageData[element.field]);
            // }
          }

          let bodyObj = {
            operation: paramsId == "NA" ? "A" : "M",
            rowData: pageData,
            pageDetails: primaryObj
          };
  
          console.log("bodyObj: ", bodyObj);
          formData.append("bodyObj", JSON.stringify(bodyObj));
  
          paramsId == "NA"
            ? ""
            : formData.append("condition", JSON.stringify({ _id: paramsId }));
  
          const savePageData: any = await axios.post(
            `/api/pageDesigner/savePageDataForForm?pageId=${pages}`,
            formData
          );
          console.log('savePageData: ', savePageData);

          if(savePageData.status === 200){
            router.back()
          }
        }


      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    }

    async function getSinglePageData(data: any) {
      try {
        // data.pageData = pageData;

        data.option = paramsOption.toLowerCase() == "v" ? "v" : "e";

        const getSinglePageInfo: any = await axios.post(
          `/api/pageDesigner/getSinglePageInfo`,
          data
        );
        console.log('getSinglePageInfo: ', getSinglePageInfo);

        if (getSinglePageInfo.status == 200) {
          console.log('getSinglePageInfo.data.singlePageData: ', getSinglePageInfo.data.singlePageData);
          setPrimaryObj(getSinglePageInfo.data.singlePageData);
        } else {
          console.log("Error while get single page data: ");
        }
      } catch (error) {
        console.log("Error while get single page data: ", error);
      }
    }

    return (
      <>
        <div>{pageData && pageData.name}</div>
        <div className="grid grid-cols-5 gap-4 " >
          {
            pageData && pageData.pagefields.map((field) => {
              if(field.inputtype && field?.inputtype === "INPUT")
              return <div
                  key={field.label}
                >
                  <label
                    htmlFor={field.label}
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    {field.label} : {primaryObj.field}
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name={field.field}
                      type="text"
                      value={primaryObj[field.field]}
                      onChange={primaryObjHandle}
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                
              if(field.inputtype && field?.inputtype === "SELECT")
              return <div key={field.label}>
                <label
                  htmlFor={field.label}
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {field.label}
                </label>
                <div className="mt-2">
                  <select
                    id="table"
                    name={field.field}
                    value={primaryObj[field.field]}
                    onChange={primaryObjHandle}
                    className=" block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                  >
                    (<option value="">None</option>)
                    {field.options.length > 0 &&
                      field.options.map((slct:any, ind: number) => (
                        <option key={ind} value={slct[field.tablereffield]}>{slct[field.tabledisplayfield]}</option>
                      ))}
                  </select>
                </div>
              </div>

              if(field.inputtype && field?.inputtype === 'CHECKBOX'){
                return <div className="" key={field.label}>
                  <label
                    htmlFor="isRefTableField"
                    className="text-sm/6 font-medium text-gray-900"
                  >
                    Reference Table
                  </label>
                  <div className="mt-2">
                    <Switch
                      id="isRefTableField"
                      checked={primaryObj[field.field]} // Controls the state of the switch
                      onCheckedChange={(e) =>
                        primaryObjHandle(e, field.field)
                      }
                    />
                  </div>
                </div>
              }
          })
          }
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            // onClick={resetListObj}
            className="rounded-md px-3 py-2 text-sm font-semibold shadow-sm text-gray-900 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Reset
          </button>
          <button
            onClick={saveForm}
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
        <Toaster />
      </>
    );
}

export default page



type Item = {
  operator: string;
  matchedvalue: string;
  displayhtml: string;
};

type primaryObjType = {
  name: string;
  table: string;
  field: string;
};

interface listObjType {
  field: string;
  label: string;
  desc: string;
  prefix: string;
  postfix: string;
  customfunction: string;
  table: string;
  tabledisplayfield: string;
  tablereffield: string;
  tablereffieldOpt: string[];
  icon: string;
  isbadge: boolean;
  isRefTableField: boolean;
  BText: string;
  conditionaldisplay: Item[];
  conditionaldisplayOpt: string[];
  link: string;
  deviceby: string;
  isEdit: number;
}

interface formObjType {
  field: string;
  label: string;
  desc: string;
  datatype: string;
  inputtype: string;
  defaultvalue: string;
  options: any;
  customfunction: string;
  isreadonly: boolean;
  isrequired: boolean;
  table: string;
  tabledisplayfield: string;
  tablereffield: string;
  isRefTableField: boolean;
  isEdit: number;
  // defaulvalcondition: string;
  // isSerialGenerated: boolean;
  // serial: string;
}

interface optObjType {
  exportType: exportType,
  optionsType: optionsType,
  noofrecords: number,
  actionurl: string,
  viewurl: string,
}   

interface exportType {
  print: boolean,
  excle: boolean,
  pdf: boolean,
  csv: boolean,
}

interface optionsType {
  refresh: boolean,
  edit: boolean,
  add: boolean,
  view: boolean,
  delete: boolean,
  field: string, // select _id for delete / update operations
}

interface pageDesignerType extends primaryObjType, optObjType{
  code: string,
  url: string,
  listfields: listObjType[],
  pagefields: formObjType[],
  options: optionsType
  // ...primaryObj,
  // ...optObj,
}