// import { SortableContext, useSortable } from "@dnd-kit/sortable";
// // import TrashIcon from "../icons/TrashIcon";
// import { Column, Id, Task } from "../types";
// import { CSS } from "@dnd-kit/utilities";
// import { useMemo, useState } from "react";
// // import PlusIcon from "../icons/PlusIcon";
// import TaskCard from "./TaskCard";
// import { DragOverlay } from "@dnd-kit/core";

// interface Props {
//   column: Column;
//   deleteColumn: (id: Id) => void;
//   updateColumn: (id: Id, title: string) => void;

//   createTask: (columnId: Id) => void;
//   updateTask: (id: Id, content: string) => void;
//   deleteTask: (id: Id) => void;
//   tasks: Task[];
// }

// function ColumnContainer({
//   column,
//   // deleteColumn,
//   updateColumn,
//   // createTask,
//   tasks,
//   deleteTask,
//   updateTask,
// }: Props) {
//   const [editMode, setEditMode] = useState(false);

//   const tasksIds = useMemo(() => {
//     return tasks.map((task) => task.id);
//   }, [tasks]);

//   const {
//     setNodeRef,
//     attributes,
//     listeners,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({
//     id: column.id,
//     data: {
//       type: "Column",
//       column,
//     },
//     disabled: editMode,
//   });

//   const style = {
//     transition,
//     transform: CSS.Transform.toString(transform),
//   };

//   if (isDragging) {
//     return (
//       <div
//         ref={setNodeRef}
//         style={style}
//         className="
//       bg-columnBackgroundColor
//       opacity-40
//       border-2
//       border-pink-500
//       w-[350px]
//       h-[500px]
//       max-h-[500px]
//       rounded-md
//       flex
//       flex-col
//       "></div>
//     );
//   }

//   return (
//     <>
//       <div
//         ref={setNodeRef}
//         style={style}
//         className="
//   bg-[#f7f8f9]
//   w-[350px]
//   h-[500px]
//   max-h-auto
//   rounded-md
//   flex
//   flex-col
//   ">
//         {/* Column title */}
//         <div
//           {...attributes}
//           {...listeners}
//           onClick={() => {
//             setEditMode(true);
//           }}
//           className="
//         bg-[#f7f8f9]
//       text-md
//       h-[60px]
//       cursor-grab
//       rounded-md
//       rounded-b-none
//       p-3
//       m-2
//       font-bold
//       border-bg-[#0c66e4]
//       border-2
//       flex
//       items-center
//       justify-between
//       hover:bg-[#d4d6da]
//       hover:ring-[2px]
//       hover:ring-[#0c66e4]

//       ">
//           <div className="flex gap-2">
//             <div
//               className="
//         flex
//         justify-center
//         items-center
//         text-black
//         bg-white
//         px-2
//         py-1
//         text-sm
//         rounded-full
//         ">
//               {tasks.length}
//             </div>
//             {!editMode && column.title}
//             {editMode && (
//               <input
//                 className="bg-whte focus:border-[#0C66E4] border rounded outline-none px-2 "
//                 value={column.title}
//                 onChange={(e) => updateColumn(column.id, e.target.value)}
//                 autoFocus
//                 onBlur={() => {
//                   setEditMode(false);
//                 }}
//                 onKeyDown={(e) => {
//                   if (e.key !== "Enter") return;
//                   setEditMode(false);
//                 }}
//               />
//             )}
//           </div>
//         </div>

//         {/* Column task container */}
//         <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto bg-[#f7f8f9] rounded-xl">
//           <SortableContext items={tasksIds}>
//             {tasks.map((task) => (
//               <TaskCard
//                 key={task.id}
//                 task={task}
//                 deleteTask={deleteTask}
//                 updateTask={updateTask}
//               />
//             ))}
//           </SortableContext>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ColumnContainer;

import React from "react";
import { Column, Task, Id } from "../types";
import TaskCard from "./TaskCard";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ColumnContainerProps {
  column: Column;
  tasks: Task[];
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const ColumnContainer: React.FC<ColumnContainerProps> = ({
  column,
  tasks,
  deleteColumn,
  updateColumn,
  createTask,
  deleteTask,
  updateTask,
}) => {
  return (
    <div className="column-container">
      <div className="column-header">
        <h2>{column.title}</h2>
      </div>
      <div className="column-content">
        <SortableContext items={tasks.map((task) => task.id)}>
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

interface SortableTaskCardProps {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const SortableTaskCard: React.FC<SortableTaskCardProps> = ({
  task,
  deleteTask,
  updateTask,
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-card ${isDragging ? "dragging" : ""}`}>
      <TaskCard task={task} deleteTask={deleteTask} updateTask={updateTask} />
    </div>
  );
};

export default ColumnContainer;
