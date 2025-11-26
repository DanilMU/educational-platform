import { instance } from "../instance"
import { Subject } from "../types/subject"
import { EnrolledSubject } from "../types/enrolled-subject"


export const getEnrolledSubjects = async () => {
	const subjects = await instance.get<Subject[]>('/subjects').then(res => res.data);
	
	// Transform the subjects to include name and progress properties
	// In a real implementation, you would calculate actual progress based on user's lesson completion
	return subjects.map(subject => ({
		...subject,
		name: subject.title, // Map title to name
	progress: 0 // Default progress - would be calculated from actual user progress data
	})) as EnrolledSubject[];
}

export const getSubjectById = async (id: string) => {
	return await instance.get<Subject>(`/subjects/${id}`).then(res => res.data);
}
