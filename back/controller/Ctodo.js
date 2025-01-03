const { Todo } = require("../models/index");

/* Todos 전체 목록 불러오기 */
exports.readAll = async (req, res) => {
  try {
    const allList = await Todo.findAll();
    res.send(allList);
  } catch (err) {
    console.log(err);
    res.send("server error");
  }
};

/* Todo 한 개 불러오기 */
exports.readOne = async (req, res) => {
  console.log(req.pa);
  try {
    const { id } = req.params;

    // if (id.id) {
    //   res.send("server error");
    //   return;
    // }

    const oneList = await Todo.findOne({
      where: { id: id },
    });
    res.send(oneList);
  } catch (err) {
    console.log(err);
    res.send("server error");
  }
};

/* 새로운 Todo 생성 */
exports.create = async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.send(newTodo);
  } catch (err) {
    console.log(err);
    res.send("server error");
  }
};

/* 기존 Todo 수정 */
exports.update = async (req, res) => {
  try {
    const patchTodo = await Todo.update(
      {
        title: req.body.title,
        done: req.body.done,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.send(patchTodo);
  } catch (err) {
    console.log(err);
    res.send("server error");
  }
};

/* 기존 Todo 삭제 */
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await Todo.destroy({
      where: {
        id: id,
      },
    });
    if (Boolean(deleteTodo)) {
      res.send("삭제 성공");
    } else res.send("삭제 실패");
  } catch (err) {
    console.log(err);
    res.send("server error");
  }
};
