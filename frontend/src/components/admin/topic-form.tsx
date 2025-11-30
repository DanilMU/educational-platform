'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@/src/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { useCreateTopicMutation, useUpdateTopicMutation } from '@/src/api/hooks/useTopicMutations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import type { Topic, CreateTopicDto, UpdateTopicDto } from '@/src/api/types';
import { useGetAllCoursesQuery } from '@/src/api/hooks/useGetAllCoursesQuery';

const topicSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  subjectId: z.string().min(1, 'Курс обязателен'),
});

type TopicFormValues = z.infer<typeof topicSchema>;

interface TopicFormProps {
  topic: Topic | null;
  onSuccess: () => void;
}

export function TopicForm({ topic, onSuccess }: TopicFormProps) {
  const createTopicMutation = useCreateTopicMutation();
  const updateTopicMutation = useUpdateTopicMutation();
  const { data: courses, isLoading: isLoadingCourses } = useGetAllCoursesQuery();

  const form = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      title: topic?.title ?? '',
      subjectId: topic?.subjectId ?? '',
    },
  });

  const onSubmit = (values: TopicFormValues) => {
    const data: CreateTopicDto | UpdateTopicDto = values;
    
    if (topic) {
      updateTopicMutation.mutate({ id: topic.id, data: data as UpdateTopicDto }, { onSuccess });
    } else {
      createTopicMutation.mutate(data as CreateTopicDto, { onSuccess });
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
                <Input placeholder="Новая тема" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subjectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Курс</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите курс" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingCourses ? (
                    <SelectItem value="" disabled>Загрузка курсов...</SelectItem>
                  ) : (
                    courses?.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createTopicMutation.isPending || updateTopicMutation.isPending}>
          {topic ? 'Сохранить изменения' : 'Создать тему'}
        </Button>
      </form>
    </Form>
  );
}
