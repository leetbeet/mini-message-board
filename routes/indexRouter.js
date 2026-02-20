const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const indexRouter = Router();

const alphaErr = "must only contain letters.";

const validateUser = [
  body("author")
    .trim()
    .isAlpha()
    .withMessage(`author ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage("author must be between 1 and 20 characters"),
  body("message")
    .trim()
    .isAlpha()
    .withMessage(`message ${alphaErr}`)
    .isLength({ min: 1, max: 200 })
    .withMessage("Message must be between 1 and 200 characters lonh"),
];

indexRouter.get("/", (req, res) => res.render("index", { messages }));
indexRouter.get("/new", (req, res) => res.render("form"));
indexRouter.post("/new", validateUser, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      errors: errors.array(),
    });
  }

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
