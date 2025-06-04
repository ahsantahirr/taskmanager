
import { useState, useEffect } from 'react';
import { Task, CreateTaskData, UpdateTaskData } from '../types/Task';
import { getTasks, subscribeToTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { toast } from '@/hooks/use-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToTasks((updatedTasks) => {
      setTasks(updatedTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateTask = async (taskData: CreateTaskData) => {
    try {
      await createTask(taskData);
      toast({
        title: "Success",
        description: "Task created successfully!",
      });
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTask = async (taskId: string, updateData: UpdateTaskData) => {
    try {
      await updateTask(taskId, updateData);
      toast({
        title: "Success",
        description: "Task updated successfully!",
      });
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast({
        title: "Success",
        description: "Task deleted successfully!",
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
    await handleUpdateTask(taskId, { completed: !completed });
  };

  return {
    tasks,
    loading,
    error,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    toggleTaskCompletion,
  };
};
