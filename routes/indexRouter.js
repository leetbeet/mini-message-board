const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const indexRouter = Router();

const validateUser = [
  body("author")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("author must be between 1 and 20 characters"),
  body("message")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Message must be between 1 and 200 characters long"),
];

indexRouter.get("/", async (req, res, next) => {
  try {
    const result = await db.getAllMessages();
    res.render("index", { messages: result.rows });
  } catch (err) {
    next(err);
  }
});

indexRouter.get("/new", (req, res) => {
  res.render("form");
});

indexRouter.post("/new", validateUser, async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        errors: errors.array(),
      });
    }

    const { message, author } = req.body;

    await db.addMessage(author, message);

    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

indexRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await db.findMessage(id);

    if (message.rows.length === 0) {
      return res.status(404).send("Message not found");
    }

    res.render("message", { message: message.rows[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = indexRouter;
