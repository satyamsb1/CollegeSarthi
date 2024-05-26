import { useEffect, useMemo, useState } from "react";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { httpReqWithToken } from "../apis/httpreq";

const defaultCols: Column[] = [
  { id: "open", title: "Open" },
  { id: "in-progress", title: "In-progress" },
  { id: "closed", title: "Closed" },
];

const statusMap: Record<string, number> = {
  "open": 1,
  "in-progress": 3,
  "closed": 2,
};

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  useEffect(() => {
    const getTasks = async () => {
      const response = await httpReqWithToken.get('/app/ticket/staff');
      const fetchedTasks = response.data.map((task: any) => ({
        id: task.id.toString(),
        columnId: task.status.name.toLowerCase().replace(" ", "-"),
        content: task.title,
        description: task.description,
        priority: task.priority.name,
        mediaUrl: task.media?.url,
        assignedTo: `${task.assigned_to.first_name} ${task.assigned_to.last_name}`,
        createdAt: task.created_at,
      }));
      setTasks(fetchedTasks);
    };

    getTasks();
  }, []);

  const updateTaskStatus = async (taskId: string, statusId: number) => {
    await httpReqWithToken.put('/app/ticket/status', {
      ticket_id: taskId,
      status_id: statusId
    });
  };


  return (
    <>
      <div className="flex justify-center">
        <div className="count text-2xl font-bold mt-5 text-center w-1/6">
          <p>Total Tickets: {tasks.length}</p>
          {popupVisible && (
            <>
              <p className="text-lg font-semibold">Ticket updated Succesfully</p>
              <button

                onClick={() => setPopupVisible(false)}
                className="bg-[#0c66e4] text-white px-4 py-2 mt-4 rounded-md"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>

      <div className="m-auto flex w-full items-center overflow-x-auto overflow-y-hidden my-10 px-[40px]">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="m-auto flex gap-4">
            <div className="flex gap-4">
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    tasks={tasks.filter((task) => task.columnId === col.id)}
                  />
                ))}
              </SortableContext>
            </div>
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </>
  );

  function createTask(columnId: string) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
      description: "",
      priority: "Low",
      mediaUrl: "",
      assignedTo: "",
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return {
        ...task, content
      };
    });
    setTasks(newTasks);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    } else if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (isActiveAColumn) {
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
        const overColumnIndex = columns.findIndex((col) => col.id === overId);
        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
    } else {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === activeId);
        const overTaskIndex = tasks.findIndex((task) => task.id === overId);
        const overTask = tasks[overTaskIndex];

        if (overTask && tasks[activeTaskIndex].columnId !== overTask.columnId) {
          const newColumnId = overTask.columnId;
          const newStatusId = statusMap[newColumnId];
          tasks[activeTaskIndex].columnId = newColumnId;

          updateTaskStatus(activeId, newStatusId);

          setPopupVisible(true);

          return arrayMove(tasks, activeTaskIndex, overTaskIndex - 1);
        }

        return arrayMove(tasks, activeTaskIndex, overTaskIndex);
      });
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          const newColumnId = tasks[overIndex].columnId;
          const newStatusId = statusMap[newColumnId];
          tasks[activeIndex].columnId = newColumnId;

          updateTaskStatus(activeId, newStatusId);

          setPopupVisible(true);

          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    } else if (isActiveATask && over.data.current?.type === "Column") {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const newColumnId = overId.toString();
        const newStatusId = statusMap[newColumnId];
        tasks[activeIndex].columnId = newColumnId;


        updateTaskStatus(activeId, newStatusId);

        setPopupVisible(true);

        return tasks;
      });
    }
  }
}

function generateId() {
  return Math.floor(Math.random() * 10001).toString();
}

export default KanbanBoard;