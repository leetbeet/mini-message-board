const { Router } = require("express");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const indexRouter = Router();

indexRouter.get("/", (req, res) =>
  res.render("index", { title: "Mini Messageboard", messages: messages }),
);
indexRouter.get("/new", (req, res) => res.render("form"));
indexRouter.post("/new", (req, res) => {
  const { message, author } = req.body;

  messages.push({
    text: message,
    user: author,
    added: new Date(),
  });

  res.redirect("/");
});

module.exports = indexRouter;
