'use client';

import { TaskFilter } from '@/types/task';
import { SearchIcon, FilterIcon } from './Icons';

interface FilterBarProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalCount: number;
}

export default function FilterBar({
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
  totalCount,
}: FilterBarProps) {
  const updateFilter = (updates: Partial<TaskFilter>) => {
    onFilterChange({ ...filter, ...updates });
  };

  return (
    <div className="card space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks by title, description, or tags..."
            value={filter.searchQuery || ''}
            onChange={(e) => updateFilter({ searchQuery: e.target.value })}
            className="input-field pl-9"
          />
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
          <FilterIcon className="w-3.5 h-3.5" />
          <span>{totalCount} result{totalCount !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          value={filter.status || 'all'}
          onChange={(e) => updateFilter({ status: e.target.value as TaskFilter['status'] })}
          className="select-field flex-1 min-w-[120px]"
        >
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filter.priority || 'all'}
          onChange={(e) => updateFilter({ priority: e.target.value as TaskFilter['priority'] })}
          className="select-field flex-1 min-w-[120px]"
        >
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={filter.category || 'all'}
          onChange={(e) => updateFilter({ category: e.target.value as TaskFilter['category'] })}
          className="select-field flex-1 min-w-[120px]"
        >
          <option value="all">All Categories</option>
          <option value="work">💼 Work</option>
          <option value="personal">👤 Personal</option>
          <option value="health">🏃 Health</option>
          <option value="learning">📚 Learning</option>
          <option value="other">📌 Other</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="select-field flex-1 min-w-[120px]"
        >
          <option value="createdAt">Newest First</option>
          <option value="priority">By Priority</option>
          <option value="status">By Status</option>
          <option value="dueDate">By Due Date</option>
          <option value="title">Alphabetical</option>
        </select>
      </div>
    </div>
  );
}
