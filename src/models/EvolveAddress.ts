'use strict';
import mongoose from "mongoose";

const EvolveAddressSchema = new mongoose.Schema({
    code: { type: 'string', required: true, unique: true },
    name: { type: 'string', default: '' },
    street1: { type: 'string', default: '' },
    street2: { type: 'string', default: '' },
    street3: { type: 'string', default: '' },
    zip: { type: 'string', default: '' },
    city: { type: 'string', default: '' },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveState' },
    statecode: { type: 'string', default: '' },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'EvolveCountry' },
    countrycode: { type: 'string', default: '' },
    telephone: { type: 'string', default: '' },
    fax: { type: 'string', default: '' },
    email: { type: 'string', default: '' },
    website: { type: 'string', default: '' },
    istaxable: { type: 'Boolean', default: false },
    // AddressTaxIDFederal: { type: 'string', default: '' },
    // AddressTaxIDState: { type: 'string', default: '' },
    // IECCode: { type: 'string', default: '' },
    // MSME: { type: 'Boolean', default: false },
    // MSMENumber: { type: 'string', default: '' },
    // MSMEValidUpto: { type: Date },
    // AddressTaxIDMisc1: { type: 'string', default: '' },
    // AddressTaxIDMisc2: { type: 'string', default: '' },
    // AddressTaxIDMisc3: { type: 'string', default: '' },
    // ExemptionCode: { type: 'string', default: '' },
    // TxzTaxZone: { type: 'string', default: '' },
    // TaxZone: { type: 'string', default: '' },
    // TxclTaxCls: { type: 'string', default: '' },
    // TxuTaxUsage: { type: 'string', default: '' },
    // TxenvTaxEnvironment: { type: 'string', default: '' },
    // createdAt: { type: Date, default: Date.now },
    // createdUser: { type: 'string', default: '' },
    // updatedAt: { type: Date, default: Date.now },
    // updatedUser: { type: 'string', default: '' },
},{ collection: 'EvolveAddress' })
const EvolveAddress = mongoose.models.EvolveAddress || mongoose.model("EvolveAddress", EvolveAddressSchema);

export default EvolveAddress; 