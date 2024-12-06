import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import NextPage from "@/models/NextPage";
import mongoose from "mongoose";
import EvolvePage from "@/models/EvolvePage";

//initialize db
connect();

export interface listObjType {
  field: string;
  label: string;
  desc: string;
  prefix: string;
  postfix: string;
  customfunction: string;
  table: string;
  tabledisplayfield: string;
  tablereffield: string;
  isbadge: boolean;
  isRefTableField: boolean;
  // BText: string;
  // deviceby: string;
  isEdit: number;
}


export async function POST(request: NextRequest) {
  try {
    interface formObjType {
      field: string;
      label: string;
      desc: string;
      datatype: string;
      inputtype: string;
      defaultvalue: string;
      options: string;
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
    const reqBody = await request.json();
    console.log("reqBody: ", reqBody);

    const { dataObj } = reqBody;
    // let dataObj = dataObj;
    console.log("dataObj: ", dataObj);

    if(dataObj.operation === "A"){
      const lastGen = await mongoose
        .model("NextPage")
        .findOne({})
        .sort({ _id: -1 });
      console.log("lastGen: ", lastGen);
  
      let x = lastGen ? String(Number(lastGen?.code?.split(":")?.[1]) + 1) : "1"
  
      const LASTCODE = lastGen?.code ? lastGen.code : "EPGE0001"
  
      // Extract alphabetic and numeric parts
      const alphabeticPart = LASTCODE.match(/[a-zA-Z]+/)[0];
      const numericPart = LASTCODE.match(/\d+/)[0];
  
      // Increment the numeric part
      const incrementedNumber = (parseInt(numericPart) + 1).toString().padStart(numericPart.length, '0');
  
      // Join them back together
      dataObj.code = alphabeticPart + incrementedNumber;
      console.log('INCREMENTEDCODE: ', dataObj.code);

      dataObj.url = "/common/pages/list/" + dataObj.code;
      console.log("dataObj.url: ", dataObj.url);
    }

    dataObj.pagefields = dataObj.pagefields.map((e: any) => {
      let result:any = {}
      for (const key in e) {
        let k = key as keyof formObjType
        if (k.includes("form")) {
          // Replace "form" in the key and copy the key-value pair
          result[k.replace("form", "")] = e[key];
        } else {
          // Keep the key-value pair as is
          result[key] = e[key];
        }
      }
    
      return result;
    })
    dataObj.listfields = dataObj.listfields.map((e: any) => {
      let result:any = {}
      for (const key in e) {
        let k = key as keyof formObjType
        if (k.includes("list")) {
          // Replace "list" in the key and copy the key-value pair
          result[k.replace("list", "")] = e[key];
        } else {
          // Keep the key-value pair as is
          result[key] = e[key];
        }
      }
    
      return result;
    })


    let addPage = dataObj.operation == "A" ? await mongoose.model("EvolvePage").create(dataObj) : await mongoose.model("EvolvePage").findByIdAndUpdate(dataObj._id, dataObj)
    console.log("addPage: ", addPage);

    // return addPage;
    return NextResponse.json(
      {
        page: addPage,
        message: dataObj.operation == "A" ? "Page is successfully created" : "PageData is updated Successfully",
        status: "success",
        pages: "pages",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.log('error: ', error);
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest ){
  try {
    // Extract query parameters from request URL
    const { searchParams } = request.nextUrl;

    const skip = searchParams.get("skip") || 0;
    console.log('skip: ', skip);
    const limit = searchParams.get("limit") || 10;
    console.log('limit: ', limit);

    // let pageDesignerList = await mongoose.model("EvolvePage").find({}).sort({_id: -1}).limit(+limit).skip(+skip).lean()

    try {
      const pageDesignerList = await mongoose.model("EvolvePage").aggregate([
          {
            $facet: {
              result: [
                { $sort: { _id: -1 } },
                { $skip: +skip! },
                { $limit: +limit! },
              ],
              totalCount: [{ $count: "count" }],
            },
          },
          {
            $project: {
              result: 1,
              totalCount: 1,
            },
          },
        ])
        .allowDiskUse(true);

      let result = {
        list: pageDesignerList[0].result,
        noOfRecords: pageDesignerList[0].totalCount.length > 0 ? pageDesignerList[0].totalCount[0].count : 0,
      };
      console.log('result: ', result);

      return NextResponse.json({ statusCode: 200, status: "success", message: "done", result: result });
    } catch (error: unknown) {
      console.log('error: ', error);
      if(error instanceof Error)
      console.error("error:In::EvolveIot:::tableData", error.message);
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }

  } catch (error: unknown) {
    console.log('error: ', error);
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// import type { NextApiRequest, NextApiResponse } from "next";

// export default function pageDesigner(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     console.log("Process a POST request:", req.body);
//     res.status(200).json({ message: "POST request handled" });
//   } else {
//     console.log("Handle any other HTTP method:", req.method);
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }
