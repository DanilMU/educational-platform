'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import { useAdminExtendedCoursesQuery } from "@/src/api/hooks/useAdminExtendedCourses"
import { useCreateAdminCourseMutation, useUpdateAdminCourseMutation, useDeleteAdminCourseMutation } from "@/src/api/hooks/useAdminCourses"
import { Skeleton } from "@/src/components/ui/skeleton"
import { Button } from "@/src/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { useState } from "react"
import dynamic from 'next/dynamic';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/components/ui/alert-dialog"
import type { Subject } from "@/src/api/types"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis
} from "@/src/components/ui/pagination"

const LazySubjectForm = dynamic(() => import('./lazy-subject-form'), { ssr: false });

const ITEMS_PER_PAGE = 10;

export function CoursesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);
  const { data, isLoading, isError } = useAdminExtendedCoursesQuery({ skip: (currentPage - 1) * pageSize, take: pageSize });
  const courses = data?.subjects;
  const totalCourses = data?.total || 0;
  const deleteSubjectMutation = useDeleteAdminCourseMutation();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const totalPages = Math.ceil(totalCourses / pageSize);

  const handleEdit = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedSubject(null);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteSubjectMutation.mutate(id);
  };

  const getPaginationItems = () => {
    const pages = [];
    const maxPagesToShow = 5; // e.g., 1, 2, 3, 4, 5, ..., 10

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
      if (currentPage > 2 && currentPage < totalPages - 1) {
        pages.push(currentPage - 1);
      }
      if (currentPage !== 1 && currentPage !== totalPages) {
        pages.push(currentPage);
      }
      if (currentPage < totalPages - 2) {
        pages.push(currentPage + 1);
      }
      if (currentPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages.filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-4">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (isError) {
    return <div className="text-red-500">Ошибка загрузки курсов.</div>
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Создать курс
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedSubject ? 'Редактировать курс' : 'Создать курс'}</DialogTitle>
            </DialogHeader>
            <LazySubjectForm subject={selectedSubject} onSuccess={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название курса</TableHead>
              <TableHead>Темы</TableHead>
              <TableHead>Уроки</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses?.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.topicsCount || 0}</TableCell>
                <TableCell>{course.lessonsCount || 0}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Открыть меню</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(course)}>
                        Редактировать
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Удалить</DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Это действие нельзя отменить. Курс будет удален навсегда.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(course.id)}>Удалить</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              isActive={currentPage > 1}
            />
          </PaginationItem>
          {getPaginationItems().map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => setCurrentPage(page as number)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              isActive={currentPage < totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
