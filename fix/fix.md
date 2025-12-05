  Overload 2 of 3, '(options: UndefinedInitialDataOptions<PaginatedSubjectsDto, Error, PaginatedSubjectsDto, readonly unknown[]>, queryClient?: QueryClient | undefined): UseQueryResult<...>', gave the following error.
    Type '() => Promise<{ data: AdminSubject[]; total: number; }>' is not assignable to type 'unique symbol | QueryFunction<PaginatedSubjectsDto, readonly unknown[], never> | undefined'.
      Type '() => Promise<{ data: AdminSubject[]; total: number; }>' is not assignable to type 'QueryFunction<PaginatedSubjectsDto, readonly unknown[], never>'.
        Type 'Promise<{ data: AdminSubject[]; total: number; }>' is not assignable to type 'PaginatedSubjectsDto | Promise<PaginatedSubjectsDto>'.
          Type 'Promise<{ data: AdminSubject[]; total: number; }>' is not assignable to type 'Promise<PaginatedSubjectsDto>'.
            Type '{ data: AdminSubject[]; total: number; }' is not assignable to type 'PaginatedSubjectsDto'.
              Types of property 'data' are incompatible.
                Type 'AdminSubject[]' is not assignable to type 'PaginatedSubjectsDtoDataItem[]'.
                  Type 'AdminSubject' is not assignable to type 'PaginatedSubjectsDtoDataItem'.
                    Index signature for type 'string' is missing in type 'AdminSubject'.
  Overload 3 of 3, '(options: UseQueryOptions<PaginatedSubjectsDto, Error, PaginatedSubjectsDto, readonly unknown[]>, queryClient?: QueryClient | undefined): UseQueryResult<...>', gave the following error.
    Type '() => Promise<{ data: AdminSubject[]; total: number; }>' is not assignable to type 'unique symbol | QueryFunction<PaginatedSubjectsDto, readonly unknown[], never> | undefined'.
      Type '() => Promise<{ data: AdminSubject[]; total: number; }>' is not assignable to type 'QueryFunction<PaginatedSubjectsDto, readonly unknown[], never>'.
        Type 'Promise<{ data: AdminSubject[]; total: number; }>' is not assignable to type 'PaginatedSubjectsDto | Promise<PaginatedSubjectsDto>'.
          Type 'Promise<{ data: AdminSubject[]; total: number; }>' is not assignable to type 'Promise<PaginatedSubjectsDto>'.
            Type '{ data: AdminSubject[]; total: number; }' is not assignable to type 'PaginatedSubjectsDto'.
              Types of property 'data' are incompatible.
                Type 'AdminSubject[]' is not assignable to type 'PaginatedSubjectsDtoDataItem[]'.
                  Type 'AdminSubject' is not assignable to type 'PaginatedSubjectsDtoDataItem'.
                    Index signature for type 'string' is missing in type 'AdminSubject'.
                     return useQuery<PaginatedSubjectsDto>({
  13 |     queryKey: ['admin-courses', skip, take],
> 14 |     queryFn: async () => {
     |     ^
  15 |       return await adminApiAdapter.getAllCourses({ skip: skip?.toString(), take: take?.toString() });
  16 |     },
  17 |     staleTime: 5 * 60 * 1000, // 5 минут
Next.js build worker exited with code: 1 and signal: null
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
Error: Command "yarn build" exited with 1