'use strict';
import mongoose from "mongoose";

const EvolveSupplierSchema = new mongoose.Schema({
	EvolveSupplier_Code: { type: 'string', required: true  , unique: true},
	EvolveSupplier_Name: { type: 'string', required: true },
	EvolveSupplier_CroneJobStatus: { type: 'Number',  default:0, required: true },
	EvolveSupplier_IsActive:{ type: 'Boolean', default: true, required:true},
	EvolveSupplier_DOAStatus: { type: 'string', required: true },
	EvolveBillTo_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveAddress' },
	EvolveBillTo_Code: { type: 'string', default: '' },
	EvolveSupplierAttributes: { type: 'object', default: {} },

	EvolveSupplierAcountingDetails : {
		EvolveCurrency_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveCurrency' },
		EvolveCreditTerms_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveCreditTerm' },
		EvolveTaxUsage_Code : { type: 'string' , defaullt : '' },
		EvolveSupplier_PaymentGroup : { type: 'string' , defaullt : '' },
		EvolveSupplier_PrintReminder : { type: 'Boolean' },
		EvolveSupplier_PrintStatement : { type: 'Boolean' },
		EvolveSupplier_StatementCycle : { type: 'string' , defaullt : '' },
		EvolveSupplier_GLProfileInvoice : { type: 'string' , defaullt : '' },
		EvolveSupplier_GlProfileCreditNote : { type: 'string' , defaullt : '' },
		EvolveSupplier_GLProfilePrePayment : { type: 'string' , defaullt : '' },
		EvolveSupplier_GLPurchaseAccount : { type: 'string' , defaullt : '' },
		EvolveSupplier_SubAccount : { type: 'string' , defaullt : '' },
		// EvolveSupplier_GLPurchaseAccount : { type: 'string' , defaullt : '' },
		EvolveSupplierType_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveSupplierType' },
		EvolvePurchaseType_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolvePurchaseType' },

	},

	EvolveSupplierOperationDetails : {
		EvolveSupplier_DayBookSet : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveSerial' },
		EvolveLanguage_ID : { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveLanguage' },
		EvolveSupplier_ShipVia : { type: 'string', default: '' },
		EvolveSupplier_PriceTable : { type: 'string', default: '' },
		EvolveSupplier_DiscountTable : { type: 'string', default: '' },
		EvolveSupplier_FixedPrice : { type: 'string', default: '' },
		EvolveSupplier_FreightList : { type: 'string', default: '' },
		EvolveSupplier_FreightTerms : { type: 'string', default: '' },
		EvolveSupplier_PoReqd : { type: 'Boolean' },
	},

	EvolveSupplierCreditDetails : {
		EvolveSupplier_CreditLimit : { type: 'string', default: '' },
		EvolveSupplier_MaxNumDaysCredLim : { type: 'string', default: '' },
		EvolveSupplier_CreditHold : { type: 'Boolean' , default:false },
		EvolveSupplier_CreditRting : { type: 'string', default: '' },
		EvolveSupplier_CreditAgency : { type: 'string', default: '' },
		EvolveSupplier_CreditAgencyRef : { type: 'string', default: '' },
		EvolveSupplier_LastCreditReview : { type: 'string', default: '' },
		EvolveSupplier_LastCreditUpdate : { type: 'string', default: '' },
		EvolveSupplier_CreditReviewDays : { type: 'string', default: '' },
	},


	EvolveSupplierReportingDetails : {
		EvolveSupplier_Type : { type: 'string' , default : ''},
		EvolveSupplier_Class : { type: 'string' , default : ''},
		EvolveSupplier_Region : { type: 'string', default: '' },
		EvolveSupplier_IndustryType : { type: 'string', default: '' },
		EvolveSupplier_ParentCode : { type: 'string', default: '' },
		EvolveSupplierBuyer: [
			{
				EvolveBuyer_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveUser' },
				EvolveBuyer_Code: { type: 'string', default: '' }
			}
		],
	EvolveSupplier_TAGS : { type: 'string' },
	},
	createdAt: { type: Date, default: Date.now },
	createdUser: { type: 'string', default: '' },
	updatedAt: { type: Date, default: Date.now },
	updatedUser: { type: 'string', default: '' },
},{ collection: 'EvolveSupplier' })

const EvolveSupplier = mongoose.models.EvolveSupplier || mongoose.model("EvolveSupplier", EvolveSupplierSchema);
export default EvolveSupplier;
