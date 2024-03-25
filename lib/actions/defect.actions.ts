'use server';

import { connectToDatabase } from '../database/mongoose';
import Defect, { IDefect } from '../database/models/defect.models';

// CREATE DEFECT
export async function createDefect({ defectData }: { defectData: IDefect }) {
	try {
		await connectToDatabase();

		const newDefect = await Defect.create({
			...defectData,
		});

		console.log('NEW', newDefect);

		return JSON.parse(JSON.stringify(newDefect));
	} catch (error) {
		console.log((error as Error).message);
	}
}
