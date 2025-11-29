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
import Image from 'next/image'

interface FileUploadProps {
	value?: string | null
	onChange: (url?: string) => void
	accept?: Accept
	maxSize?: number
	uploadFile: (file: File) => Promise<{ url: string }>
}

interface UploadedFile {
	file: File
	preview: string
	progress: 'pending' | 'uploading' | 'done' | 'error'
	url?: string
}

export const FileUpload: FC<FileUploadProps> = ({
	value,
	onChange,
	accept = { 'image/*': ['.jpeg', '.png', '.jpg'] },
	maxSize = 1024 * 1024 * 5, // 5MB
	uploadFile,
}) => {
	const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
	const [uploadProgress, setUploadProgress] = useState(0)
	const [displayFileUrl, setDisplayFileUrl] = useState<string | null>(value ?? null)

	useEffect(() => {
		// Update displayFileUrl if the external value changes and no file is being uploaded
		if (value !== displayFileUrl && !uploadedFile) {
			setDisplayFileUrl(value ?? null)
		}
	}, [value, displayFileUrl, uploadedFile])

	const onDrop = useCallback(
		async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
			if (fileRejections.length > 0) {
				const rejection = fileRejections[0]
				if (rejection.errors[0].code === 'file-too-large') {
					toast.error(
						`Файл слишком большой. Максимальный размер: ${maxSize / 1024 / 1024}MB.`
					)
				} else {
					toast.error(rejection.errors[0].message)
				}
				return
			}

			if (acceptedFiles.length > 0) {
				const file = acceptedFiles[0]
				const newFile: UploadedFile = {
					file,
					preview: URL.createObjectURL(file),
					progress: 'pending',
				}
				setUploadedFile(newFile)
				setDisplayFileUrl(newFile.preview) // Show local preview immediately

				try {
					setUploadedFile(prev =>
						prev ? { ...prev, progress: 'uploading' } : null
					)

					// Имитация прогресса загрузки
					let progress = 0
					const interval = setInterval(() => {
						progress += 10
						setUploadProgress(progress)
						if (progress >= 90) {
							clearInterval(interval)
						}
					}, 200)

					const result = await uploadFile(file)
					
					clearInterval(interval)
					setUploadProgress(100)

					setUploadedFile(prev =>
						prev
							? { ...prev, progress: 'done', url: result.url }
							: null
					)
					setDisplayFileUrl(result.url) // Update to actual uploaded URL
					onChange(result.url)
					toast.success('Файл успешно загружен!')
				} catch (error) {
					console.error('Ошибка загрузки файла:', error)
					setUploadedFile(prev =>
						prev ? { ...prev, progress: 'error' } : null
					)
					setDisplayFileUrl(value ?? null) // Revert to initial value on error
					toast.error('Не удалось загрузить файл.')
				}
			}
		},
		[maxSize, onChange, uploadFile, value]
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept,
		maxSize,
		multiple: false,
	})

	const removeFile = () => {
		if (uploadedFile) {
			URL.revokeObjectURL(uploadedFile.preview)
		}
		setUploadedFile(null)
		setUploadProgress(0)
		setDisplayFileUrl(null) // Clear display URL
		onChange(undefined)
	}

	const fileToDisplayUrl = uploadedFile && uploadedFile.progress !== 'error' ? (uploadedFile.preview || uploadedFile.url) : displayFileUrl;

	const isBlob = fileToDisplayUrl?.startsWith('blob:');

	return (
		<div>
			{!fileToDisplayUrl ? (
				<div
					{...getRootProps()}
					className={cn(
						'relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 bg-muted/20 p-8 text-center transition-colors',
						isDragActive && 'border-primary bg-primary/10'
					)}
				>
					<input {...getInputProps()} />
					<UploadCloud className='mb-4 h-12 w-12 text-muted-foreground' />
					<p className='font-semibold'>
						Перетащите файл сюда или нажмите для выбора
					</p>
					<p className='text-sm text-muted-foreground'>
						PNG, JPG, JPEG (до 5MB)
					</p>
				</div>
			) : (
				<div className='relative rounded-lg border p-4'>
					<div className='flex items-center space-x-4'>
						{fileToDisplayUrl && fileToDisplayUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
							isBlob ? (
								<img
									src={fileToDisplayUrl}
									alt='Uploaded file'
									className='h-16 w-16 rounded-md object-cover'
								/>
							) : (
								<Image
									src={fileToDisplayUrl}
									alt='Uploaded file'
									width={64}
									height={64}
									className='h-16 w-16 rounded-md object-cover'
								/>
							)
						) : (
							<div className='flex h-16 w-16 items-center justify-center rounded-md bg-muted'>
								<FileIcon className='h-8 w-8 text-muted-foreground' />
							</div>
						)}
						<div className='flex-1'>
							<p className='truncate font-medium'>
								{uploadedFile?.file.name || 'Текущий файл'}
							</p>
							{uploadedFile?.file.size && (
								<p className='text-sm text-muted-foreground'>
									{(uploadedFile.file.size / 1024).toFixed(2)} KB
								</p>
							)}
							{uploadedFile?.progress === 'uploading' && (
								<Progress
									value={uploadProgress}
									className='mt-2 h-2'
								/>
							)}
							{uploadedFile?.progress === 'done' && (
								<div className='mt-1 flex items-center text-sm text-green-600'>
									<CheckCircle className='mr-1 h-4 w-4' />
									Загружено
								</div>
							)}
							{uploadedFile?.progress === 'error' && (
								<div className='mt-1 text-sm text-destructive'>
									Ошибка загрузки
								</div>
							)}
							{!uploadedFile && value && (
								<div className='mt-1 text-sm text-muted-foreground'>
									Уже загружено
								</div>
							)}
						</div>
					</div>
					<Button
						variant='ghost'
						size='icon'
						className='absolute right-2 top-2 h-6 w-6 rounded-full'
						onClick={removeFile}
					>
						{uploadedFile?.progress === 'uploading' ? (
							<Loader2 className='h-4 w-4 animate-spin' />
						) : (
							<X className='h-4 w-4' />
						)}
					</Button>
				</div>
			)}
		</div>
	)
}
