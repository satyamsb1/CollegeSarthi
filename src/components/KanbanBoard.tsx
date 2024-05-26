// import { useMemo, useState } from "react";
// import { Column, Id, Task } from "../types";
// import ColumnContainer from "./ColumnContainer";
// import {
//   DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors,
// } from "@dnd-kit/core";

// import { SortableContext, arrayMove } from "@dnd-kit/sortable";
// import { createPortal } from "react-dom";
// import TaskCard from "./TaskCard";

// const defaultCols: Column[] = [
//   {
//     id: "todo",
//     title: "Open",
//   },
//   {
//     id: "doing",
//     title: "In-progress",
//   },
//   {
//     id: "done",
//     title: "Closed",
//   },
// ];

// const defaultTasks: Task[] = [
//   {
//     id: "1",
//     columnId: "todo",
//     content: "Unable to connect to campus WiFi in specified locations.",
//   },
//   {
//     id: "2",
//     columnId: "todo",
//     content: "Assistance required for recovering the email account.",
//   },
//   {
//     id: "3",
//     columnId: "doing",
//     content: "Request for installation of specific software for academic use.",
//   },
//   {
//     id: "4",
//     columnId: "doing",
//     content: "Assistance required for recovering the email account.",
//   },
//   {
//     id: "5",
//     columnId: "done",
//     content: "Assistance required for recovering the email account.",
//   },
//   {
//     id: "6",
//     columnId: "done",
//     content: "Assistance required for recovering the email account.",
//   },
//   {
//     id: "7",
//     columnId: "done",
//     content: "Request for temporary loan of a laptop for academic purposes.",
//   },
//   {
//     id: "8",
//     columnId: "todo",
//     content: "Request for installation of specific software for academic use.",
//   },
//   {
//     id: "9",
//     columnId: "todo",
//     content: "Unable to connect to network printers from dormitory.",
//   },
//   {
//     id: "10",
//     columnId: "todo",
//     content: "Request for temporary loan of a laptop for academic purposes.",
//   },
//   {
//     id: "11",
//     columnId: "todo",
//     content: "Assistance required for recovering the email account.",
//   },
//   {
//     id: "12",
//     columnId: "doing",
//     content: "Assistance required for recovering the email account.",
//   },
//   {
//     id: "13",
//     columnId: "doing",
//     content: "Request for installation of specific software for academic use.",
//   },
// ];

// function KanbanBoard() {
//   const [columns, setColumns] = useState<Column[]>(defaultCols);
//   const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

//   const [tasks, setTasks] = useState<Task[]>(defaultTasks);

//   const [activeColumn, setActiveColumn] = useState<Column | null>(null);

//   const [activeTask, setActiveTask] = useState<Task | null>(null);

//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 10,
//       },
//     })
//   );

//   return (
//     <>
//       <div className="flex justify-center">
//         <div className="count text-2xl font-bold mt-5 text-center w-1/6">
//           <p>Total Tickets: {tasks.length}</p>
//         </div>
//       </div>

//       <div
//         className="
//         m-auto
//         flex
//         w-full
//         items-center
//         overflow-x-auto
//       overflow-y-hidden
//       my-10
//       px-[40px]
//     ">
//         <DndContext
//           sensors={sensors}
//           onDragStart={onDragStart}
//           onDragEnd={onDragEnd}
//           onDragOver={onDragOver}>
//           <div className="m-auto flex gap-4">
//             <div className="flex gap-4">
//               <SortableContext items={columnsId}>
//                 {columns.map((col) => (
//                   <ColumnContainer
//                     key={col.id}
//                     column={col}
//                     deleteColumn={deleteColumn}
//                     updateColumn={updateColumn}
//                     createTask={createTask}
//                     deleteTask={deleteTask}
//                     updateTask={updateTask}
//                     tasks={tasks.filter((task) => task.columnId === col.id)}
//                   />
//                 ))}
//               </SortableContext>
//             </div>
//           </div>

//           {createPortal(
//             <DragOverlay>
//               {activeColumn && (
//                 <ColumnContainer
//                   column={activeColumn}
//                   deleteColumn={deleteColumn}
//                   updateColumn={updateColumn}
//                   createTask={createTask}
//                   deleteTask={deleteTask}
//                   updateTask={updateTask}
//                   tasks={tasks.filter(
//                     (task) => task.columnId === activeColumn.id
//                   )}
//                 />
//               )}
//               {activeTask && (
//                 <TaskCard
//                   task={activeTask}
//                   deleteTask={deleteTask}
//                   updateTask={updateTask}
//                 />
//               )}
//             </DragOverlay>,
//             document.body
//           )}
//         </DndContext>
//       </div>
//     </>
//   );

//   function createTask(columnId: Id) {
//     const newTask: Task = {
//       id: generateId(),
//       columnId,
//       content: `Task ${tasks.length + 1}`,
//     };

//     setTasks([...tasks, newTask]);
//   }

//   function deleteTask(id: Id) {
//     const newTasks = tasks.filter((task) => task.id !== id);
//     setTasks(newTasks);
//   }

//   function updateTask(id: Id, content: string) {
//     const newTasks = tasks.map((task) => {
//       if (task.id !== id) return task;
//       return { ...task, content };
//     });

//     setTasks(newTasks);
//   }

//   function deleteColumn(id: Id) {
//     const filteredColumns = columns.filter((col) => col.id !== id);
//     setColumns(filteredColumns);

//     const newTasks = tasks.filter((t) => t.columnId !== id);
//     setTasks(newTasks);
//   }

//   function updateColumn(id: Id, title: string) {
//     const newColumns = columns.map((col) => {
//       if (col.id !== id) return col;
//       return { ...col, title };
//     });

//     setColumns(newColumns);
//   }

//   function onDragStart(event: DragStartEvent) {
//     if (event.active.data.current?.type === "Column") {
//       setActiveColumn(event.active.data.current.column);
//       return;
//     }

//     if (event.active.data.current?.type === "Task") {
//       setActiveTask(event.active.data.current.task);
//       return;
//     }
//   }

//   function onDragEnd(event: DragEndEvent) {
//     setActiveColumn(null);
//     setActiveTask(null);

//     const { active, over } = event;
//     if (!over) return;

//     const activeId = active.id;
//     const overId = over.id;

//     if (activeId === overId) return;

//     const isActiveAColumn = active.data.current?.type === "Column";
//     if (!isActiveAColumn) return;

//     console.log("DRAG END");

//     setColumns((columns) => {
//       const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

//       const overColumnIndex = columns.findIndex((col) => col.id === overId);

//       return arrayMove(columns, activeColumnIndex, overColumnIndex);
//     });
//   }

//   function onDragOver(event: DragOverEvent) {
//     const { active, over } = event;
//     if (!over) return;

//     const activeId = active.id;
//     const overId = over.id;

//     if (activeId === overId) return;

//     const isActiveATask = active.data.current?.type === "Task";
//     const isOverATask = over.data.current?.type === "Task";

//     if (!isActiveATask) return;

//     // Im dropping a Task over another Task
//     if (isActiveATask && isOverATask) {
//       setTasks((tasks) => {
//         const activeIndex = tasks.findIndex((t) => t.id === activeId);
//         const overIndex = tasks.findIndex((t) => t.id === overId);

//         if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
//           // Fix introduced after video recording
//           tasks[activeIndex].columnId = tasks[overIndex].columnId;
//           return arrayMove(tasks, activeIndex, overIndex - 1);
//         }

//         return arrayMove(tasks, activeIndex, overIndex);
//       });
//     }

//     const isOverAColumn = over.data.current?.type === "Column";

//     // Im dropping a Task over a column
//     if (isActiveATask && isOverAColumn) {
//       setTasks((tasks) => {
//         const activeIndex = tasks.findIndex((t) => t.id === activeId);

//         tasks[activeIndex].columnId = overId;
//         console.log("DROPPING TASK OVER COLUMN", { activeIndex });
//         return arrayMove(tasks, activeIndex, activeIndex);
//       });
//     }
//   }
// }

// function generateId() {
//   /* Generate a random number between 0 and 10000 */
//   return Math.floor(Math.random() * 10001);
// }

// export default KanbanBoard;

import PlusIcon from "../icons/PlusIcon";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import axios from "axios";
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

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const base_url = "http://ec2-35-154-251-41.ap-south-1.compute.amazonaws.com/";
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  useEffect(() => {
    fetchTasks(); // Fetch tasks when component mounts
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(`${base_url}api/app/ticket/staff`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch tasks");
      }

      const data = response.data;

      const formattedTasks: Task[] = data.map((item: any) => ({
        id: item.id,
        columnId: mapStatusToColumnId(item.status),
        content: item.title,
        description: item.description,
      }));

      setTasks(formattedTasks); // Set fetched tasks to the state
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  const mapStatusToColumnId = (status: string | null) => {
    switch (status) {
      case "Open":
        return "todo";
      case "In-progress":
        return "doing";
      case "Closed":
        return "done";
      default:
        return "todo"; // Default to "todo" if status is unknown
    }
  };

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
      description: `Description for Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: Id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const updateTask = (id: Id, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  };

  const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  };

  const updateColumn = (id: Id, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="count text-2xl font-bold mt-5 text-center w-1/6">
          <p>Total Tickets: {tasks.length}</p>
        </div>
      </div>

      <div className="m-auto flex w-full items-center overflow-x-auto overflow-y-hidden my-10 px-[40px]">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}>
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

  function generateId() {
    /* Generate a random number between 0 and 10000 */
    return Math.floor(Math.random() * 10001);
  }
}

export default KanbanBoard;
