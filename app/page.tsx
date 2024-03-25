import CreateDefectForm from '@/components/CreateDefectForm';

export default function Home() {
	return (
		<main className='max-w-[600px] mx-auto py-12 '>
			<div className='bg-[#FFFAFD] p-12 rounded-md'>
				<div className='mb-8'>
					<h1 className='text-3xl'>Defect record</h1>
					<p className='text-xl'>Efficiently Capture and Track Issues</p>
				</div>

				<CreateDefectForm />
			</div>
		</main>
	);
}
