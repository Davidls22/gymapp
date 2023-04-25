const mongoose = require("mongoose");
const BookedClass = require("../models/BookedClass");
const Class = require("../models/Class");

exports.getAllBookedClasses = async (req, res) => {
  // Extracting the user parameter from the request query.
  try {
    const { user } = req.query;
    // Finding all the booked classes of a specific user from the database using the BookedClass model.
    // The class data is populated with select properties like title, instructor, date, time, maxCapacity and attendees.
    // The user data is populated with select properties like name and email.
    const bookedClasses = await BookedClass.find({ user })
      .populate({
        path: "class",
        select: "title instructor date time maxCapacity attendees",
      })
      .populate("user", "name email");
    console.log("user:", user);
    // Sending the booked classes data as a response to the client.
    res.json(bookedClasses);
  } catch (err) {
    // Handling the error and sending an error message with a status code of 500.
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteBookedClass = async (req, res) => {
  try {
    const { classId } = req.params; // get the class ID from request parameters

    // find and delete the booked class by ID
    const deletedBookedClass = await BookedClass.findOneAndDelete({
      _id: mongoose.Types.ObjectId(classId),
    });

    // return 404 error if the booked class is not found
    if (!deletedBookedClass) {
      return res.status(404).json({ message: "Booked class not found" });
    }

    // get the ID of the class and the user who booked it
    let objectid = mongoose.Types.ObjectId(deletedBookedClass.class);
    const userId = deletedBookedClass.user;

    // find the class and remove the user from its attendees list
    const classFind = await Class.findById(objectid);
    classFind.attendees.pull(userId);
    classFind.save();

    // return success message
    res.json({ message: "Booked class deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" }); // return 500 error if any error occurs
  }
};

exports.createBookedClass = async (req, res) => {
  // Destructure the classbook and user from the request body
  const { classbook: classId, user: userId } = req.body;

  // Check if the required fields are missing
  if (!classId || !userId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Create a new booked class with the given class and user IDs
    const bookedClass = await BookedClass.create({
      class: classId,
      user: userId,
      attendees: 1, // Set the initial number of attendees to 1
    });

    let objectid = mongoose.Types.ObjectId(classId);

    if (bookedClass) {
      // Find the class with the given ID and add the user to its attendees list
      const classFind = await Class.findById(objectid);
      classFind.attendees.push(userId);
      classFind.save();
    }

    // Return the created booked class
    res.status(201).json(bookedClass);
  } catch (err) {
    // Handle any errors that occurred during the process
    res.status(400).json({ error: err.message });
  }
};
