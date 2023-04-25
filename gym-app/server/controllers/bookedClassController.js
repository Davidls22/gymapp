const mongoose = require("mongoose");
const BookedClass = require("../models/BookedClass");
const Class = require("../models/Class")

exports.getAllBookedClasses = async (req, res) => {
    try {
      const { user } = req.query;
  
      const bookedClasses = await BookedClass.find({ user })
        .populate({
          path: 'class',
          select: 'title instructor date time maxCapacity attendees',
        })
        .populate('user', 'name email');
        console.log("user:", user)
      res.json(bookedClasses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

  exports.deleteBookedClass = async (req, res) => {
    try {
      const { classId } = req.params;
  
      const deletedBookedClass = await BookedClass.findOneAndDelete({
        _id: mongoose.Types.ObjectId(classId),
      });
  
      if (!deletedBookedClass) {
        return res.status(404).json({ message: "Booked class not found" });
      }
  
      let objectid = mongoose.Types.ObjectId(deletedBookedClass.class);
      const classFind = await Class.findById(objectid);
      const userId = deletedBookedClass.user;
      classFind.attendees.pull(userId);
      classFind.save();
  
      res.json({ message: "Booked class deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

  exports.createBookedClass = async (req, res) => {
    const { classbook: classId, user: userId } = req.body;
  
    if (!classId || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const bookedClass = await BookedClass.create({ 
        class: classId, 
        user: userId,
        attendees: 1 // Set the initial number of attendees to 1
      });
      let objectid = mongoose.Types.ObjectId(classId)
      if(bookedClass){
     const classFind = await Class.findById(objectid)
     classFind.attendees.push(userId)
     classFind.save()
      };
      res.status(201).json(bookedClass);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };