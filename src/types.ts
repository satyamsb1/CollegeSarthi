export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export interface Task {
  id: string; // Keep as string for consistency with DnD library
  columnId: string; // This will be set based on the status of the task
  content: string;
  description: string;
  priority: string;
  mediaUrl: string;
  assignedTo: string;
  createdAt: string;
}

