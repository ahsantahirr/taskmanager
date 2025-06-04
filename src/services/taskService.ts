
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Task, CreateTaskData, UpdateTaskData } from '../types/Task';

const COLLECTION_NAME = 'tasks';

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  try {
    const tasksRef = collection(db, COLLECTION_NAME);
    const q = query(tasksRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Task[];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Real-time listener for tasks
export const subscribeToTasks = (callback: (tasks: Task[]) => void) => {
  const tasksRef = collection(db, COLLECTION_NAME);
  const q = query(tasksRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const tasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Task[];
    
    callback(tasks);
  });
};

// Create a new task
export const createTask = async (taskData: CreateTaskData): Promise<string> => {
  try {
    const tasksRef = collection(db, COLLECTION_NAME);
    const now = Timestamp.now();
    
    const docRef = await addDoc(tasksRef, {
      ...taskData,
      completed: false,
      createdAt: now,
      updatedAt: now,
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update a task
export const updateTask = async (taskId: string, updateData: UpdateTaskData): Promise<void> => {
  try {
    const taskRef = doc(db, COLLECTION_NAME, taskId);
    await updateDoc(taskRef, {
      ...updateData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    const taskRef = doc(db, COLLECTION_NAME, taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
