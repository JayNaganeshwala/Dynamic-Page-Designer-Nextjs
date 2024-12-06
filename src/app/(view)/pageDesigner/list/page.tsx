
"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import toast from 'react-hot-toast';
import { pageDesignerType } from '../option/option.types'
import { ArrowUpLeft, Pencil, SearchX, Trash } from 'lucide-react'
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/confirmModal";
import Pagination from '@/components/pagination'

function pageDesigner() {

  interface paginateObjType {
    startFrom: Number, displayRecords: number, totalRecords: number
  }

  let router = useRouter();
  const [list, setList] = useState<pageDesignerType[]>([])
  const [ModalOpen, setModalOpen] = useState({modal: false, data: ""});
  const [PaginateObj, setPaginateObj] = useState<paginateObjType>({startFrom: 0, displayRecords: 0, totalRecords: 0});



  const onCreateGetList = async (startFrom: number = 0, displayRecords: number = 10,) => {
    console.log("onLogin: ");
    try {
      const response = await axios.get(`/api/pageDesigner?skip=${startFrom}&limit=${displayRecords}`);
      console.log("reponse login", response);

      if(response.status == 200 && response?.data?.result?.list?.length > 0){
        setList(response.data.result.list)
        setPaginateObj({startFrom,displayRecords, totalRecords: response?.data?.result?.noOfRecords})

      }
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  useEffect(() => {
    onCreateGetList()
    return () => {
    }
  }, [])

  function navigator(url: string | pageDesignerType) {
    console.log('url: ', url);

    if(typeof url === "string"){
      router.push(url)
    }else{
      router.push("/pageDesigner/option?pageId=" + url.code);
    }
  }

  const handleOpenModal = (data: any) => {
    setModalOpen({modal: true, data});
  };

  const handleCloseModal = () => {
    console.log('handleCloseModal: ');
    setModalOpen({modal: false, data: ""});
  };

  const handleConfirm = () => {
    console.log("Confirmed!");
  };
  

  return (
    <>
      <ConfirmModal
        isOpen={ModalOpen.modal}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title="Delete Confirmation"
        message="Are you sure you want to delete this product?"
      />
      <Link className='flex justify-end m-3' href={"/pageDesigner/option"}>
        <Button className="mt-8 text-lg rounded-full py-7  px-6 font-bold">Create Page</Button>
      </Link>
      <div className='mx-2 py-2 bg-white border rounded-lg'>
        <Table className="h-full">
          <TableCaption>A list of recent Pages.</TableCaption>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[50px]">Index</TableHead> */}
              <TableHead className="w-[100px]">Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Page Url</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              list?.length > 0 ?
                list.map((l, i) => (
                  <TableRow key={l.code}>
                  <TableCell className="font-medium py-2">{l.code}</TableCell>
                  <TableCell className="font-medium py-2">{l.name}</TableCell>
                  <TableCell className="py-2">{l.url}</TableCell>
                  <TableCell className="py-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigator(l.url)}
                        type="button"
                        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center"
                      >
                        <ArrowUpLeft className="size-4" />
                      </button>
                      <button
                        onClick={() => navigator(l)}
                        type="button"
                        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        onClick={() => handleOpenModal(l)}
                        type="button"
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center"
                      >
                        <Trash className="size-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
                ))
              : 
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan={6} className="text-center py-2">
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
            }
          </TableBody>
        </Table>

        <Pagination
          totalRecords={PaginateObj.totalRecords}
          displayRecords={PaginateObj.displayRecords}
          onPageChange={onCreateGetList}
        />
      </div>
    </>
  )
}

export default pageDesigner