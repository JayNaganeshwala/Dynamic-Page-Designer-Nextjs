'use strict';
import mongoose from "mongoose";

const EvolveMenuSchema = new mongoose.Schema({
	EvolveMenu_SrNo :  { type: 'string', required: true , unique: true  },
	EvolveMenu_Name :  { type: 'string', required: true , unique: true  },
	EvolveMenu_Desc:  { type: 'string'},
	EvolveMenu_Url:  { type: 'string' },
	EvolveMenu_IsActive:  { type: 'Boolean', default: true },
	EvolveMenu_Index:  { type: 'string' },
	EvolveMenu_Parent:  { type: 'string' },
	EvolveMenu_AppId : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveApp' },
	EvolveMenu_IsReportPage:  { type: 'Boolean' },
	EvolveUser_IframeUrl:  { type: 'string' },
	EvolveMenuType_ID:  { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveMenuType' },
	EvolveMenu_IsUpdateExtData:  { type: 'Boolean' },
	EvolveMenu_AuditEnable:  { type: 'Boolean' },
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'number', default: 0 },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'number', default: 0 },
	EvolveSubMenu: [
		{
			EvolveMenu_SrNo :  { type: 'string', required: true , unique: true  },
			EvolveMenu_Name :  { type: 'string', required: true , unique: true  },
			EvolveMenu_Desc:  { type: 'string'},
			EvolveMenu_Url:  { type: 'string' },
			EvolveMenu_IsActive:  { type: 'Boolean', default: true },
			EvolveMenu_Index:  { type: 'string' },
			EvolveMenu_Parent:  { type: 'string' },
			EvolveMenu_AppId : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveApp' },
			EvolveMenu_IsReportPage:  { type: 'Boolean' },
			EvolveUser_IframeUrl:  { type: 'string' },
			EvolveMenuType_ID:  { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveMenuType' },
			EvolveMenu_IsUpdateExtData:  { type: 'Boolean' },
			EvolveMenu_AuditEnable:  { type: 'Boolean' },
			createdAt: { type: Date, default: Date.now },
			createdUser: { type: 'number', default: 0 },
			updatedAt: { type: Date, default: Date.now },
			updatedUser: { type: 'number', default: 0 },
			EvolveSubMenu: [
				{
					EvolveMenu_SrNo :  { type: 'string', required: true , unique: true  },
					EvolveMenu_Name :  { type: 'string', required: true , unique: true  },
					EvolveMenu_Desc:  { type: 'string'},
					EvolveMenu_Url:  { type: 'string' },
					EvolveMenu_IsActive:  { type: 'Boolean', default: true },
					EvolveMenu_Index:  { type: 'string' },
					EvolveMenu_Parent:  { type: 'string' },
					EvolveMenu_AppId : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveApp' },
					EvolveMenu_IsReportPage:  { type: 'Boolean' },
					EvolveUser_IframeUrl:  { type: 'string' },
					EvolveMenuType_ID:  { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveMenuType' },
					EvolveMenu_IsUpdateExtData:  { type: 'Boolean' },
					EvolveMenu_AuditEnable:  { type: 'Boolean' },
					createdAt: { type: Date, default: Date.now },
					createdUser: { type: 'number', default: 0 },
					updatedAt: { type: Date, default: Date.now },
					updatedUser: { type: 'number', default: 0 },
					EvolveSubMenu: [
						{
							EvolveMenu_SrNo :  { type: 'string', required: true , unique: true  },
							EvolveMenu_Name :  { type: 'string', required: true , unique: true  },
							EvolveMenu_Desc:  { type: 'string'},
							EvolveMenu_Url:  { type: 'string' },
							EvolveMenu_IsActive:  { type: 'Boolean', default: true },
							EvolveMenu_Index:  { type: 'string' },
							EvolveMenu_Parent:  { type: 'string' },
							EvolveMenu_AppId : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveApp' },
							EvolveMenu_IsReportPage:  { type: 'Boolean' },
							EvolveUser_IframeUrl:  { type: 'string' },
							EvolveMenuType_ID:  { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveMenuType' },
							EvolveMenu_IsUpdateExtData:  { type: 'Boolean' },
							EvolveMenu_AuditEnable:  { type: 'Boolean' },
							createdAt: { type: Date, default: Date.now },
							createdUser: { type: 'number', default: 0 },
							updatedAt: { type: Date, default: Date.now },
							updatedUser: { type: 'number', default: 0 },
						}
					]
				}
			]
		}
	],
},{ collection: 'EvolveMenu' })

const EvolveMenu = mongoose.models.EvolveMenu || mongoose.model("EvolveMenu", EvolveMenuSchema);
export default EvolveMenu;