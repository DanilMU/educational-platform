import { useQuery } from '@tanstack/react-query';
import { getAllSubjects } from '../requests/subject';
import { Subject } from '../types';

export function useGetAllCoursesQuery() {
  return useQuery<Subject[]>({
    queryKey: ['allCourses'],
    queryFn: async () => {
      const response = await getAllSubjects("0", "1000"); // Fetching a large number of subjects for "all courses"
      return response.data; // Extracting the data array from the paginated response
    },
    staleTime: Infinity, // Courses don't change often
  });
}
