import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskFilter, Priority, Status, Category } from '@/types/task';
import { getTasks, addTask, updateTask, deleteTask, saveTasks } from '@/lib/storage';
import { filterTasks, sortTasks, getTaskStats } from '@/lib/taskUtils';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>({
    status: 'all',
    priority: 'all',
    category: 'all',
    searchQuery: '',
  });
  const [sortBy, setSortBy] = useState('createdAt');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = getTasks();
    setTasks(stored);
    setIsLoaded(true);
  }, []);

  const createTask = useCallback(
    (data: {
      title: string;
      description?: string;
      priority: Priority;
      category: Category;
      dueDate?: string;
      tags: string[];
    }) => {
      const now = new Date().toISOString();
      const newTask: Task = {
        id: uuidv4(),
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: 'todo',
        category: data.category,
        dueDate: data.dueDate,
        createdAt: now,
        updatedAt: now,
        tags: data.tags,
      };
      const updated = addTask(newTask);
      setTasks(updated);
      return newTask;
    },
    []
  );

  const editTask = useCallback((task: Task) => {
    const updated = updateTask({ ...task, updatedAt: new Date().toISOString() });
    setTasks(updated);
  }, []);

  const removeTask = useCallback((taskId: string) => {
    const updated = deleteTask(taskId);
    setTasks(updated);
  }, []);

  const changeStatus = useCallback((taskId: string, status: Status) => {
    const tasks = getTasks();
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const updated = updateTask({ ...task, status, updatedAt: new Date().toISOString() });
      setTasks(updated);
    }
  }, []);

  const reorderTasks = useCallback((newOrder: Task[]) => {
    saveTasks(newOrder);
    setTasks(newOrder);
  }, []);

  const filteredAndSortedTasks = sortTasks(filterTasks(tasks, filter), sortBy);
  const stats = getTaskStats(tasks);

  return {
    tasks,
    filteredTasks: filteredAndSortedTasks,
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
    reorderTasks,
  };
};
