const ToDo = require("../scheme/toDoScheme");

createToDo = (req, res) => {
  const body = req.body;

  if (!body) {
    console.log(req.body);
    return res.status(400).json({
      success: false,
      error: "You must provide a toDo",
    });
  }

  const toDo = new ToDo(body);

  if (!toDo) {
    return res.status(400).json({ success: false, error: err });
  }

  toDo
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: toDo._id,
        message: "ToDo created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "ToDo not created!",
      });
    });
};

getToDos = async (req, res) => {
  await ToDo.find({}, (err, toDos) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!toDos.length) {
      return res.status(404).json({ success: false, error: `ToDo not found` });
    }
    return res.status(200).json({ success: true, data: toDos });
  }).catch((err) => console.log(err));
};

module.exports = {
  createToDo,
  getToDos,
};
