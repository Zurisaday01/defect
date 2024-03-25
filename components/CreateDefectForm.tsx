'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { createDefect } from '@/lib/actions/defect.actions';
import { IDefect } from '@/lib/database/models/defect.models';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	date: z.date(),
	time: z.string(),
	testerName: z.string(),
	testCaseNumber: z.string(),
	kindOfTest: z.string(),
	classification: z.string(),
	severity: z.string(),
	stepsToReproduce: z.string().optional(),
	realResults: z.string(),
	expectedResults: z.string().optional(),
	version: z.string(),
	additionalInformation: z.string().optional(),
});

export default function CreateDefectForm() {
	const router = useRouter();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			date: new Date(), // Provide default date value in ISO format if needed
			time: '',
			testerName: '',
			testCaseNumber: '',
			kindOfTest: '',
			classification: '',
			severity: '5',
			stepsToReproduce: '',
			realResults: '',
			expectedResults: '',
			version: '',
			additionalInformation: '',
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.

		const result = await createDefect({
			defectData: {
				...values,
				date: values.date.toISOString(),
				severity: +values.severity,
				realResults: 'Test example',
			} as IDefect,
		});

		if (result && result._id) {
			router.push(`/defect/${result._id}`);
		} else {
			// Handle error or unexpected result
			console.error('Error: Defect not found.');
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='flex gap-7 items-center'>
					<FormField
						control={form.control}
						name='date'
						render={({ field }) => (
							<FormItem className='flex flex-col gap-2'>
								<FormLabel>Date</FormLabel>
								<FormControl>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													disabled={
														form.formState.isSubmitting ||
														form.formState.isLoading
													}
													variant={'outline'}
													className={cn(
														'w-[240px] pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}>
													{field.value ? (
														format(field.value, 'PPP')
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0' align='start'>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
												disabled={date =>
													date > new Date() || date < new Date('1900-01-01')
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='time'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Time</FormLabel>
								<FormControl>
									<Input
										disabled={
											form.formState.isSubmitting || form.formState.isLoading
										}
										placeholder='e.g. 04:18 AM or PM'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name='testerName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tester Name</FormLabel>
							<FormControl>
								<Input
									disabled={
										form.formState.isSubmitting || form.formState.isLoading
									}
									placeholder='Identify the tester'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='testCaseNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Test-case Number</FormLabel>
							<FormControl>
								<Input
									disabled={
										form.formState.isSubmitting || form.formState.isLoading
									}
									placeholder='e.g. TC_CHECKOUT_001'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='kindOfTest'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Kind of Test</FormLabel>
							<FormControl>
								<Select
									disabled={
										form.formState.isSubmitting || form.formState.isLoading
									}
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Choose the kind of test' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='unit'>Unit Test</SelectItem>
										<SelectItem value='integration'>
											Integration Test
										</SelectItem>
										<SelectItem value='system'>System Test</SelectItem>
										<SelectItem value='acceptance'>Acceptance Test</SelectItem>
										<SelectItem value='regression'>Regression Test</SelectItem>
										<SelectItem value='performance'>
											Performance Test
										</SelectItem>
										<SelectItem value='usability'>Usability Test</SelectItem>
										<SelectItem value='functional'>Functional Test</SelectItem>
										<SelectItem value='stress'>Stress Test</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='classification'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Classification</FormLabel>
							<FormControl>
								<Select
									disabled={
										form.formState.isSubmitting || form.formState.isLoading
									}
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Choose the taxonomy used by the work team' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='functionality'>Functionality</SelectItem>
										<SelectItem value='usability'>Usability</SelectItem>
										<SelectItem value='performance'>Performance</SelectItem>
										<SelectItem value='compatibility'>Compatibility</SelectItem>
										<SelectItem value='security'>Security</SelectItem>
										<SelectItem value='localization'>Localization</SelectItem>
										<SelectItem value='other'>Other</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='severity'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Severity</FormLabel>
							<FormControl>
								<Select
									disabled={
										form.formState.isSubmitting || form.formState.isLoading
									}
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Establish the criticality of error (1 - 5)' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='1'>1</SelectItem>
										<SelectItem value='2'>2</SelectItem>
										<SelectItem value='3'>3</SelectItem>
										<SelectItem value='4'>4</SelectItem>
										<SelectItem value='5'>5</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='stepsToReproduce'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Steps to replay the defect</FormLabel>
							<FormControl>
								<Textarea
									disabled={
										form.formState.isSubmitting || form.formState.isLoading
									}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='realResults'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Real Results</FormLabel>
							<FormControl>
								<div className='flex items-center justify-center w-full'>
									<label
										htmlFor='dropzone-file'
										className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-400 dark:bg-gray-400 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
										<div className='flex flex-col items-center justify-center pt-5 pb-6'>
											<svg
												className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
												aria-hidden='true'
												xmlns='http://www.w3.org/2000/svg'
												stroke='#8B93FF'
												fill='none'
												viewBox='0 0 20 16'>
												<path
													stroke='#8B93FF'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
												/>
											</svg>
											<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
												<span className='font-semibold text-[#8B93FF]'>
													Click to upload
												</span>{' '}
												or drag and drop
											</p>
											<p className='text-xs text-gray-500 dark:text-gray-400'>
												Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI,
												Word, PPT
											</p>
										</div>
										<input
											id='dropzone-file'
											type='file'
											className='hidden'
											{...field}
										/>
									</label>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='expectedResults'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Expected Results</FormLabel>
							<FormControl>
								<Textarea
									disabled={
										form.formState.isSubmitting || form.formState.isLoading
									}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='version'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Version</FormLabel>
							<FormControl>
								<Input
									disabled={
										form.formState.isSubmitting || form.formState.isLoading
									}
									placeholder='e.g. 2.1.0'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='additionalInformation'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Additional information</FormLabel>
							<FormControl>
								<Textarea
									disabled={
										form.formState.isSubmitting || form.formState.isLoading
									}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					disabled={form.formState.isSubmitting || form.formState.isLoading}>
					Submit
				</Button>
			</form>
		</Form>
	);
}
