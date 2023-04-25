// Import React and necessary dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the ClassList component
const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [token, setToken] = useState("");
  const [bookedClasses, setBookedClasses] = useState(null);
  const [userId, setUserId] = useState(null)


  //fetches the list of classes from the server when the component mounts.
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/classes/");
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, []);

  // retrieves the user's token and ID from the local storage when the component mounts.
// It then updates the token and userId state variables using the useState hook.
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Group the classes by day of the week and sort them by time
  const groupedClasses = classes.reduce((result, classItem) => {
    const dayIndex = new Date(classItem.date).getDay();
    const day = daysOfWeek[dayIndex];
    const time = new Date(`1970-01-01T${classItem.time}`).toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
    });

    if (!result[day]) {
      result[day] = {};
    }

    if (!result[day][time]) {
      result[day][time] = [];
    }

    result[day][time].push(classItem);

    return result;
  }, {});

  // Get the times for each day
  const timesByDay = Object.values(groupedClasses).reduce(
    (result, dayClasses) => {
      const times = Object.keys(dayClasses);
      result.push(...times);
      return result;
    },
    []
  );

  // This code creates an array of unique times by day from an existing array 'timesByDay'.
// The array is then sorted in reverse order of time using the 'sort' function and the 'Date' object.
  const sortedTimes = [...new Set(timesByDay)].sort(
    (a, b) => new Date(`1970-01-01T${a}`) - new Date(`1970-01-01T${b}`)
  ).reverse();

  
  const handleBook = async (classId) => { // function to handle booking of a class
    try { // try to book the class
      const token = localStorage.getItem("token"); // get the user's token from local storage
      const userId = localStorage.getItem("userId"); // get the user's id from local storage
      const payload = { classbook: classId, user: userId }; // create a payload with class id and user id
      const response = await axios.post( // send a POST request to book the class
        "http://localhost:8082/api/booked-classes/", 
        payload, 
        {
          headers: { // set authorization header with the user's token
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // log the response data to the console
      alert('Class Booked Successfully'); // show an alert indicating the class was booked successfully
      const bookedClasses = await axios.get(`http://localhost:8082/api/booked-classes/?user=${userId}`, { 
        headers: { // set authorization header with the user's token
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(bookedClasses.data); 
      setBookedClasses(bookedClasses.data); // update the booked classes state with the new data
    } catch (error) { 
      console.error(error.response.data); 
    }
  };

  

  const handleLogout = () => {
    // perform logout functionality
    // for example, clear local storage and redirect to login page
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className = "body">
      <h2>Classes</h2>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedTimes.map((time) => (
            <tr key={time}>
              <td>{time}</td>
              {daysOfWeek.map((day) => (
                <td key={`${day}-${time}`}>
                  {groupedClasses[day] &&
                  groupedClasses[day][time] &&
                  groupedClasses[day][time].length > 0 ? (
                    <ul>
                      {groupedClasses[day][time].map((classItem) => (
                        <li key={classItem._id}>
                          <h3>{classItem.title}</h3>
                          <p>{classItem.instructor}</p>
                          <p>Capacity: {classItem.maxCapacity}</p>
                          {classItem.maxCapacity - classItem.attendees.length >
                          0 ? (
                            <button onClick={() => handleBook(classItem._id,userId)}>
                              Book
                            </button>
                          ) : (
                            <p>Class is full</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No classes scheduled</p>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassList;
