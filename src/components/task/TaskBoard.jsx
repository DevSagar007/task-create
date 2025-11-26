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
  const [tasksToUpdate, setTasksToUpdate] = useState(null);

  function handleAddTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((tasks) => {
          if (tasks.id == newTask.id) {
            return newTask;
          }
          return tasks;
        })
      );
    }
    setShowAddTaskModal(false);
  }

  function handleEditTask(tasks) {
    console.log("tasks");
    setShowAddTaskModal(true);
    setTasksToUpdate(tasks);
  }

  function handleCloseClick() {
    setShowAddTaskModal(false);
    setTasksToUpdate(null);
  }

  function handleDeleteTask(taskId) {
    const taskAfterDelete = tasks.filter((tasks) => tasks.id !== taskId);
    setTasks(taskAfterDelete);
  }

  function handleDeleteAllClick() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFavourite(taskId) {
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    const newTasks = [...tasks];

    newTasks[taskIndex].isFavourite = !newTasks[taskIndex].isFavourite;
    console.log("click");
    setTasks(newTasks);
  }

  function handleSearch (searchTerm) {
    console.log(searchTerm);
    const filtered = tasks.filter((tasks) =>
      tasks.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setTasks([...filtered]);
   }

  return (
    <>
      <section className="mb-20" id="tasks">
        {/* Modal show */}
        {showAddTaskModal && (
          <AddTaskModal
            onSave={handleAddTask}
            tasksUpdate={tasksToUpdate}
            onCloseClick={handleCloseClick}
          />
        )}

        <div className="container mx-auto">
          <div className="p-2 flex justify-end">
            <SearchTask onSearch={handleSearch} />
          </div>

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskActions
              onAddTask={() => setShowAddTaskModal(true)}
              onDeleteAllClick={handleDeleteAllClick}
            />
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavourite}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default TaskBoard;
