'use strict';
import mongoose from "mongoose";

const TestTransactionSchema = new mongoose.Schema({
 value : { type: 'string', required: true},

	createdAt: { type: Date, default: Date.now },
	
	updatedAt: { type: Date, default: Date.now },
	
},{ collection: 'TestTransaction' })


const TestTransaction = mongoose.models.TestTransaction || mongoose.model("TestTransaction", TestTransactionSchema);
export default TestTransaction;