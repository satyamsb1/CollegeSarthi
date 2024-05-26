<<<<<<< HEAD
import { useMemo, useState } from "react";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors,
=======
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
>>>>>>> origin/master
} from "@dnd-kit/core";

import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
<<<<<<< HEAD

const defaultCols: Column[] = [
  {
    id: "todo",
    title: "Open",
  },
  {
    id: "doing",
    title: "In-progress",
  },
  {
    id: "done",
    title: "Closed",
  },
];

const defaultTasks: Task[] = [
  {
    id: "1",
    columnId: "todo",
    content: "Unable to connect to campus WiFi in specified locations.",
  },
  {
    id: "2",
    columnId: "todo",
    content: "Assistance required for recovering the email account.",
  },
  {
    id: "3",
    columnId: "doing",
    content: "Request for installation of specific software for academic use.",
  },
  {
    id: "4",
    columnId: "doing",
    content: "Assistance required for recovering the email account.",
  },
  {
    id: "5",
    columnId: "done",
    content: "Assistance required for recovering the email account.",
  },
  {
    id: "6",
    columnId: "done",
    content: "Assistance required for recovering the email account.",
  },
  {
    id: "7",
    columnId: "done",
    content: "Request for temporary loan of a laptop for academic purposes.",
  },
  {
    id: "8",
    columnId: "todo",
    content: "Request for installation of specific software for academic use.",
  },
  {
    id: "9",
    columnId: "todo",
    content: "Unable to connect to network printers from dormitory.",
  },
  {
    id: "10",
    columnId: "todo",
    content: "Request for temporary loan of a laptop for academic purposes.",
  },
  {
    id: "11",
    columnId: "todo",
    content: "Assistance required for recovering the email account.",
  },
  {
    id: "12",
    columnId: "doing",
    content: "Assistance required for recovering the email account.",
  },
  {
    id: "13",
    columnId: "doing",
    content: "Request for installation of specific software for academic use.",
  },
];
=======
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
>>>>>>> origin/master

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
<<<<<<< HEAD

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

=======
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


>>>>>>> origin/master
  return (
    <>
      <div className="flex justify-center">
        <div className="count text-2xl font-bold mt-5 text-center w-1/6">
          <p>Total Tickets: {tasks.length}</p>
<<<<<<< HEAD
        </div>
      </div>

      <div
        className="
        m-auto
        flex
        w-full
        items-center
        overflow-x-auto
      overflow-y-hidden
      my-10
      px-[40px] 
    ">
=======
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
>>>>>>> origin/master
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
<<<<<<< HEAD
          onDragOver={onDragOver}>
=======
          onDragOver={onDragOver}
        >
>>>>>>> origin/master
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

<<<<<<< HEAD
  function createTask(columnId: Id) {
=======
  function createTask(columnId: string) {
>>>>>>> origin/master
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
<<<<<<< HEAD
    };

=======
      description: "",
      priority: "Low",
      mediaUrl: "",
      assignedTo: "",
      createdAt: new Date().toISOString(),
    };
>>>>>>> origin/master
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
<<<<<<< HEAD
      return { ...task, content };
    });

    setTasks(newTasks);
  }



=======
      return {
        ...task, content
      };
    });
    setTasks(newTasks);
  }

>>>>>>> origin/master
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
<<<<<<< HEAD

=======
>>>>>>> origin/master
    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
<<<<<<< HEAD
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
=======
    } else if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
>>>>>>> origin/master
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

<<<<<<< HEAD
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
=======
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
>>>>>>> origin/master
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

<<<<<<< HEAD
    const activeId = active.id;
    const overId = over.id;

=======
    const activeId = active.id as string;
    const overId = over.id as string;
>>>>>>> origin/master
    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

<<<<<<< HEAD
    if (!isActiveATask) return;

    // Im dropping a Task over another Task
=======
>>>>>>> origin/master
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

<<<<<<< HEAD
        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
=======
        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          const newColumnId = tasks[overIndex].columnId;
          const newStatusId = statusMap[newColumnId];
          tasks[activeIndex].columnId = newColumnId;

          updateTaskStatus(activeId, newStatusId);

          setPopupVisible(true);

>>>>>>> origin/master
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
<<<<<<< HEAD
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
=======
    } else if (isActiveATask && over.data.current?.type === "Column") {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const newColumnId = overId.toString();
        const newStatusId = statusMap[newColumnId];
        tasks[activeIndex].columnId = newColumnId;


        updateTaskStatus(activeId, newStatusId);

        setPopupVisible(true);

        return tasks;
>>>>>>> origin/master
      });
    }
  }
}

function generateId() {
<<<<<<< HEAD
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
=======
  return Math.floor(Math.random() * 10001).toString();
}

export default KanbanBoard;
>>>>>>> origin/master
