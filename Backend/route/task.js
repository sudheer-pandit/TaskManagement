const router = require("express").Router();
const User = require("../models/User");
const Task = require("../models/task");
const { auth } = require("./auth");

// Create Task
router.post("/create-task", auth, async (req, res) => {
  try {
    const { title, desc } = req.body;
    if (!title || !desc) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Title and description are required!",
        });
    }

    console.log("Received Data:", title, desc);
    const { id } = req.user; // Get user ID from headers
    console.log(":", id)

    // Step 1: Create Task & Assign User ID
    const newTask = new Task({ title, desc, createdBy: id });
    const saveTask = await newTask.save();
    console.log("Saved Task:", saveTask);

    // Step 2: Push Task ID to User's `tasks` Array
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { tasks: saveTask._id } },
      { new: true, useFindAndModify: false }
    );

    // console.log("Updated User:", updatedUser);
    res.status(200).json({ message: "Task Created Successfully!" });
  } catch (error) {
    console.log("Error in create-task:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

// Get All Tasks for a User
router.get("/get-all-tasks", auth, async (req, res) => {
  try {
    // const { id } = req.headers;
    const userId = req.user.id;
    console.log("userid-:", userId);
    // Fetch User with Tasks Populated
    const userdata = await User.findById(userId).populate({
      path: "tasks",
      options: { sort: { createAt: -1 } },
    });
    if (!userdata) {
      return res.status(404).json({ message: "User not found!" });
    }

    console.log("User Data:", userdata);
    res.status(200).json({ data: userdata.tasks });
  } catch (error) {
    console.log("Error in get-all-tasks:", error);
    return res.status(500).json({ message: "Internal Server Error!", error });
  }
});

// delete api

router.delete("/delete-task/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userid = req.user.id;
    console.log(userid)

    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userid, { $pull: { tasks: id } });
    


    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error in get-all-tasks:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

// Update Task

router.put("/update-task/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    await Task.findByIdAndUpdate(id, { title: title, desc: desc });

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log("Error in get-all-tasks:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

// update important task

router.put("/update-imp-task/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if(!id || id == undefined)
    {
      return res.status(403).json({message: ""})
    }
    console.log("id:",id)
    const taskData = await Task.findById(id);
    console.log("taskData:-",taskData)
    const ImpTask = taskData.important;

    await Task.findByIdAndUpdate(id, { important: !ImpTask });

    res.status(200).json({ message: "important task update successfully" });
  } catch (error) {
    console.log("Error in update imp -tasks:", error);
    return res.status(500).json({ message: "Internal Server Error!", error });
  }
});

//update complete task

router.put("/update-complete-task/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await Task.findById(id);
    const completeTask = taskData.complete;

    await Task.findByIdAndUpdate(id, { complete: !completeTask });

    res.status(200).json({ message: "complete  task update successfully"
      , completeTask: completeTask,
      taskData: taskData
     });
  } catch (error) {
    console.log("Error in get-all-tasks:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

//get important task

router.get("/get-imp-tasks", auth, async (req, res) => {
  try {
    const { id } = req.user;
    console.log("id:", id);
    // Fetch User with Tasks Populated
    const data = await User.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createAt: -1 } },
    });
    console.log(data);
    if (!data) {
      return res.status(404).json({ message: "User not found!" });
    }
    const impdata = data.tasks;
    console.log("User Data:", impdata);
    res.status(200).json({ data: impdata });
  } catch (error) {
    console.log("Error in get-all-tasks:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

// get complete task

router.get("/get-complete-tasks", auth, async (req, res) => {
  try {
    const { id } = req.user;
    console.log("id:", id);
    // Fetch User with Tasks Populated
    const data = await User.findById(id).populate({
      path: "tasks", 
      match: { complete: true },
      options: { sort: { createAt: -1 } },
    });
    console.log(data);
    if (!data) {
      return res.status(404).json({ message: "User not found!" });
    }
    const completeData = data.tasks;
    console.log("User Data:", completeData);
    res.status(200).json({ data: completeData });
  } catch (error) {
    console.log("Error in get-all-tasks:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

//get incompleted task

router.get("/get-incomplete-tasks", auth, async (req, res) => {
  try {
    const { id } = req.user;
    console.log("id:", id);
    // Fetch User with Tasks Populated
    const data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: false },
      options: { sort: { createAt: -1 } },
    });
    console.log(data);
    if (!data) {
      return res.status(404).json({ message: "User not found!" });
    }
    const incompleteData = data.tasks;
    console.log("User Data:", incompleteData);
    res.status(200).json({ data: incompleteData });
  } catch (error) {
    console.log("Error in get-all-tasks:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
