'use strict';
import mongoose from "mongoose";

const MyDownloadSchema = new mongoose.Schema({
    EvolveUser_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
    EvolveTable_Name: { type: "string" },
    File_Type: { type: "string" },
    EvolveScreen_Code: { type: "string", required: true },
    File_size: { type: "string" },
    File_ReqDate: { type: 'Date', required: true },
    File_ExpDate: { type: 'Date' },
    File_Status: { type: 'string', default: "INPROGRESS" },
    File_Path: { type: 'string', required: true },
    FilterObj: { type: 'object', required: true },
},{ collection: 'MyDownload' })
const MyDownload = mongoose.models.MyDownload || mongoose.model("MyDownload", MyDownloadSchema);
export default MyDownload;