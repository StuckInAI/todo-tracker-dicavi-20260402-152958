import { Task } from '@/types/task';

const STORAGE_KEY = 'daily_tasks';

export const getTasks = (): Task[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
};

export const addTask = (task: Task): Task[] => {
  const tasks = getTasks();
  const updated = [task, ...tasks];
  saveTasks(updated);
  return updated;
};

export const updateTask = (updatedTask: Task): Task[] => {
  const tasks = getTasks();
  const updated = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
  saveTasks(updated);
  return updated;
};

export const deleteTask = (taskId: string): Task[] => {
  const tasks = getTasks();
  const updated = tasks.filter((t) => t.id !== taskId);
  saveTasks(updated);
  return updated;
};

export const clearAllTasks = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};
