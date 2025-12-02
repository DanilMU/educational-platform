'use client'

import { useCallback, useState, type FC, useEffect } from 'react'
import { useDropzone, type FileRejection, type Accept } from 'react-dropzone'
import { toast } from 'sonner'
import {
	UploadCloud,
	File as FileIcon,
	X,
	CheckCircle,
	Loader2,
} from 'lucide-react'

import { cn } from '@/src/lib/utils'
import { Progress } from './progress'
import { Button } from './button'

interface MultiFileUploadProps {
	value?: string[]
	onChange: (urls?: string[]) => void
	accept?: Accept
	maxSize?: number
	maxFiles?: number
	uploadFile: (file: File) => Promise<{ filePath: string }>
}

interface UploadedFile {
	file: File
	preview: string
	progress: 'pending' | 'uploading' | 'done' | 'error'
	url?: string
}

export const MultiFileUpload: FC<MultiFileUploadProps> = ({
	value = [],
	onChange,
	accept = { 'application/pdf': ['.pdf'] },
	maxSize = 1024 * 1024 * 5, // 5MB
	maxFiles = 5,
	uploadFile,
}) => {
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

	useEffect(() => {
		if (value.length > 0 && uploadedFiles.length === 0) {
			const initialFiles = value.map(url => ({
				file: new File([], url.split('/').pop() || 'file'),
				preview: url,
				progress: 'done' as const,
				url: url,
			}))
			setUploadedFiles(initialFiles)
		}
		// We only want to run this on mount to initialize from `value`
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onDrop = useCallback(
		async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
			if (fileRejections.length > 0) {
				fileRejections.forEach(({ errors }) => {
					toast.error(errors[0].message)
				})
				return
			}

			const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
				file,
				preview: URL.createObjectURL(file),
				progress: 'pending',
			}))

			setUploadedFiles(prev => [...prev, ...newFiles])

			const uploadPromises = newFiles.map(async newFile => {
				try {
					const result = await uploadFile(newFile.file)
					return result.filePath
				} catch (error) {
					toast.error(`Не удалось загрузить ${newFile.file.name}`)
					return null
				}
			})

			const results = await Promise.all(uploadPromises)
			const successfulUrls = results.filter(
				(url): url is string => url !== null
			)

			// Update the state with final URLs
			setUploadedFiles(prev =>
				prev.map(f => {
					const resultUrl = results.find(url => url?.includes(f.file.name))
					if (resultUrl) {
						return { ...f, progress: 'done', url: resultUrl }
					}
					// Mark as error if upload failed
					if (newFiles.some(nf => nf.file.name === f.file.name && !f.url)) {
						return { ...f, progress: 'error' }
					}
					return f
				})
			)

			onChange([...value, ...successfulUrls])
		},
		[maxFiles, maxSize, onChange, uploadFile, value]
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept,
		maxSize,
		maxFiles,
	})

	const removeFile = (indexToRemove: number) => {
		const fileToRemove = uploadedFiles[indexToRemove]
		if (fileToRemove) {
			URL.revokeObjectURL(fileToRemove.preview)
			const newUploadedFiles = uploadedFiles.filter(
				(_, index) => index !== indexToRemove
			)
			setUploadedFiles(newUploadedFiles)
			const newUrls = newUploadedFiles
				.map(f => f.url)
				.filter((url): url is string => !!url)
			onChange(newUrls)
		}
	}

	return (
		<div className='space-y-4'>
			<div
				{...getRootProps()}
				className={cn(
					'relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 bg-muted/20 p-8 text-center transition-colors',
					isDragActive && 'border-primary bg-primary/10'
				)}
			>
				<input {...getInputProps()} />
				<UploadCloud className='mb-4 h-12 w-12 text-muted-foreground' />
				<p className='font-semibold'>Перетащите файлы сюда или нажмите</p>
				<p className='text-sm text-muted-foreground'>
					Максимум {maxFiles} файлов, до {maxSize / 1024 / 1024}MB каждый.
				</p>
			</div>
			{uploadedFiles.length > 0 && (
				<div className='space-y-2'>
					<h4 className='font-medium'>Загруженные файлы</h4>
					{uploadedFiles.map((uploadedFile, index) => (
						<div
							key={index}
							className='relative flex items-center justify-between rounded-lg border p-2'
						>
							<div className='flex items-center space-x-2'>
								<div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-muted'>
									<FileIcon className='h-6 w-6 text-muted-foreground' />
								</div>
								<div className='flex-1'>
									<p className='truncate text-sm font-medium'>
										{uploadedFile.file.name}
									</p>
									<p className='text-xs text-muted-foreground'>
										{(uploadedFile.file.size / 1024).toFixed(2)} KB
									</p>
								</div>
							</div>
							<Button
								variant='ghost'
								size='icon'
								className='h-6 w-6 rounded-full'
								onClick={() => removeFile(index)}
							>
								<X className='h-4 w-4' />
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
