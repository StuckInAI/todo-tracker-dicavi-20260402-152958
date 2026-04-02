'use client';

import { useState } from 'react';
import { Task, Status } from '@/types/task';
import {
  getPriorityColor,
  getStatusColor,
  getCategoryColor,
  getCategoryIcon,
  isOverdue,
} from '@/lib/taskUtils';
import { format, parseISO } from 'date-fns';
import { EditIcon, TrashIcon, ChevronDownIcon } from './Icons';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Status) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const overdue = isOverdue(task);

  const statusOptions: { value: Status; label: string }[] = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  const handleDelete = () => {
    if (showConfirmDelete) {
      onDelete(task.id);
    } else {
      setShowConfirmDelete(true);
      setTimeout(() => setShowConfirmDelete(false), 3000);
    }
  };

  return (
    <div
      className={`card hover:shadow-md transition-shadow duration-200 ${
        task.status === 'completed' ? 'opacity-75' : ''
      } ${overdue ? 'border-red-200 bg-red-50/30' : ''}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() =>
            onStatusChange(
              task.id,
              task.status === 'completed' ? 'todo' : task.status === 'todo' ? 'in-progress' : 'completed'
            )
          }
          className="mt-0.5 flex-shrink-0"
          title="Toggle status"
        >
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              task.status === 'completed'
                ? 'bg-green-500 border-green-500'
                : task.status === 'in-progress'
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            {task.status === 'completed' && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {task.status === 'in-progress' && (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-gray-900 ${
                  task.status === 'completed' ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{task.description}</p>
              )}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit task"
              >
                <EditIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className={`p-1.5 rounded-lg transition-colors ${
                  showConfirmDelete
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                }`}
                title={showConfirmDelete ? 'Click again to confirm' : 'Delete task'}
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`badge ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>

            <span className={`badge ${getStatusColor(task.status)}`}>
              {task.status === 'in-progress' ? 'In Progress' : task.status === 'todo' ? 'To Do' : 'Completed'}
            </span>

            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
              <span>{getCategoryIcon(task.category)}</span>
              <span>{task.category}</span>
            </span>

            {task.dueDate && (
              <span
                className={`text-xs flex items-center gap-1 ${
                  overdue ? 'text-red-600 font-medium' : 'text-gray-500'
                }`}
              >
                {overdue ? '⚠️' : '📅'}
                {format(parseISO(task.dueDate), 'MMM d, yyyy')}
                {overdue && ' (Overdue)'}
              </span>
            )}

            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-indigo-50 text-indigo-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <label className="text-xs text-gray-400">Status:</label>
            <div className="relative">
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value as Status)}
                className="text-xs border border-gray-200 rounded-md px-2 py-1 pr-6 appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
            <span className="text-xs text-gray-400 ml-auto">
              Updated {format(parseISO(task.updatedAt), 'MMM d')}
            </span>
          </div>
        </div>
      </div>

      {showConfirmDelete && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 text-center">
          Click the trash icon again to confirm deletion
        </div>
      )}
    </div>
  );
}
