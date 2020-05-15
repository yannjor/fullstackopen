const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1, likes: 1 });
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!body.password) {
    return response.status(400).json({ error: "password is required" });
  }

  if (body.password.length < 3) {
    return response.status(400).json({
      error: "password is shorter than the minimum allowed length",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

module.exports = usersRouter;
