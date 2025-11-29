import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { uploadFile } from '../requests/file'
import type { FilesControllerUploadFile200 } from '../types'

export function useUploadFileMutation(
	options?: Omit<
		UseMutationOptions<FilesControllerUploadFile200, unknown, File>,
		'mutationFn'
	>
) {
	return useMutation({
		mutationFn: uploadFile,
		...options,
	})
}
