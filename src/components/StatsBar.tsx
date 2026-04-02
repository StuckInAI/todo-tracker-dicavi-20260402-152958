'use client';

import { TaskStats } from '@/types/task';

interface StatsBarProps {
  stats: TaskStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statItems = [
    {
      label: 'Total',
      value: stats.total,
      color: 'text-gray-700',
      bg: 'bg-gray-100',
      dot: 'bg-gray-400',
    },
    {
      label: 'To Do',
      value: stats.todo,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      dot: 'bg-gray-400',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      dot: 'bg-blue-500',
    },
    {
      label: 'Completed',
      value: stats.completed,
      color: 'text-green-700',
      bg: 'bg-green-50',
      dot: 'bg-green-500',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      color: 'text-red-700',
      bg: 'bg-red-50',
      dot: 'bg-red-500',
    },
  ];

  return (
    <div className="card">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {statItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${item.bg}`}
            >
              <span className={`w-2 h-2 rounded-full ${item.dot}`} />
              <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
              <span className="text-xs text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>

        {stats.total > 0 && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-500">Completion</p>
              <p className="text-sm font-bold text-gray-800">{completionRate}%</p>
            </div>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
