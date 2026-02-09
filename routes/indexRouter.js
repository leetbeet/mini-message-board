const { Router } = require("express");

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const indexRouter = Router();
let nextId = 2;

indexRouter.get("/", (req, res) => res.render("index", { messages }));
indexRouter.get("/new", (req, res) => res.render("form"));
indexRouter.post("/new", (req, res) => {
  const { message, author } = req.body;

  messages.push({
    id: ++nextId,
    text: message,
    user: author,
    added: new Date(),
  });

  res.redirect("/");
});
indexRouter.get("/:id", (req, res) => {
  const message = messages.find((m) => m.id === Number(req.params.id));

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", { message });
});

module.exports = indexRouter;
