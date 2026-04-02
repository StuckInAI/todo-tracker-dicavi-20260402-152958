'use client';

interface EmptyStateProps {
  hasFilters: boolean;
  onAddTask: () => void;
}

export default function EmptyState({ hasFilters, onAddTask }: EmptyStateProps) {
  return (
    <div className="card flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">{hasFilters ? '🔍' : '📋'}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {hasFilters ? 'No tasks match your filters' : 'No tasks yet'}
      </h3>
      <p className="text-sm text-gray-500 mb-6 max-w-xs">
        {hasFilters
          ? 'Try adjusting your search or filter criteria to find what you are looking for.'
          : 'Start organizing your day by creating your first task. Stay productive and on track!'}
      </p>
      {!hasFilters && (
        <button onClick={onAddTask} className="btn-primary">
          + Create your first task
        </button>
      )}
    </div>
  );
}
