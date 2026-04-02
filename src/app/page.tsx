'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import Header from '@/components/Header';
import StatsBar from '@/components/StatsBar';
import FilterBar from '@/components/FilterBar';
import TaskList from '@/components/TaskList';
import TaskModal from '@/components/TaskModal';
import EmptyState from '@/components/EmptyState';
import { Task } from '@/types/task';

export default function Home() {
  const {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    stats,
    isLoaded,
    createTask,
    editTask,
    removeTask,
    changeStatus,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = (data: Parameters<typeof createTask>[0]) => {
    if (editingTask) {
      editTask({ ...editingTask, ...data, updatedAt: new Date().toISOString() });
    } else {
      createTask(data);
    }
    handleCloseModal();
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddTask={handleOpenCreate} taskCount={tasks.length} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <StatsBar stats={stats} />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={filteredTasks.length}
        />

        {filteredTasks.length === 0 ? (
          <EmptyState
            hasFilters={
              filter.status !== 'all' ||
              filter.priority !== 'all' ||
              filter.category !== 'all' ||
              (filter.searchQuery?.trim() ?? '') !== ''
            }
            onAddTask={handleOpenCreate}
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleOpenEdit}
            onDelete={removeTask}
            onStatusChange={changeStatus}
          />
        )}
      </main>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleSaveTask}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
