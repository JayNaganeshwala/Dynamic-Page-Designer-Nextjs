'use strict';
import mongoose from "mongoose";

const EvolveOtpSchema = new mongoose.Schema({
    EvolveUser_EmailID: { type: 'string', required: true, unique: true },
    EvolveUser_Otp: { type: 'string', required: true},
    EvolveOtp_ExpiresAt: { type: Date , default: Date.now}

},{ collection: 'EvolveOtp' })
// const EvolveOtp = new Schema(Evolve.EvolveOtp, { collection: 'EvolveOtp' },{ collection: 'EvolveComponents' })
// EvolveOtp.index({EvolveOtp_ExpiresAt: 1},{expireAfterSeconds: 600},{ collection: 'EvolveComponents' })
// new mongoose.model('EvolveOtp', EvolveOtp);

const EvolveOtp = mongoose.models.EvolveOtp || mongoose.model("EvolveOtp", EvolveOtpSchema);
export default EvolveOtp;