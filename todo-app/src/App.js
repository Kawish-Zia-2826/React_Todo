import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


const App = () => {
  const [task, setTask] = useState([]);
  const [showSubmit, setShowSubmit] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const ref = useRef("");
  const showToast = (msg, icon = "success") => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: msg,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };
  
  const handleSubmit = () => {
    const value = ref.current.value.trim();
    if (value === "") {
      showToast("Please enter a task", "warning");
      return;
    }
    setTask([...task, value]);
    ref.current.value = "";
    showToast("Task added successfully", "success");
  };

  const handleDelete = (id) => {
    setTask(task.filter((_, index) => index !== id));
    showToast("Task deleted", "info");
  };

  const handleEdit = (index) => {
    ref.current.value = task[index];
    setUpdateId(index);
    setShowSubmit(false);
    setShowUpdate(true);
  };

  const handleUpdate = () => {
    const value = ref.current.value.trim();
    if (value === "") {
      showToast("Cannot update with empty value","warning");
      return;
    }
    const updatedTasks = [...task];
    updatedTasks[updateId] = value;
    setTask(updatedTasks);
    setShowSubmit(true);
    setShowUpdate(false);
    showToast("Task updated", "success");
    ref.current.value = "";
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">📝 Task Manager</h2>
      <div className="d-flex mb-3">
        <input type="text" ref={ref} className="form-control me-2" placeholder="Enter task" />
        {showSubmit && (
          <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        )}
        {showUpdate && (
          <button className="btn btn-warning" onClick={handleUpdate}>Update</button>
        )}
      </div>
      <ul className="list-group">
        {task.map((item, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            {item}
            <div>
              <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(index)}>Delete</button>
              <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(index)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
