import { Schema, model, models } from 'mongoose';

export interface IDefect {
	date: string;
	time: string;
	testerName: string;
	testCaseNumber: string;
	kindOfTest: string;
	classification: string;
	severity: number;
	stepsToReproduce: string;
	realResults?: string;
	expectedResults?: string;
	version: string;
	additionalInformation?: string;
}

const DefectSchema: Schema = new Schema({
	date: {
		type: Date,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	testerName: {
		type: String,
		required: true,
	},
	testCaseNumber: {
		type: String,
		required: true,
	},
	kindOfTest: {
		type: String,
		required: true,
	},
	classification: {
		type: String,
		required: true,
		default: 5,
	},
	severity: {
		type: Number,
		required: true,
	},
	stepsToReproduce: {
		type: String,
	},
	realResults: {
		type: String,
		required: true,
	},
	expectedResults: {
		type: String,
	},
	version: {
		type: String,
		required: true,
	},
	additionalInformation: {
		type: String,
	},
});

const Defect = models?.Defect || model('Defect', DefectSchema);

export default Defect;
