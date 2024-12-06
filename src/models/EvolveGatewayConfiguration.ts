"use strict";
import mongoose from "mongoose";

const EvolveGatewayConfigurationSchema = new mongoose.Schema({
	code: { type: "string", required: true, unique: true },
	name: { type: "string", required: true },
	desc: { type: "string", default: ''},
	cgroup: [
		{
			// network / io config  / modbus
			code: { type: "string", required: true, unique: true },
			name: { type: "string", required: true },
			key: { type: "string", required: true },
			desc: { type: "string", default: ''},
			preview: { type: "Boolean", default: false },
			update: { type: "Boolean", default: false },
			erase: { type: "Boolean", default: false },
			gtype: [
				{
					code: { type: "string", required: true, unique: true },
					name: { type: "string", required: true },
					key: { type: "string" },
					desc: { type: "string", default: ''},
					preview: { type: "Boolean", default: false },
					update: { type: "Boolean", default: false },
					erase: { type: "Boolean", default: false },
					display: { type: "string" }, // IF NEWWORK_SELECTIONS 1(WIFI)
					params: [
						{
							code: { type: "string", required: true, unique: true },
							name: { type: "string", required: true },
							key: { type: "string", required: true },
							desc: { type: "string", default: ''},
							datatype: { type: "string", required: true }, // NUMBER | STRING
							inputtype: { type: "string", required: true }, // INPUT / SELECT / REDIO  / File
							options: { type: "string" }, // RED | GREEN | BLUE
							default: { type: "string" }, //  GREEN
							preview: { type: "Boolean", default: false },
							update: { type: "Boolean", default: false },
							erase: { type: "Boolean", default: false },
							display: { type: "string" }, // IF NEWWORK_SELECTIONS 1(WIFI)
						},
					],
				},
			],
		},
	],
	evolveconfigdata: {
		type: Map,
		of: String,
	},
},{ collection: 'EvolveGatewayConfiguration' })
const EvolveGatewayConfiguration = mongoose.models.EvolveGatewayConfiguration || mongoose.model("EvolveGatewayConfiguration", EvolveGatewayConfigurationSchema);
export default EvolveGatewayConfiguration;