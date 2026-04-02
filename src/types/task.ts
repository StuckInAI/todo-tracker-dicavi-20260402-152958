export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'completed';
export type Category = 'work' | 'personal' | 'health' | 'learning' | 'other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  category: Category;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface TaskFilter {
  status?: Status | 'all';
  priority?: Priority | 'all';
  category?: Category | 'all';
  searchQuery?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  overdue: number;
}
