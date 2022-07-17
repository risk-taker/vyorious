const Task = require('../models/task');

class TaskController {
    async task(req, res) {
        try {
            const task = req.body.task;
            if (!task) {
                return res.json({ message: "Please enter the task" });
            }
            const data = await Task.create({
                task
            })
        } catch (error) {
            res.json({ msg: error.message });
        }
        res.json({ status: 1 })
    }

    async tasks(req, res) {
        let tasks;
        try {
            tasks = await Task.find().sort({ _id: -1 });
            if (!tasks) {
                return res.json({ message: "No tasks found" });
            }

        } catch (error) {
            return res.json({ error: error.message });
        }
        res.json(tasks);
    }
    async delete(req, res) {
        const id = req.params.id;
        try {
            const data = await Task.deleteOne({ _id: id });
        } catch (err) {
            return res.json({ message: err.message });
        }
        res.json({ status: 1 });
    }
    async edit(req, res) {
        const _id = req.params.id;
        const newtask = req.body.newTask
        try {
            const data = await Task.updateOne({ _id }, { task: newtask });
        } catch (err) {
            return res.json({ message: err.message });
        }
        res.json({ status: 1 });
    }
}

module.exports = new TaskController();