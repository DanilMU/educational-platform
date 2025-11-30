'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@/src/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { useCreateSubjectMutation, useUpdateSubjectMutation } from '@/src/api/hooks/useSubjectMutations';
import type { Subject, CreateSubjectDto, UpdateSubjectDto } from '@/src/api/types';

const subjectSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

interface SubjectFormProps {
  subject: Subject | null;
  onSuccess: () => void;
}

export function SubjectForm({ subject, onSuccess }: SubjectFormProps) {
  const createSubjectMutation = useCreateSubjectMutation();
  const updateSubjectMutation = useUpdateSubjectMutation();

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      title: subject?.title ?? '',
      description: typeof subject?.description === 'object' && subject.description && 'text' in subject.description ? (subject.description as { text: string }).text : subject?.description as unknown as string ?? '',
    },
  });

  const onSubmit = (values: SubjectFormValues) => {
    const mutation = subject ? updateSubjectMutation : createSubjectMutation;
    const data: CreateSubjectDto | UpdateSubjectDto = values;
    
    if (subject) {
      updateSubjectMutation.mutate({ id: subject.id, data: data as UpdateSubjectDto }, { onSuccess });
    } else {
      createSubjectMutation.mutate(data as CreateSubjectDto, { onSuccess });
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
                <Input placeholder="Новый курс" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Input placeholder="Описание курса" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createSubjectMutation.isPending || updateSubjectMutation.isPending}>
          {subject ? 'Сохранить изменения' : 'Создать курс'}
        </Button>
      </form>
    </Form>
  );
}
