import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../App.css";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
      bg-[#d4d6da] p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-3 border:bg-[#0C66E4]  cursor-grab relative
      "
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white p-2.5 h-[100px]  min-h-[100px] items-center flex text-left rounded-xl hover:ring-[2px]  hover:ring-inset hover:ring-[#0c66e4] cursor-grab relative">
        <textarea
          className="
        h-auto
        w-full resize-none border-none rounded bg-transparent text-black focus:outline-none my-auto
        "
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="bg-white p-2.5 h-[100px]  min-h-[100px] items-center flex text-left rounded-xl hover:ring-[2px] hover:ring-inset hover:bg-[#f7f8f9] cursor-grab relative  hover:ring-[#0c66e4] hover:shadow-md"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}>
      <p
        className="h-auto
        w-full resize-none border-none rounded bg-transparent text-black focus:outline-none my-auto">
        {task.content}
      </p>

      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-[#d4d6da] p-2 rounded opacity-60 hover:opacity-100">
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
