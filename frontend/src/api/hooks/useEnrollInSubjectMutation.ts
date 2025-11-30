import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollInSubject } from '../requests/subject';
import type { Subject } from '../types';
import { toast } from 'sonner';

export function useEnrollInSubjectMutation() {
  const queryClient = useQueryClient();

  return useMutation<Subject, Error, string>({
    mutationFn: async (subjectId: string) => {
      const response = await enrollInSubject(subjectId);
      return response;
    },
    onSuccess: () => {
      // Инвалидируем соответствующие запросы, чтобы обновить данные
      queryClient.invalidateQueries({ queryKey: ['get enrolled subjects'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['get user progress'] });
      
      // Показываем сообщение об успехе
      toast.success('Вы успешно записались на курс!');
    },
    onError: (error) => {
      // Показываем сообщение об ошибке
      if (error.message.includes('Subject not found')) {
        toast.error('Курс не найден. Возможно, он был удален или временно недоступен.');
      } else if (error.message.includes('Subject is not published')) {
        toast.error('Курс еще не опубликован и временно недоступен для записи.');
      } else {
        toast.error('Произошла ошибка при записи на курс. Пожалуйста, попробуйте еще раз.');
      }
    },
  });
}