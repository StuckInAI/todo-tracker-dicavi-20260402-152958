import { Task, TaskFilter, TaskStats, Priority, Status, Category } from '@/types/task';
import { isAfter, isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';

export const filterTasks = (tasks: Task[], filter: TaskFilter): Task[] => {
  return tasks.filter((task) => {
    if (filter.status && filter.status !== 'all' && task.status !== filter.status) {
      return false;
    }
    if (filter.priority && filter.priority !== 'all' && task.priority !== filter.priority) {
      return false;
    }
    if (filter.category && filter.category !== 'all' && task.category !== filter.category) {
      return false;
    }
    if (filter.searchQuery && filter.searchQuery.trim() !== '') {
      const query = filter.searchQuery.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesDesc = task.description?.toLowerCase().includes(query) ?? false;
      const matchesTags = task.tags.some((tag) => tag.toLowerCase().includes(query));
      if (!matchesTitle && !matchesDesc && !matchesTags) {
        return false;
      }
    }
    if (filter.dateRange) {
      if (task.dueDate) {
        const due = parseISO(task.dueDate);
        const start = startOfDay(parseISO(filter.dateRange.start));
        const end = endOfDay(parseISO(filter.dateRange.end));
        if (isBefore(due, start) || isAfter(due, end)) {
          return false;
        }
      }
    }
    return true;
  });
};

export const getTaskStats = (tasks: Task[]): TaskStats => {
  const now = new Date();
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    overdue: tasks.filter(
      (t) =>
        t.dueDate &&
        t.status !== 'completed' &&
        isBefore(parseISO(t.dueDate), startOfDay(now))
    ).length,
  };
};

export const sortTasks = (tasks: Task[], sortBy: string): Task[] => {
  const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
  const statusOrder: Record<Status, number> = { 'in-progress': 0, todo: 1, completed: 2 };

  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'status':
        return statusOrder[a.status] - statusOrder[b.status];
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
};

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200';
  }
};

export const getStatusColor = (status: Status): string => {
  switch (status) {
    case 'completed':
      return 'text-green-700 bg-green-100 border-green-300';
    case 'in-progress':
      return 'text-blue-700 bg-blue-100 border-blue-300';
    case 'todo':
      return 'text-gray-700 bg-gray-100 border-gray-300';
  }
};

export const getCategoryColor = (category: Category): string => {
  switch (category) {
    case 'work':
      return 'text-purple-700 bg-purple-100';
    case 'personal':
      return 'text-pink-700 bg-pink-100';
    case 'health':
      return 'text-emerald-700 bg-emerald-100';
    case 'learning':
      return 'text-indigo-700 bg-indigo-100';
    case 'other':
      return 'text-gray-700 bg-gray-100';
  }
};

export const getCategoryIcon = (category: Category): string => {
  switch (category) {
    case 'work':
      return '💼';
    case 'personal':
      return '👤';
    case 'health':
      return '🏃';
    case 'learning':
      return '📚';
    case 'other':
      return '📌';
  }
};

export const isOverdue = (task: Task): boolean => {
  if (!task.dueDate || task.status === 'completed') return false;
  return isBefore(parseISO(task.dueDate), startOfDay(new Date()));
};
