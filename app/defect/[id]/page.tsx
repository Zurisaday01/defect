'use client';

import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Page = () => {
	const params = useParams();
	const router = useRouter();
	return (
		<section className='max-w-[600px] mx-auto py-12 '>
			<div className='bg-[#FFFAFD] p-12 rounded-md'>
				<div className='mb-8'>
					<h1 className='text-3xl'>
						Defect created <span className='text-[#8B93FF]'>{params.id}</span>
					</h1>
				</div>
				<Button onClick={() => router.push('/')}>Go Back</Button>
			</div>
		</section>
	);
};
export default Page;
