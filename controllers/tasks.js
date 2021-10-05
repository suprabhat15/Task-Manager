const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');


const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(201).json({tasks});
})

const createTask = asyncWrapper(async (req, res) => {
    // // res.send("create task");
    // try {
        const task = await Task.create(req.body);
        res.status(201).json({task});
    // } catch (error) {
    //     res.status(500).json({msg: error});
    // }
})

const getTask = async (req, res) => {
    // res.send("get single task");
    // res.json({id:req.params.id});
    try {
        const {id: taskID} = req.params;
        const task = await Task.findOne({_id: taskID});
        if(!task){
            // const error = new Error('Not Found');
            // error.status = 404;
            // return next(error);
            return res.status(404).json({msg: `No task with id: ${taskID}`});
        }
        // res.status(200).json({task, amount: tasks.length});
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const updateTask = async (req, res) => {
    // res.send("update task");
    try {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body,{
            new: true,
            runValidators: true,
            // overwrite: true
        });
        if(!task){
            return res.status(404).json({msg: `No task with id: ${taskID}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const deleteTask = async (req, res) => {
    // res.send("delete task");
    try {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID});
        if(!task){
            return res.status(404).json({msg: `No task with id: ${taskID}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}