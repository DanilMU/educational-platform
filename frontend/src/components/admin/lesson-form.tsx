'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@/src/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { useCreateAdminLessonMutation, useUpdateAdminLessonMutation } from '@/src/api/hooks/useAdminLessons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Textarea } from '@/src/components/ui/textarea';
import { useAdminTopicsQuery } from '@/src/api/hooks/useAdminTopics';
import type { Lesson, CreateLessonDto, UpdateLessonDto } from '@/src/api/types';


const lessonSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  content: z.string().min(1, 'Содержание урока обязательно'),
  topicId: z.string().min(1, 'Тема обязательна'),
  estimatedTime: z.string().optional().refine(val => !val || !isNaN(Number(val)), {
    message: 'Примерное время должно быть числом',
  }),
  difficulty: z.string().optional().refine(val => !val || (Number(val) >= 1 && Number(val) <= 5), {
    message: 'Сложность должна быть числом от 1 до 5',
  }),
  learningObjectives: z.string().optional(),
  prerequisites: z.string().optional(),
  videoUrl: z.string().optional(),
  attachments: z.string().optional(),
  order: z.string().optional().refine(val => !val || !isNaN(Number(val)), {
    message: 'Порядок должен быть числом',
  }),
});

type LessonFormValues = z.infer<typeof lessonSchema>;

interface LessonFormProps {
  lesson: Lesson | null;
  onSuccess: () => void;
}

export function LessonForm({ lesson, onSuccess }: LessonFormProps) {
  const createLessonMutation = useCreateAdminLessonMutation();
  const updateLessonMutation = useUpdateAdminLessonMutation();
  const { data: topicsData, isLoading: isLoadingTopics } = useAdminTopicsQuery({ skip: 0, take: 10 }); // Fetch all topics for dropdown
  const topics = topicsData?.data || [];

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: lesson?.title ?? '',
      content: lesson?.content ?? '',
      topicId: lesson?.topicId ?? '',
      estimatedTime: lesson?.estimatedTime?.toString() ?? '',
      difficulty: lesson?.difficulty?.toString() ?? '',
      learningObjectives: lesson?.learningObjectives ?? '',
      prerequisites: lesson?.prerequisites ?? '',
      videoUrl: lesson?.videoUrl ?? '',
      attachments: lesson?.attachments?.join(', ') ?? '', // Convert array to comma-separated string
      order: lesson?.order?.toString() ?? '',
    },
  });

  const onSubmit = (values: LessonFormValues) => {
    const data: CreateLessonDto | UpdateLessonDto = {
      title: values.title,
      content: values.content,
      topicId: values.topicId,
      estimatedTime: values.estimatedTime ? Number(values.estimatedTime) : undefined,
      difficulty: values.difficulty ? Number(values.difficulty) : undefined,
      learningObjectives: values.learningObjectives || undefined,
      prerequisites: values.prerequisites || undefined,
      videoUrl: values.videoUrl || undefined,
      attachments: values.attachments ? values.attachments.split(',').map(s => s.trim()) : undefined,
      order: values.order ? Number(values.order) : undefined,
    };
    
    if (lesson) {
      updateLessonMutation.mutate({ id: lesson.id, lessonData: data as UpdateLessonDto }, { onSuccess });
    } else {
      createLessonMutation.mutate(data as CreateLessonDto, { onSuccess });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Название урока" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Содержание</FormLabel>
              <FormControl>
                <Textarea placeholder="Содержание урока" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topicId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тема</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тему" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingTopics ? (
                    <SelectItem value="loading" disabled>Загрузка тем...</SelectItem>
                  ) : (
                    topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Порядок</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Порядковый номер" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estimatedTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Примерное время (мин)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Время в минутах" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Сложность (1-5)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Сложность от 1 до 5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL видео</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/video.mp4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="learningObjectives"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цели обучения</FormLabel>
              <FormControl>
                <Textarea placeholder="Цели обучения через запятую" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prerequisites"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Предварительные требования</FormLabel>
              <FormControl>
                <Textarea placeholder="Предварительные требования через запятую" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attachments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Вложения (через запятую)</FormLabel>
              <FormControl>
                <Textarea placeholder="URL вложений через запятую" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createLessonMutation.isPending || updateLessonMutation.isPending}>
          {lesson ? 'Сохранить изменения' : 'Создать урок'}
        </Button>
      </form>
    </Form>
  );
}
