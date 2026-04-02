'use client';

import { PlusIcon, CheckCircleIcon } from './Icons';

interface HeaderProps {
  onAddTask: () => void;
  taskCount: number;
}

export default function Header({ onAddTask, taskCount }: HeaderProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-none">Task Tracker</h1>
              <p className="text-xs text-gray-500 mt-0.5">{today}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {taskCount > 0 && (
              <span className="hidden sm:inline-flex items-center text-sm text-gray-500">
                {taskCount} task{taskCount !== 1 ? 's' : ''}
              </span>
            )}
            <button
              onClick={onAddTask}
              className="btn-primary flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
