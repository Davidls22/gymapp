// Import React, useState, useEffect and axios library
import React, { useState, useEffect } from "react";
import axios from "axios";

// Component for displaying and managing booked classes
const BookedClasses = () => {
  // Initialize state variables
  const [bookedClasses, setBookedClasses] = useState([]);

  // Use useEffect hook to fetch booked classes from the server
  useEffect(() => {
    const fetchBookedClasses = async () => {
      try {
        // Get token and userId from localStorage
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        // Send GET request to the server to retrieve booked classes for the user
        const response = await axios.get(
          `http://localhost:8082/api/booked-classes/?user=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update state with the retrieved booked classes
        setBookedClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookedClasses();
  }, []);

  // Handle cancel button click event
const handleCancel = async (classId) => {
  console.log("classId:", classId); // Debugging line
  try {
    // Send DELETE request to the server to cancel the booked class
    await axios.delete(`http://localhost:8082/api/booked-classes/${classId}`);
    
    // Show success message and update state to remove the cancelled class from the list
    alert("class cancelled");
    const newBookedClasses = bookedClasses.filter(
      (bookedClass) => bookedClass._id !== classId
    );
    setBookedClasses(newBookedClasses);
  } catch (error) {
    console.error(error);
    alert("Error cancelling class");
  }
  };

  const handleLogout = () => {
    // perform logout functionality
    // for example, clear local storage and redirect to login page
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="booked-classes">
      <h2>Booked Classes</h2>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Time</th>
            <th>Instructor</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through bookedClasses array and render each class in a row */}
          {bookedClasses
            .sort((a, b) => new Date(a.class.date) - new Date(b.class.date))
            .map((bookedClass) => (
              <tr key={bookedClass._id}>
                <td>{bookedClass.class.title}</td>
                <td>{bookedClass.class.time}</td>
                <td>{bookedClass.class.instructor}</td>
                <td>
                  {new Date(bookedClass.class.date).toLocaleDateString("en-gb")}
                </td>
                <td>
                  <button onClick={() => handleCancel(bookedClass._id)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookedClasses;
