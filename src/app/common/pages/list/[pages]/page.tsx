"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { ArrowUpLeft, Eye, Pencil, SearchX, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ConfirmModal from '@/components/confirmModal';
import Pagination from '@/components/pagination';
// import { pageDesignerType } from '@/app/(view)/pageDesigner/option/option.types';

type Props = {}
function Pages(props: Props) {
    const params = useParams(); // Get dynamic parameters
    const { pages } = params;
    console.log('pages: ', pages);

    interface paginateObjType {
      startFrom: Number, displayRecords: number, totalRecords: number
    }


    const [pageData, setpageData] = useState<pageDesignerType | null>(null)
    const [tableData, setTableData] = useState<any>(null)
    const [ModalOpen, setModalOpen] = useState({modal: false, data: ""});
    
    const [PaginateObj, setPaginateObj] = useState<paginateObjType>({startFrom: 0, displayRecords: 0, totalRecords: 0});

    const router = useRouter();

    const getPageData = async () => {
      console.log("onLogin: ");
      try {
        const getPageData: any = await axios.post(`/api/pageDesigner/getPageData?pageId=${pages}`);
        console.log("getPageData login", getPageData);

        if(getPageData.data.pageData){
          setpageData(getPageData.data.pageData)

          getTableData(0, getPageData.data.pageData.noofrecords,getPageData.data.pageData )
        }
        
      } catch (error: unknown) {
        if (error instanceof Error) toast.error(error.message);
      }
    };

    const getTableData = async (startFrom: number = 0, displayRecords: number = 10, pageDataObj:any = pageData) => {
      console.log('displayRecords: ', displayRecords);
      console.log('startFrom: ', startFrom);
      console.log('pageData: ', pageDataObj);
      try {
        const getTableData: any = await axios.post(`/api/pageDesigner/getTableData?pageId=${pages}`,{
          pagedata: pageDataObj,
          startFrom,
          displayRecords,
        });
        console.log("getTableData login", getTableData);
        if(getTableData.data.status == "success"){
          setTableData(getTableData?.data?.result?.records)
          setPaginateObj({startFrom,displayRecords, totalRecords: getTableData?.data?.result?.noOfRecords})
        }
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    }

    useEffect(() => {
      getPageData()
    
      return () => {
      }
    }, [])


    function evaluateProp(prop:any, data:any) {
      try {
        // const getValue = (data) => eval(prop);
        // return getValue(data);

        // Split the propName into an array of keys
        const keys = prop.split(".");
        console.log("keys: ", keys);

        // Use reduce to traverse the object using the keys
        return keys.reduce(
          (acc:any, key:string) => (acc && acc[key] !== undefined ? acc[key] : undefined),
          data
        );
      } catch (error: unknown) {
        if(error instanceof Error){
          console.error(`Error evaluating prop "${prop}": ${error.message}`);
          return 0;
        }
      }
    }

    function editRecord(id: string) {
      console.log("id: ", id);
      if(pageData){
        router.push(pageData.actionurl ?  pageData.actionurl : ("/common/pages/list/" + pages)  + "/e" + id);
      }
    } 

    function addnewRecord() {
      if(pageData){
        router.push(pageData.actionurl ?  pageData.actionurl : ("/common/pages/list/" + pages)  + "/aNA" );
      }
    }
    

    function viewRecord(id: string) {
      if(pageData){
        console.log('pageData.viewurl ?  pageData.viewurl : ("/common/pages/list/" + pages)  + "/v" + id: ', (pageData.viewurl ?  pageData.viewurl : ("/common/pages/list/" + pages))  + "/v" + id);
        router.push((pageData.viewurl ?  pageData.viewurl : ("/common/pages/list/" + pages))  + "/v" + id);
      }
    }

    async function deleteRecord(id: string, index: number) {
      console.log('id: ', id); 
      setModalOpen({modal: true, data: tableData[index]});
    }

    const handleCloseModal = async () => {
      console.log('handleCloseModal: ');
      setModalOpen({modal: false, data: ""});

    }
    const handleConfirm = async (data: {modal: boolean, data: any}) => {
      console.log("Confirmed!");
      if(data.modal && data.data && pageData){
        const deletePageData: any = await axios.post(`/api/pageDesigner/deletePageData?pageId=${pages}`, 
          {
            tableName: pageData.table,
            deleteId: data.data._id,
          }
        );
          console.log("deletePageData login", deletePageData);
        if(deletePageData.data.status == 'success'){
          await getTableData( 0, 10, pageData)
        }
      };
    };

  return (
    <div>
      <ConfirmModal
        isOpen={ModalOpen.modal}
        onClose={handleCloseModal}
        onConfirm={() => handleConfirm(ModalOpen)}
        title="Delete Confirmation"
        message="Are you sure you want to delete this product?"
      />
      <div className='mx-2 py-2 bg-white border rounded-lg'>
        {
          pageData?.options.add && (
          <div className='flex justify-end mx-16'> 
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addnewRecord}>Create</button>
          </div>
          )
        }

        <Table>
          <TableCaption>A list of recent Pages.</TableCaption>
          <TableHeader>
            <TableRow>
              {
                pageData?.listfields.map((e,i) => (
                  <TableHead className="font-bold text-black" key={i}>{e.label}</TableHead>
                ))
              }
              {
                (pageData?.options?.view ||
                pageData?.options?.edit ||
                pageData?.options?.delete)  && <TableHead className="font-bold text-black">Options</TableHead>
              }
            </TableRow>
          </TableHeader>
          <TableBody>
  {
    tableData?.length > 0 ?
      tableData.map((data:any, i:number) => {
        return <TableRow key={i}>
          {
            pageData?.listfields.map((rows, l) => {
              if (rows.link != '') {
                return <TableCell className='p-2 h-8' key={l}>
                  <a href="rows.link">{ rows.link ? rows.link : "link"}</a>
                </TableCell>
              }

              if (rows.tablereffield) {
                return <TableCell className='p-2 h-8' key={l}>
                  {rows?.prefix}
                  {data[rows.field]?.[rows.tabledisplayfield]}
                  {rows?.postfix}
                </TableCell>
              }

              return <TableCell className='p-2 h-8' key={l}>
                {rows?.prefix}
                {
                  rows?.field?.includes(".")
                    ? evaluateProp(rows.field, data)
                    : data?.[rows.field] || typeof data?.[rows.field] == "boolean" ? String(data?.[rows.field]) : "-"
                }
                {rows?.postfix}
              </TableCell>
            })
          }
          <TableCell className="p-2 h-8">
            {(pageData && pageData.options.view) &&
              <button
                onClick={() => viewRecord(data[pageData.options.field])}
                type="button"
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center me-2"
              >
                <Eye className='size-4' />
              </button>
            }
            {(pageData && pageData.options.edit) &&
              <button
                onClick={() => editRecord(data[pageData.options.field])}
                type="button"
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center me-2"
              >
                <Pencil className='size-4' />
              </button>
            }
            {(pageData && pageData?.options.delete) &&
              <button
                onClick={() => deleteRecord(data._id, i)}
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center"
              >
                <Trash2 className='size-4' />
              </button>
            }
          </TableCell>
        </TableRow>
      })
      :
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td colSpan={pageData ? pageData?.listfields?.length + 1 : 5} className="text-center py-4">
          <div className="flex justify-center">
            <SearchX className="text-blue-500 size-10" />
          </div>
          <h3 className="font-bold text-gray-600 text-lg mt-2">
            Sorry! No Result Found
          </h3>
          <p className="text-lg">
            We do not have any record. Please Add Something.
          </p>
        </td>
      </tr>
  }
</TableBody>

        </Table>

        <Pagination
          totalRecords={PaginateObj.totalRecords}
          displayRecords={PaginateObj.displayRecords}
          onPageChange={getTableData}
        />
      </div>

    </div>
  )
}

export default Pages




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
  _id?: string, 
  code: string,
  url: string,
  listfields: listObjType[],
  pagefields: formObjType[],
  options: optionsType
  // ...primaryObj,
  // ...optObj,
}