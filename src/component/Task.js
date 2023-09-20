import React, { useState, useEffect } from "react";
import "./css/Task.css";
import { AiOutlineMenu } from "react-icons/ai";
import ParticlesBg from "particles-bg";
import {
  AiOutlineMore,
  AiOutlinePlus,
  AiFillBell,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { Link } from "react-router-dom";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    text: "",
    date: "",
    titleError: "",
    textError: "",
    dateError: "",
  });
  const [completedCount, setCompletedCount] = useState(0);
  const [isNewTitleAdded, setIsNewTitleAdded] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    text: "",
    date: "",
    titleError: "",
    textError: "",
    dateError: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [addButtonClicked, setAddButtonClicked] = useState(false); // New state for tracking "Add" button click

  useEffect(() => {
    fetch(
      "https://picsum.photos/id/" + Math.floor(Math.random() * 1000) + "/info"
    )
      .then((response) => response.json())
      .then((data) => {
        setProfileImage(data.download_url);
      });
  }, []);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleMobileMenus = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const validateTask = (task) => {
    let isValid = true;

    if (!task.title) {
      isValid = false;
      task.titleError = "This field is required";
    } else {
      task.titleError = ""; // Clear error if title is provided
    }

    if (!task.text) {
      isValid = false;
      task.textError = "This field is required";
    } else {
      task.textError = ""; // Clear error if text is provided
    }

    if (!task.date) {
      isValid = false;
      task.dateError = "This field is required";
    } else {
      task.dateError = ""; // Clear error if date is provided
    }

    return isValid;
  };

  const handleAddTask = () => {
    setAddButtonClicked(true); // Mark "Add" button as clicked

    const isValid = validateTask(newTask);

    if (isValid) {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTask({ title: "", text: "", date: "" });
      setShowModal(false);
      setCompletedCount(completedCount + 1);
      setIsNewTitleAdded(true);
    }
  };

  const handleNotificationClick = (task) => {
    setNotificationDetails(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNotificationDetails(null);
    setEditTask(null); // Clear the editTask state when closing the modal
    setUpdatedTask({
      title: "",
      text: "",
      date: "",
      titleError: "",
      textError: "",
      dateError: "",
    }); // Clear updatedTask state
  };

  const handleDeleteTask = () => {
    if (editTask !== null) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(editTask, 1);
      setTasks(updatedTasks);
      setEditTask(null);
      closeModal();
      setCompletedCount(completedCount - 1);
    }
  };

  const handleUpdateTask = () => {
    const isValid = validateTask(updatedTask);

    if (isValid && editTask !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editTask] = updatedTask;
      setTasks(updatedTasks);
      setEditTask(null);
      closeModal();
    }
  };

  return (
    <div className="Super">
      <div className="menu-bar">
        <div className="logo">
          <img src="logo192.png" alt="Logo" />
        </div>
        <span className="menu-text">TasksBoard</span>
        <div className="menu-options">
          <Link to="/task/Weather" className="Wea">
            Weather
          </Link>
          <Link to="/task/Calculator" className="Wea">
            Calculator
          </Link>
          {/* Mobile menu icon */}
          <div
            className="mobile-menu-icons"
            style={{ color: "white" }}
            onClick={toggleMobileMenus}
          >
            <AiOutlineMenu />
          </div>
          {isMobileMenuOpen && (
            <div className="mobile-menus">
              <Link to="/task/Calculator">
                <h2>Calculator</h2>
              </Link>

              <Link to="/task/Weather">
                <h2>Weather</h2>
              </Link>
            </div>
          )}
          <img src={profileImage} alt="Profile Icon" className="profile-icon" />
        </div>
      </div>
      <ParticlesBg type="fountain" bg={true} />
      <div className="main1">
        <div className="task1">
          <h4>My Tasks</h4>
          <AiOutlineMore />
        </div>
        <div className="task2">
          <h5 title="Click Me To Add Detail" onClick={() => setShowModal(true)}>
            <AiOutlinePlus />
          </h5>
          <h4>Add a task</h4>
        </div>
        <div
          className="displays"
          style={{ color: isNewTitleAdded ? "green" : "" }}
        >
          Completed ({completedCount})
        </div>
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <div className="ball">
              <span className="green-tick">
                <span className="circle">&#10003;</span>
              </span>
              <span className="task-title">{task.title}</span>
            </div>
            <AiOutlineEdit
              title="Edit Task"
              className="edit-icon"
              onClick={() => {
                setEditTask(index);
                setUpdatedTask(task);
                setShowModal(true);
              }}
            />
            <AiOutlineDelete
              title="Delete Task"
              className="delete-icon"
              onClick={() => {
                setEditTask(index);
                handleDeleteTask();
              }}
            />
            <AiFillBell
              title="Click Me To See All Details"
              className="bell-icon"
              onClick={() => handleNotificationClick(task)}
            />
          </div>
        ))}
      </div>
      {showModal && (
        <div className="add-task-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{notificationDetails ? "Task Details" : "Add Task"}</h2>
              <span className="close-icon" onClick={closeModal}>
                &times;
              </span>
            </div>
            {notificationDetails ? (
              <div className="modal-body">
                <h3>{notificationDetails.title}</h3>
                <p>{notificationDetails.text}</p>
                <p>Due Date: {notificationDetails.date}</p>
              </div>
            ) : (
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Title"
                  value={editTask !== null ? updatedTask.title : newTask.title}
                  onChange={(e) =>
                    editTask !== null
                      ? setUpdatedTask({
                          ...updatedTask,
                          title: e.target.value,
                        })
                      : setNewTask({ ...newTask, title: e.target.value })
                  }
                />
                {addButtonClicked && newTask.titleError && (
                  <p className="error-message">{newTask.titleError}</p>
                )}
                <input
                  type="text"
                  placeholder="Task Text"
                  value={editTask !== null ? updatedTask.text : newTask.text}
                  onChange={(e) =>
                    editTask !== null
                      ? setUpdatedTask({ ...updatedTask, text: e.target.value })
                      : setNewTask({ ...newTask, text: e.target.value })
                  }
                />
                {addButtonClicked && newTask.textError && (
                  <p className="error-message">{newTask.textError}</p>
                )}
                <input
                  type="date"
                  placeholder="Due Date"
                  value={editTask !== null ? updatedTask.date : newTask.date}
                  onChange={(e) =>
                    editTask !== null
                      ? setUpdatedTask({ ...updatedTask, date: e.target.value })
                      : setNewTask({ ...newTask, date: e.target.value })
                  }
                />
                {addButtonClicked && newTask.dateError && (
                  <p className="error-message">{newTask.dateError}</p>
                )}
              </div>
            )}
            <div className="modal-footer">
              {notificationDetails ? (
                <button onClick={closeModal}>Close</button>
              ) : (
                <div className="Footer-modal">
                  <button
                    onClick={
                      editTask !== null ? handleUpdateTask : handleAddTask
                    }
                  >
                    {editTask !== null ? "Update" : "Add"}
                  </button>
                  {editTask !== null && (
                    <button onClick={() => setEditTask(null)}>Cancel</button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
