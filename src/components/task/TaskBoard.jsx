"use client";
import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";

function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "API Data Synchronization with java",
    description:
      "Implement a Python solution to synchronize data between an API and a third-party database securely, optimizing data exchange.",
    tags: ["Web", "Python", "API"],
    priority: "High",
    isFavourite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  function handleAddTask(newTask) {
    console.log("Adding a task", newTask);
    setTasks([...tasks, newTask]);
    setShowAddTaskModal(false);
  }

  return (
    <>
      <section className="mb-20" id="tasks">
        {/* Modal show */}
        {showAddTaskModal && <AddTaskModal onSave={handleAddTask} />}

        <div className="container mx-auto">
          <div className="p-2 flex justify-end">
            <SearchTask />
          </div>

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskActions onAddTask={() => setShowAddTaskModal(true)} />
            <TaskList tasks={tasks} />
          </div>
        </div>
      </section>
    </>
  );
}

export default TaskBoard;
