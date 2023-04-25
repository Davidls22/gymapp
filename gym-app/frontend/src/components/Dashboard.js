import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  // set initial states
  const [classes, setClasses] = useState([]);
  const [editingClassId, setEditingClassId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    date: "",
    time: "",
    maxCapacity: "",
  });

  // extract form data from formData state
  const { title, instructor, date, time, maxCapacity } = formData;

  // handle form input changes
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // handle form submission
  const onSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await addClass(e, editingClassId !== null);
    } catch (error) {
      console.error(error.message);
    }
  };

// Function to add or edit a class
const addClass = async (e, isEdit) => {
  e.preventDefault(); // Prevents the default form submission behavior

  try {
    let res; // Declare a variable to hold the response from the server

    // If the form is for editing an existing class, use a PUT request
    if (isEdit) {
      res = await axios.put(
        `http://localhost:8082/api/classes/${editingClassId}`,
        formData
      );
      // Update the state of the classes array with the edited class
      setClasses(
        classes.map((cls) =>
          cls._id === editingClassId ? { ...cls, ...res.data } : cls
        )
      );
    } 
    // Otherwise, use a POST request to add a new class
    else {
      res = await axios.post("http://localhost:8082/api/classes/", formData);
      // Add the new class to the state of the classes array
      setClasses([...classes, res.data]);
    }
    // Reset the form data and editingClassId state variables
    setFormData({
      title: "",
      instructor: "",
      date: "",
      time: "",
      maxCapacity: "",
    });
    setEditingClassId(null);
  } catch (error) {
    console.error(error.message);
  }
};


  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/classes/${id}`);
      setClasses(classes.filter((cls) => cls._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    // perform logout functionality
    // for example, clear local storage and redirect to login page
    localStorage.clear();
    window.location.href = "/login";
  };

  const onEdit = (id) => {
    setEditingClassId(id);
    const selectedClass = classes.filter((cls) => cls._id === id);
    setFormData(selectedClass[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8082/api/classes");
        setClasses(res.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const today = new Date();
  const firstDayOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 1 // 1 for Monday, 0 for Sunday
  )
    .toISOString()
    .split("T")[0];
  const lastDayOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 7 // 7 for Sunday, 6 for Saturday
  )
    .toISOString()
    .split("T")[0];

  return (
    <div>
      <h1>Class Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Add Class</h2>
      <form className="addClass" onSubmit={(e) => onSubmit(e)}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <label>Instructor</label>
          <input
            type="text"
            name="instructor"
            value={instructor}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            min={firstDayOfWeek}
            max={lastDayOfWeek}
            value={date}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <label>Time</label>
          <input
            type="text"
            name="time"
            value={time}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <label>Max Capacity</label>
          <input
            type="number"
            name="maxCapacity"
            value={maxCapacity}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <button type="submit">
          {editingClassId ? "Save Changes" : "Add Class"}
        </button>
      </form>
      <h2>Current Classes</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Instructor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Max Capacity</th>
            <th>Actions</th>
            <th>Attendees</th>
          </tr>
        </thead>
        <tbody>
        {classes.sort((a, b) => new Date(a.date) - new Date(b.date)).map((cls) => (
            <tr key={cls._id}>
              <td>
                {editingClassId === cls._id ? (
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => onChange(e)}
                    required
                  />
                ) : (
                  cls.title
                )}
              </td>
              <td>
                {editingClassId === cls._id ? (
                  <input
                    type="text"
                    name="instructor"
                    value={instructor}
                    onChange={(e) => onChange(e)}
                    required
                  />
                ) : (
                  cls.instructor
                )}
              </td>
              <td>
                {editingClassId === cls._id ? (
                  <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => onChange(e)}
                    required
                  />
                ) : (
                  new Date(cls.date).toLocaleDateString("en-US")
                )}
              </td>
              <td>
                {editingClassId === cls._id ? (
                  <input
                    type="text"
                    name="time"
                    value={time}
                    onChange={(e) => onChange(e)}
                    required
                  />
                ) : (
                  cls.time
                )}
              </td>
              <td>
                {editingClassId === cls._id ? (
                  <input
                    type="number"
                    name="maxCapacity"
                    value={maxCapacity}
                    onChange={(e) => onChange(e)}
                    required
                  />
                ) : (
                  cls.maxCapacity
                )}
              </td>
              <td>
                {editingClassId === cls._id ? (
                  <div>
                    <button
                      type="submit"
                      onClick={(e) =>
                        editingClassId === null
                          ? onSubmit(e, null)
                          : onSubmit(e, editingClassId)
                      }
                    >
                      Save
                    </button>
                    <button onClick={() => setEditingClassId(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={() => onEdit(cls._id)}>Edit</button>
                )}
                <button onClick={() => onDelete(cls._id)}>Delete</button>
              </td>
              <td>{cls.attendees.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
