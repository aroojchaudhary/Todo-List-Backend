const express = require('express');
const auth = require('../middleware/auth');
const Todo = require('../Models/Todo');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const newTodo = new Todo({
      userId: req.user.id,
      task: req.body.task
    });
    await newTodo.save();
    res.send({ message: "Todo added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.send({ data: todos });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send({ message: 'Todo not found' });
    }
    if (todo.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.send({message: "Todo updated successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    res.send({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
