'use strict';
import mongoose from "mongoose";

const EvolveCustomerSchema = new mongoose.Schema({
	EvolveCustomer_Code: { type: 'string', required: true  , unique: true},
	EvolveCustomer_Name: { type: 'string', required: true },
	EvolveCustomer_ShipmentLabel: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolvePrintLabel' , default:null},

	EvolveCustomer_IsActive: { type: 'Boolean', default: true, required:true},
	EvolveCustomer_DOAStatus: { type: 'string',  default:"U" },
	EvolveBillTo_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveAddress' },
	EvolveBillTo_Code: { type: 'string', default: '' },
	EvolveShipTo_ID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EvolveAddress' }],
	EvolveCustomerAttributes: { type: 'object', default: {} },

	EvolveCustomerAcountingDetails : {
		EvolveCurrency_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveCurrency' },
		EvolveCreditTerms_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveCreditTerm' },
		EvolveCustomer_PaymentGroup : { type: 'string' },
		EvolveCustomer_PrintReminder : { type: 'Boolean' },
		EvolveCustomer_PrintStatement : { type: 'Boolean' },
		EvolveCustomer_StatementCycle : { type: 'string' },
	},

	EvolveCustomerCreditDetails : {
		EvolveCustomer_CreditLimit : { type: 'string', default: '' },
		EvolveCustomer_MaxNumDaysCredLim : { type: 'string', default: '' },
		EvolveCustomer_CreditHold : { type: 'Boolean' , default:false },
		EvolveCustomer_CreditRting : { type: 'string', default: '' },
		EvolveCustomer_CreditAgency : { type: 'string', default: '' },
		EvolveCustomer_CreditAgencyRef : { type: 'string', default: '' },
		EvolveCustomer_LastCreditReview : { type: 'string', default: '' },
		EvolveCustomer_LastCreditUpdate : { type: 'string', default: '' },
		EvolveCustomer_CreditReviewDays : { type: 'string', default: '' },
	},

	EvolveCustomerOperationDetails : {
		EvolveCustomer_DayBookSet : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveSerial' },
		EvolveLanguage_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveLanguage' },
		EvolveCustomer_ShipVia : { type: 'string', default: '' },
		EvolveCustomer_PriceTable : { type: 'string', default: '' },
		EvolveCustomer_DiscountTable : { type: 'string', default: '' },
		EvolveCustomer_FixedPrice : { type: 'string', default: '' },
		EvolveCustomer_FreightList : { type: 'string', default: '' },
		EvolveCustomer_FreightTerms : { type: 'string', default: '' },
		EvolveCustomer_PoReqd : { type: 'Boolean' },
	},

	EvolveCustomerReportingDetails : {
		EvolveCustomer_Type : { type: 'string' , default : ''},
		EvolveCustomer_Class : { type: 'string' , default : ''},
		EvolveCustomer_Region : { type: 'string', default: '' },
		EvolveCustomer_IndustryType : { type: 'string', default: '' },
		EvolveCustomer_ParentCode : { type: 'string', default: '' },
		EvolveCustomerSalePerson: [
			{
				EvolveSalesPerson_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveSalesPerson' },
				EvolveSalesPerson_Code: { type: 'string', default: '' }
			}
		],
		EvolveCustomer_TAGS : { type: 'string' },
	},
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'string', default: '' },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'string', default: '' },
},{ collection: 'EvolveCustomer' })

const EvolveCustomer = mongoose.models.EvolveCustomer || mongoose.model("EvolveCustomer", EvolveCustomerSchema);
export default EvolveCustomer;