"use strict";
import mongoose from "mongoose";

const EvolveDeviceSubTypeSchema = new mongoose.Schema({
  type: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveDeviceType" },
  gatewayconfiguration: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveGatewayConfiguration' },
  code: { type: "string", required: true },
  name: { type: "string", required: true },
  image: { type: "string", required: true },
  status: { type: "Boolean", required: true, default: true },
  offline: { type: "number", required: true, default: 0 }, // Second time for check device is offline or not
  // EvolveDeviceSubType_isMultiData: { type: "Boolean", required: true, default: false },
  attributes: { type: "object", default: {} },
  // EvolveDeviceSubType_Modbus: { type: "Boolean", required: true, default: false },
  firmware: { type: "string", default: "NA" },
  fw_version: { type: "string", default: "NA" },
  version: { type: "string", default: "NA" },
  // EvolveDeviceSubType_Query: [{
  //   EvolveDeviceSubType_Index: { type: "string", required: true },
  //   EvolveDeviceSubType_SlaveID: { type: "string", required: true },
  //   EvolveDeviceSubType_FuncCount: { type: "string", required: true },
  //   EvolveDeviceSubType_StartAddress: { type: "string", required: true },
  //   EvolveDeviceSubType_Count: { type: "string", required: true },
  //   EvolveDeviceSubType_DataType: { type: "string", required: true },
  // }],
  // EvolveDeviceSubType_InputStatus: { type: "Boolean", required: true, default: false },
  // EvolveDeviceSubType_Input: {
  //   EvolveDeviceSubType_InputDI1: { type: "string", default: "" },
  //   EvolveDeviceSubType_InputDI2: { type: "string", default: "" },
  // },
  // EvolveDeviceSubType_Connection: [
  //   {
  //     EvolveConnection_ID: { type: mongoose.Schema.Types.ObjectId, ref: "EvolveConnection", default: null },
  //     EvolveConnection_Status: { type: "Boolean", default: true }
  //   }
  // ],

  // EvolveDeviceSubType_History: [{
  //   EvolveDeviceSubType_ActionAt: { type: "string" },
  //   EvolveDeviceSubType_ActionBy: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
  //   EvolveDeviceSubType_ActionType: { type: "string" },
  //   EvolveDeviceSubType_ActionDataFilePath: { type: "string" },
  // }],
  //EvolveDeviceNotificationTemplate_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDeviceNotificationTemplate' },
  // EvolveDeviceTriggerTemplate_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDeviceTriggerTemplate' },
  // EvolveDeviceGraph_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDeviceGraph' },
  // EvolveDeviceTable_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveDeviceTable' },
  // EvolveIOTemplate_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveIOTemplate' }, // for parse Data and store into database
  fieldstemplate: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveFieldsTemplate' }, // for parse Data and store into database
  // EvolveDeviceSubType_CustomFunction: { type: "string", default: "" },
  // createdAt: { type: Date, default: Date.now },
  // createdUser: { type: "number", default: 0 },
  // updatedAt: { type: Date, default: Date.now },
  // updatedUser: { type: "number", default: 0 },
},{ collection: 'EvolveDeviceSubType' })



// EvolveDeviceSubType.pre("findOneAndUpdate", async function (next) {
//   try {
//     const docToUpdate = await this.model.findOne(this.getQuery());
//     if (this._update && this._update.fw_version && this._update.fw_version !== docToUpdate.fw_version && this._update.firmware !== docToUpdate.firmware) {
     
//       let findDevicesBySubtype = await new mongoose.model("EvolveDevice").find({ subtype: this.getQuery()?._id}).lean()

//       if(findDevicesBySubtype.length > 0){
//         for (let i = 0; i < findDevicesBySubtype.length; i++) {
//           const e = findDevicesBySubtype[i];
          
//           let findDeviceConfigurationByMac = await new mongoose.model("EvolveDeviceConfiguration").findOne({ deviceMac : e.mac}).lean()

//           if (!(findDeviceConfigurationByMac instanceof Error) && findDeviceConfigurationByMac){
//             findDeviceConfigurationByMac?.configuration_updated && Array.isArray(findDeviceConfigurationByMac.configuration_updated) && findDeviceConfigurationByMac.configuration_updated?.length > 0 ? "" : findDeviceConfigurationByMac.configuration_updated = []; 
//             findDeviceConfigurationByMac.configuration_updated.push(
//               {
//                 "key": "fw_version",
//                 "gatewayValue": this._update.fw_version,
//                 "DeviceValue": findDeviceConfigurationByMac.fw_version,
//               },
//               {
//                 "key": "firmware",
//                 "gatewayValue": this._update.firmware,
//                 "DeviceValue": findDeviceConfigurationByMac.firmware,
//               })

//             let updateDeviceConfiguration = await new mongoose.model("EvolveDeviceConfiguration").findByIdAndUpdate({ _id: findDeviceConfigurationByMac._id }, { $set: { configuration_updated: findDeviceConfigurationByMac.configuration_updated }} , {new:true})
//           }else{
//             console.log("device configuration null found!!")
//           }
//         }
//       }
//     }
//     return next();
//   } catch (error) {
//     console.log("Error In Pre Hook while EvolveDeviceSubType findOneAndUpdate: ", error.message);
//     return next(new Error("Error Pre Hook updateOne:" + error.message));
//   }
// },{ collection: 'EvolveComponents' })

const EvolveDeviceSubType = mongoose.models.EvolveDeviceSubType || mongoose.model("EvolveDeviceSubType", EvolveDeviceSubTypeSchema);
export default EvolveDeviceSubType;