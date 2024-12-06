import { NextRequest, NextResponse } from 'next/server';

import connect from "@/dbConfig/dbConfig";
import mongoose, { mongo } from 'mongoose';

//initialize db
connect();

export async function GET(req: NextRequest, { params }: { params: { action: string } }) {
  const { action } = await params;
  console.log('action: ', action);

  
    if(action === "alltables"){
    // mongoose
   
    // Access the database connection
    const db = await mongoose.modelNames();
    // console.log('db: ', db);

    // Fetch all collections
    // const collections = await db?.collections();
    // console.log('collections: ', collections?.map((collection) => collection.collectionName));
      return NextResponse.json({ tables: db, status: 'success' },{status:200});
    }
    
    if(action === "tables"){
        return NextResponse.json({ tables: "mockTables", status: 'success' });
    }
    
    return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    
    //   switch (action) {
    //     case 'headers':
    //       return NextResponse.json({ headers: mockHeaders, status: 'success' });
    
    //     case 'tables':
    //       return NextResponse.json({ tables: mockTables, status: 'success' });
    
    //     default:
    //       return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    //   }
}

export async function POST(req: NextRequest, { params }: { params: { action: string } }) {

  try {
    const { action } = await params;
  
    
    switch (action) {
      case "getSinglePageInfo": 
      try {
        // console.log("Data while get single::: ", data);
        const body = await req.json();
        console.log('body: ', body);

  
        let condition = body.condition
        let populate = "";
        if (body.option == "v") {
          for (let i = 0; i < body.pageData.listfields.length; i++) {
            const element = body.pageData.listfields[i];
            element.tablereffield ? (populate += `.populate("${element.field}")`) : "";
          }
        }

        const queryOptions = {
          _id: new mongoose.Types.ObjectId(condition._id as string), // Ensure `_id` is a valid ObjectId
        };
        
        // Dynamically construct the model and query
        const modelName = body.pageData.table; // Replace with your dynamic table name
        const Model = mongoose.model(modelName);
        
        let query = Model.findById(queryOptions); // Build the query
        if (populate) {
          query = query.populate(populate); // Apply populate if needed
        }
        const getSinglePageData = await query.lean(); // Execute the query
        
        console.log("getSinglePageData:", getSinglePageData);
  
        // return getSinglePageData;

        return NextResponse.json({
          message: 'Single Page Data get successfully',
          status: 'success',
          singlePageData: getSinglePageData,
        });

      } catch (error) {
        console.log('error: getSinglePageInfo: ', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
      }

      case "deletePageData":
        try {
          const body = await req.json();

          if(body.tableName && body.deleteId){
            let deletePageData = await mongoose.model(body.tableName).findByIdAndDelete(body.deleteId)
            console.log('deletePageData: ', deletePageData);

            // Mock response (Replace with actual database logic)
            return NextResponse.json({
              message: 'Page Deleted successfully',
              status: 'success',
              deletePageData
            });
          }else{
            return NextResponse.json({ error: "Please Provide Required Credentials" }, { status: 500 });
          }
  
        } catch (error) {
        console.log('error: deletePageData:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
          
        }
      
      case "savePageDataForForm":
        try {
        
          //Get the Form Data
          let error = false;
          let customFuncInForm = false;
          let errMsg = "false";
          const Formdata = await req.formData();
          // console.log('Formdata: ', Formdata);
          const bodyObj = JSON.parse(Formdata.get('bodyObj') as string);
          console.log('bodyObj: ', bodyObj);
          const condition = JSON.parse(Formdata.get('condition') as string);
          console.log('condition: ', condition);


          for (let i = 0; i < bodyObj.rowData.pagefields.length; i++) {
            const element = bodyObj.rowData.pagefields[i]
            if (error == false) {
              if (element.isrequired == true) {
                if (
                  bodyObj.pageDetails[element.field] == "" ||
                  bodyObj.pageDetails[element.field] == null ||
                  bodyObj.pageDetails[element.field] == undefined
                ) {
                  console.log('bodyObj.pageDetails[element.field]: ',element.field ,bodyObj.pageDetails[element.field]);
                  error = true;
                  errMsg = `${bodyObj.pageDetails[element.field]} is null or undefined`;
                }
              }
            }
          }

          let tableName = bodyObj.rowData.table;
          console.log('error:----------------------- ', error);
          if (error == false && !bodyObj.rowData.isdevice) {
            let addPageData = condition && condition._id ? await mongoose.model(tableName).findByIdAndUpdate(condition,bodyObj.pageDetails) : await mongoose.model(tableName).create(bodyObj.pageDetails);
            console.log('addPageData:----------------- ', addPageData);
            if (addPageData instanceof Error) {
              (error = true), (errMsg = "Error while adding data");
            } else {
              return NextResponse.json({
                message: 'Data Inserted successfully',
                status: 'success',
              });
            }
          }


        return NextResponse.json({ bodyObj, condition })
      } catch (error) {
        console.log('error: savePageDataForForm :', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
      }
        
      case "getPageDataForForm":
        try {
          const searchParams = req.nextUrl.searchParams;
  
          // Example: Get specific query parameters
          const pageId = searchParams.get("pageId");
          console.log('pageId: ', pageId);
  
          
          let pageData = await mongoose.model("EvolvePage").findOne({code:pageId}).lean()
          
          if(pageData instanceof Error){
            return NextResponse.json({ error: (pageData as Error).message }, { status: 500 });
          }else{
            if(pageData){
              for (let i = 0; i < pageData.pagefields.length; i++) {
                const element = pageData.pagefields[i];
  
                if(element.inputtype == "SELECT"){
                    let getRefTableDataRes = await getRefTableData(element.table, element.tabledisplayfield)
                    // console.log('getRefTableData: ', getRefTableData);
                    element.options = getRefTableDataRes.result
                } 
              }
            }
          }
  
          // Mock response (Replace with actual database logic)
          return NextResponse.json({
            message: 'Page Data Get successfully',
            status: 'success',
            pageData: pageData,
          });
        } catch (error) {
          console.log('error: getPageDataForForm :', error);
          return NextResponse.json({ error: (error as Error).message }, { status: 500 });
        }
  
      case "getTableData":
        try {
          const body = await req.json();
          console.log('body: ', body);
  
          let populate = [];
          let customfunction: any = [];
          let queryArr = [];
          let addFieldObj = {};
          let regexFloat = /^[+-]?\d+(\.\d+)?$/;
          let tableName = body.pagedata.isdevice
            ? body.pagedata.table + body.pagedata.deviceby
            : body.pagedata.table;
          // console.log('body.searchQuery: ', body.searchQuery, typeof body.searchQuery);
    
          for (let i = 0; i < body.pagedata.listfields.length; i++) {
            const element = body.pagedata.listfields[i];
            // element.tablereffield ? populate += `.populate("${element.field}")` : ""
    
            if (element.tablereffield) {
              populate.push(
                {
                  $lookup: {
                    from: element.table,
                    localField: element.field,
                    foreignField: element.tablereffield,
                    as: element.field,
                  },
                },
                {
                  $unwind: {
                    path: `$${element.field}`,
                    preserveNullAndEmptyArrays: true,
                  },
                }
              );
            }
    
            if (element.customfunction) {
              if (Array.isArray(JSON.parse(element.customfunction))) {
                customfunction = [...customfunction, ...JSON.parse(element.customfunction)];
              } else {
                customfunction.push(JSON.parse(element.customfunction));
              }
            }
    
            if (body.searchQuery) {
              let isPopulateField = element.tablereffield && element.tabledisplayfield;
              queryArr.push({
                $or: [
                  {
                    [isPopulateField ? `${element.field}.${element.tabledisplayfield}` : element.field]: {
                      $in: [+body.searchQuery],
                    },
                  },
                  {
                    [isPopulateField ? `${element.field}.${element.tabledisplayfield}` : element.field]: {
                      $regex: ".*" + body.searchQuery + ".*",
                      $options: "i",
                    },
                  },
                ],
              });
            }
          }
          if (body.dateQuery) {
            console.log("body.dateQuery: ", body.dateQuery);
    
            let fromDateStr: Date | string = "";
            let toDateStr: Date | string = "";
            if (body.pagedata.isdevice && body.pagedata.deviceby !== "_ALL") {
              if (body.dateQuery.includes("to")) {
                let dateRange = body.dateQuery.split("to");
                fromDateStr = new Date(dateRange[0].trim());
                toDateStr = new Date(dateRange[1].trim());
    
                // fromDateStr = Evolve.moment.tz(fromDate, "DD/MM/YYYY, h:mm:ss a", "UTC+5:30").toDate();
                // toDateStr = Evolve.moment.tz(toDate, "DD/MM/YYYY, h:mm:ss a", "UTC+5:30").toDate();
              } else {
                fromDateStr = new Date(body.dateQuery);
              }
            }
    
            if (body.pagedata.isdevice && body.pagedata.deviceby == "_ALL") {
              let fromDateForAll: Date | string = "";
              let toDateForAll: Date | string = "";
              if (body.dateQuery.includes("to")) {
                let dateRangeForAll = body.dateQuery.split("to");
                fromDateForAll = new Date(dateRangeForAll[0].trim());
                // let HM = (dateRangeForAll[0].trim()).split(" ")
                // console.log('HM: ', HM);
    
                // let Hours = HM.length > 0 ? HM[1].split(":")[0] : ""
                // console.log('Hours: ', Hours);
                // let Minutes = HM.length > 0 ? HM[1].split(":")[1] : ""
                // console.log('Minutes: ', Minutes);
    
                // if(Hours && Minutes){
                //   fromDateForAll.setUTCMinutes(Minutes)
                //   fromDateForAll.setUTCHours(Hours)
                //   console.log('fromDateForAll: ', fromDateForAll);
                // }
    
                toDateForAll = new Date(dateRangeForAll[1].trim());
    
                // let ToHM = (dateRangeForAll[1].trim()).split(" ")
                // let ToHours = ToHM.length > 0 ? ToHM[1].split(":")[0] : ""
                // let ToMinutes = ToHM.length > 0 ? ToHM[1].split(":")[1] : ""
    
                // if(Hours && Minutes){
                //   toDateForAll.setUTCMinutes(ToMinutes)
                //   toDateForAll.setUTCHours(ToHours)
                //   console.log('toDateForAll: ', toDateForAll);
                // }
              } else {
                fromDateForAll = new Date(body.dateQuery);
              }
    
              let tsObj = toDateForAll
                ? {
                    $gte: fromDateForAll,
                    $lte: toDateForAll,
                  }
                : { $gte: fromDateForAll };
              queryArr.push({
                $or: [
                  {
                    ts: tsObj,
                  },
                ],
              });
            } else {
              let tsObj = toDateStr
                ? {
                    $gte: fromDateStr,
                    $lte: toDateStr,
                  }
                : { $gte: fromDateStr };
              queryArr.push({
                $or: [
                  {
                    date: tsObj,
                  },
                ],
              });
            }
          }
    
          console.log("queryArr: ", queryArr);
          let query =
            body.searchQuery || body.dateQuery
              ? {
                  $or: queryArr,
                }
              : {};
    
          if (body.pagedata.isdevice && body.pagedata.deviceby == "_ALL") {
            if (body.currentMonth && body.currentYear) {
              let formattedDate = body.currentMonth + "/" + body.currentYear;
    
              tableName = body.pagedata.table + "_" + formattedDate;
            } else {
              const currentDate = new Date();
              const formattedDate = `${String(currentDate.getMonth() + 1).padStart(2, "0")}/${String(
                currentDate.getFullYear()
              )}`;
              tableName = body.pagedata.table + "_" + formattedDate;
              console.log("tableName: ", tableName);
            }
          }
    
          console.log("query: ", JSON.stringify(query));
    
          // console.log('populate: ', populate);
          // console.log('customefunction: ', customfunction);
          // const queryStr = `Evolve.Mongoose.model('${tableName}').find({})`+populate+'.sort({ _id: -1 }).lean()'
    
          try {
            const tableData = await mongoose.model(tableName)
              .aggregate([
                ...populate,
                {
                  $match: query,
                },
                ...customfunction,
                {
                  $facet: {
                    result: [
                      { $sort: { _id: -1 } },
                      { $skip: body.startFrom },
                      { $limit: body.displayRecords },
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
              records: tableData[0].result,
              noOfRecords: tableData[0].totalCount.length > 0 ? tableData[0].totalCount[0].count : 0,
            };
    
            return NextResponse.json({ statusCode: 200, status: "success", message: "done", result: result });
          } catch (error: unknown) {
            console.log('error: ', error);
            if(error instanceof Error)
            console.error("error:In::EvolveIot:::tableData", error.message);
            return NextResponse.json({ error: (error as Error).message }, { status: 500 });
          }
        }catch(error){
          console.log('error: ', error);
          return NextResponse.json({ error: (error as Error).message }, { status: 500 });
        }
  
      case "getPageData":
        try {
          const searchParams = req.nextUrl.searchParams;
  
          // Example: Get specific query parameters
          const pageId = searchParams.get("pageId");
  
          let pageData = await mongoose.model("EvolvePage").findOne({code:pageId}).lean()
  
          // Mock response (Replace with actual database logic)
          return NextResponse.json({
            message: 'Page created successfully',
            status: 'success',
            pageData: pageData,
          });
        } catch (error) {
          console.log('error: getPageData:  ', error);
          return NextResponse.json({ error: (error as Error).message }, { status: 500 });
        }
      
        case "getSinglePageData":
        try {
          const searchParams = req.nextUrl.searchParams;
          console.log('searchParams: ', searchParams);
  
          // Example: Get specific query parameters
          const pageId = searchParams.get("pageId");
  
          let pageData:any = await mongoose.model("EvolvePage").findOne({code:pageId}).lean()

          if(pageData){
            let listarr = ["isEdit", "deviceby", "conditionaldisplayOpt", "conditionaldisplay", ""]
            let formarr = ["isreadonly","isrequired","isEdit","isRefTableField", "isRefTableField"]
            if(pageData?.pagefields && pageData.pagefields.length > 0){
              // let obj = {}
              for (let i = 0; i < pageData.pagefields.length; i++) {
                let element = pageData.pagefields[i];
                if(element["table"]){
                  element["isRefTableField"] = true
                }
                Object.keys(element).map((acc) => {
                  
                  if(!formarr.includes(acc)){
                    element["form" + acc] = element[acc]
                    delete element[acc];
                  }
                })
              }
            }

            if(pageData.listfields && pageData.listfields.length > 0){
              for (let i = 0; i < pageData.listfields.length; i++) {
                let element = pageData.listfields[i];
                
                if(element["table"]){
                  element["isRefTableField"] = true
                }
                Object.keys(element).map((acc) => {
                  if(!listarr.includes(acc)){
                    element["list" + acc] = element[acc]
                    delete element[acc];
                  }
                }, {...element})
              }
            }

          }

          if(pageData instanceof Error){
            return NextResponse.json({ error: pageData.message }, { status: 500 });
          }
  
          // Mock response (Replace with actual database logic)
          return NextResponse.json({
            message: 'Page created successfully',
            status: 'success',
            pageData: pageData,
          });
        } catch (error) {
          console.log('error: ', error);
          return NextResponse.json({ error: (error as Error).message }, { status: 500 });
        }
  
      case 'tablefields':
        try {
          const body = await req.json();
  
          const {table} = body;
  
          let getTableFields = await mongoose.model(table).schema;
          // response = Object.keys(getTableFields.tree);
  
          return NextResponse.json({
            allTablesFields: Object.keys(getTableFields.paths),
            message: 'Page tablefield got successfully',
            status: 'success',
            page: body,
          });
        } catch (error) {
          console.log('error: tablefields :', error);
          return NextResponse.json({ error: (error as Error).message }, { status: 500 });
        }
  
      case 'create':
        try {
          const body = await req.json();
          console.log('Creating Page:', body);
  
          // Mock response (Replace with actual database logic)
          return NextResponse.json({
            message: 'Page created successfully',
            status: 'success',
            page: body,
          });
        } catch (error) {
          return NextResponse.json({ error: (error as Error).message }, { status: 500 });
        }
  
      default:
        return NextResponse.json({ error: 'Action not supported for POST' }, { status: 400 });
    }
  
    async function getRefTableData(table: string, field: string) {
      try {
        let query = {};
        query[field] = 1;
        let optionsData = await mongoose.model(table).find({}, query).limit(30).lean();
        let obj = {
          statusCode: 200,
          status: "success",
          result: optionsData,
        };
        return obj;
      } catch (error) {
        console.log("error: ", error);
        let obj = {
          statusCode: 400,
          status: "fail",
          result: null,
          error: error,
        };
        return obj;
      }
    }

    async function evaluateProp(prop:any, data:any) {
      try {
        // const getValue = (data) => eval(prop);
        // return getValue(data);
  
        // Split the propName into an array of keys
        const keys = prop.split(".");
        // console.log("keys: ", keys);
  
        // Use reduce to traverse the object using the keys
        return keys.reduce((acc:any, key:string) => (acc && acc[key] !== undefined ? acc[key] : undefined), data);
      } catch (error: unknown) {
        if(error instanceof Error)
        console.error(`Error evaluating prop "${prop}": ${error.message}`);
        return 0;
      }
    }
    
  } catch (error) {
    console.log('error: ', error);
  }
}
