import { instance } from '../instance'
import type { FilesControllerUploadFile200 } from '../types'

export const uploadFile = async (file: File) => {
	const formData = new FormData()
	formData.append('file', file)

	return await instance
		.post<FilesControllerUploadFile200>('/files/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then(res => res.data)
}
