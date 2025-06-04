
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, CheckCircle, Circle, List } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../types/Task';

export const TaskManager = () => {
  const { tasks, loading, createTask, updateTask, deleteTask, toggleTaskCompletion } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.filter(task => !task.completed).length;

  const handleCreateTask = (data: { title: string; description: string }) => {
    createTask(data);
  };

  const handleEditTask = (data: { title: string; description: string }) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      setEditingTask(null);
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600 text-lg">
            Organize your tasks efficiently with Firebase
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border-0 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
              </div>
              <List className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border-0 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-2xl font-bold text-orange-600">{activeCount}</p>
              </div>
              <Circle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border-0 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
            >
              All ({tasks.length})
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              onClick={() => setFilter('active')}
              className={filter === 'active' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
            >
              Active ({activeCount})
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
            >
              Completed ({completedCount})
            </Button>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 shadow-md border-0 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <List className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? 'Create your first task to get started!' 
                  : `You don't have any ${filter} tasks.`
                }
              </p>
              {filter === 'all' && (
                <Button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditClick}
                onDelete={deleteTask}
                onToggleComplete={toggleTaskCompletion}
              />
            ))}
          </div>
        )}

        {/* Task Form Modal */}
        <TaskForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={editingTask ? handleEditTask : handleCreateTask}
          task={editingTask}
          title={editingTask ? 'Edit Task' : 'Create New Task'}
        />
      </div>
    </div>
  );
};
