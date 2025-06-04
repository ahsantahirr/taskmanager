
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Trash } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string, completed: boolean) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 shadow-md ${
      task.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id, task.completed)}
            className="mt-1 transition-all duration-200"
          />
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold mb-2 transition-all duration-200 ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mb-3 transition-all duration-200 ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">
                Created: {formatDate(task.createdAt)}
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="h-8 w-8 p-0 hover:bg-purple-100 hover:text-purple-600 transition-all duration-200"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                  className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
