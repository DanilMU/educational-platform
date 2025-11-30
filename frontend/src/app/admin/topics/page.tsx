import { TopicsTable } from '@/src/components/admin/topics-table';

export default function AdminTopicsPage() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Управление темами</h2>
      <TopicsTable />
    </div>
  );
}
