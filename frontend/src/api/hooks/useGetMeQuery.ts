import { useQuery } from '@tanstack/react-query';
import { usersControllerGetMe } from '../generated-client';
import type { GetMeDto } from '../types';

export function useGetMeQuery() {
  return useQuery<GetMeDto>({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await usersControllerGetMe();
      return response;
    },
  });
}
